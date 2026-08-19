<?php

declare(strict_types=1);

/**
 * Example configuration for the Spotify top-tracks widget.
 *
 * Without this file (or the matching environment variables) the About section
 * simply hides the music list, so the site keeps working unconfigured.
 *
 *   cp config/spotify.example.php config/spotify.php
 *
 * config/spotify.php is git-ignored. Never put real secrets in a committed file.
 * Environment variables always take precedence.
 */

return [
    // From https://developer.spotify.com/dashboard (SPOTIFY_CLIENT_ID).
    'client_id' => '',

    // From the same app page, "View client secret" (SPOTIFY_CLIENT_SECRET).
    'client_secret' => '',

    // Redirect URI registered in the app settings. Must match exactly.
    // Spotify rejects "localhost": use the 127.0.0.1 loopback address locally,
    // and an https URL in production.
    'redirect_uri' => 'http://127.0.0.1:8000/spotify-auth.php',

    // Long-lived refresh token, obtained once by running spotify-auth.php
    // (SPOTIFY_REFRESH_TOKEN).
    'refresh_token' => '',
];
