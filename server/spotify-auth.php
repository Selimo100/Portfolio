<?php

declare(strict_types=1);

/**
 * One-time helper to obtain a Spotify refresh token.
 *
 * 1. Configure client id, secret and redirect URI (config/spotify.php or env).
 * 2. Open this page in a browser and follow the link to Spotify.
 * 3. Copy the printed refresh token into your configuration.
 * 4. DELETE this file from any public server afterwards.
 */

session_start();
require_once __DIR__ . '/lib/spotify.php';

$config = spotify_config();

header('Content-Type: text/html; charset=utf-8');
echo '<!DOCTYPE html><meta charset="utf-8"><title>Spotify authorisation</title>';
echo '<style>body{font-family:system-ui,sans-serif;max-width:44rem;margin:4rem auto;padding:0 1rem;line-height:1.6}code{background:#eee;padding:.15rem .35rem;border-radius:.25rem}</style>';

if ($config['client_id'] === '' || $config['client_secret'] === '' || $config['redirect_uri'] === '') {
    echo '<h1>Missing configuration</h1><p>Set client id, secret and redirect URI in <code>config/spotify.php</code> first.</p>';
    exit;
}

$error = $_GET['error'] ?? null;
if (is_string($error)) {
    echo '<h1>Authorisation denied</h1><p>Spotify returned: <code>' . htmlspecialchars($error) . '</code></p>';
    exit;
}

$code = $_GET['code'] ?? null;

if (!is_string($code)) {
    $_SESSION['spotify_state'] = bin2hex(random_bytes(16));

    $url = 'https://accounts.spotify.com/authorize?' . http_build_query([
        'client_id' => $config['client_id'],
        'response_type' => 'code',
        'redirect_uri' => $config['redirect_uri'],
        'scope' => 'user-top-read',
        'state' => $_SESSION['spotify_state'],
        'show_dialog' => 'true',
    ]);

    echo '<h1>Connect Spotify</h1>';
    echo '<p><a href="' . htmlspecialchars($url) . '">Log in with Spotify and grant access</a></p>';
    exit;
}

$state = $_GET['state'] ?? '';
if (!is_string($state) || !hash_equals($_SESSION['spotify_state'] ?? '', $state)) {
    echo '<h1>State mismatch</h1><p>Start over from this page in the same browser session.</p>';
    exit;
}
unset($_SESSION['spotify_state']);

$response = spotify_token_request([
    'grant_type' => 'authorization_code',
    'code' => $code,
    'redirect_uri' => $config['redirect_uri'],
]);

$refreshToken = $response['refresh_token'] ?? null;
if (!is_string($refreshToken) || $refreshToken === '') {
    echo '<h1>Token exchange failed</h1><p>Check that the redirect URI matches the one registered in the Spotify dashboard exactly.</p>';
    exit;
}

echo '<h1>Done</h1><p>Add this to <code>config/spotify.php</code> as <code>refresh_token</code>, then delete <code>spotify-auth.php</code>:</p>';
echo '<p><code>' . htmlspecialchars($refreshToken) . '</code></p>';
