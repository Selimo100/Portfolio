<?php

declare(strict_types=1);

/**
 * Example configuration for the Momo assistant.
 *
 * Momo works with NO configuration at all: without an API key it answers from
 * the local engine in lib/momo-local.php, which is free and never calls out to
 * a third party.
 *
 * Only use this file if you want a real AI provider and your host offers no way
 * to set environment variables. Environment variables always take precedence.
 *
 *   cp config/openai.example.php config/openai.php
 *
 * config/openai.php is git-ignored. Never put a real key in a committed file.
 */

return [
    // 'local' (free, no key), 'gemini', 'groq' or 'openai'.
    // Leave empty to auto-detect: the first provider with a key configured wins,
    // otherwise the local engine is used.
    'provider' => '',

    // API key for the OpenAI provider. Gemini and Groq keys must be supplied
    // via the GEMINI_API_KEY / GROQ_API_KEY environment variables.
    'api_key' => '',

    // Optional model override. Each provider has a sensible default.
    'model' => '',

    // Set to false to disable the assistant endpoint entirely.
    'enabled' => true,
];
