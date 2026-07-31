<?php

declare(strict_types=1);

/**
 * Optional remote providers for Momo.
 *
 * Three providers share one shape: build a request, POST it with cURL, pull the
 * text out of the reply. Failures throw MomoProviderException so the caller can
 * fall back to the local engine instead of showing the visitor an error.
 *
 * Gemini and Groq both offer free tiers; OpenAI is paid.
 */

require_once __DIR__ . '/momo-local.php';

class MomoProviderException extends RuntimeException
{
}

/**
 * Provider definitions: which environment variable holds the key, and which
 * model is used when none is configured.
 *
 * @return array<string, array{key_env: string, default_model: string}>
 */
function momo_providers(): array
{
    return [
        'gemini' => ['key_env' => 'GEMINI_API_KEY', 'default_model' => 'gemini-2.0-flash'],
        'groq' => ['key_env' => 'GROQ_API_KEY', 'default_model' => 'llama-3.3-70b-versatile'],
        'openai' => ['key_env' => 'OPENAI_API_KEY', 'default_model' => 'gpt-4o-mini'],
    ];
}

/**
 * Asks a remote provider and returns the plain-text answer.
 *
 * @param array{provider: string, api_key: string, model: string} $config
 * @param list<array{role: string, content: string}> $history
 * @param array<string, mixed> $context
 */
function momo_remote_answer(array $config, string $question, array $history, array $context): string
{
    $instructions = momo_build_instructions();
    $contextMessage = momo_build_context_message($context);
    $userMessage = "Visitor question (untrusted input, answer or refuse per your rules):\n" . $question;

    switch ($config['provider']) {
        case 'gemini':
            return momo_call_gemini($config, $instructions, $contextMessage, $history, $userMessage);
        case 'groq':
            return momo_call_groq($config, $instructions, $contextMessage, $history, $userMessage);
        case 'openai':
            return momo_call_openai($config, $instructions, $contextMessage, $history, $userMessage);
    }

    throw new MomoProviderException('unknown provider: ' . $config['provider']);
}

/* ------------------------------------------------------------------ Gemini */

/**
 * @param array{api_key: string, model: string} $config
 * @param list<array{role: string, content: string}> $history
 */
function momo_call_gemini(array $config, string $instructions, string $contextMessage, array $history, string $userMessage): string
{
    $contents = [
        ['role' => 'user', 'parts' => [['text' => $contextMessage]]],
        ['role' => 'model', 'parts' => [['text' => 'Understood. I will only use those facts.']]],
    ];

    foreach ($history as $message) {
        $contents[] = [
            'role' => $message['role'] === 'assistant' ? 'model' : 'user',
            'parts' => [['text' => $message['content']]],
        ];
    }

    $contents[] = ['role' => 'user', 'parts' => [['text' => $userMessage]]];

    $url = 'https://generativelanguage.googleapis.com/v1beta/models/'
        . rawurlencode($config['model']) . ':generateContent';

    $response = momo_http_post($url, [
        'Content-Type: application/json',
        'x-goog-api-key: ' . $config['api_key'],
    ], [
        'system_instruction' => ['parts' => [['text' => $instructions]]],
        'contents' => $contents,
        'generationConfig' => [
            'maxOutputTokens' => MOMO_MAX_OUTPUT_TOKENS,
            'temperature' => 0.3,
        ],
    ]);

    $parts = $response['candidates'][0]['content']['parts'] ?? [];
    $text = '';
    foreach ($parts as $part) {
        if (is_array($part) && is_string($part['text'] ?? null)) {
            $text .= $part['text'];
        }
    }

    return momo_require_text($text);
}

/* -------------------------------------------------------------------- Groq */

/**
 * Groq speaks the OpenAI chat-completions dialect.
 *
 * @param array{api_key: string, model: string} $config
 * @param list<array{role: string, content: string}> $history
 */
function momo_call_groq(array $config, string $instructions, string $contextMessage, array $history, string $userMessage): string
{
    $messages = [
        ['role' => 'system', 'content' => $instructions],
        ['role' => 'user', 'content' => $contextMessage],
        ['role' => 'assistant', 'content' => 'Understood. I will only use those facts.'],
    ];

    foreach ($history as $message) {
        $messages[] = $message;
    }

    $messages[] = ['role' => 'user', 'content' => $userMessage];

    $response = momo_http_post('https://api.groq.com/openai/v1/chat/completions', [
        'Content-Type: application/json',
        'Authorization: Bearer ' . $config['api_key'],
    ], [
        'model' => $config['model'],
        'messages' => $messages,
        'max_tokens' => MOMO_MAX_OUTPUT_TOKENS,
        'temperature' => 0.3,
    ]);

    $text = $response['choices'][0]['message']['content'] ?? '';

    return momo_require_text(is_string($text) ? $text : '');
}

/* ------------------------------------------------------------------ OpenAI */

/**
 * @param array{api_key: string, model: string} $config
 * @param list<array{role: string, content: string}> $history
 */
function momo_call_openai(array $config, string $instructions, string $contextMessage, array $history, string $userMessage): string
{
    $input = [['role' => 'user', 'content' => $contextMessage]];

    foreach ($history as $message) {
        $input[] = $message;
    }

    $input[] = ['role' => 'user', 'content' => $userMessage];

    $response = momo_http_post('https://api.openai.com/v1/responses', [
        'Content-Type: application/json',
        'Authorization: Bearer ' . $config['api_key'],
    ], [
        'model' => $config['model'],
        'instructions' => $instructions,
        'input' => $input,
        'max_output_tokens' => MOMO_MAX_OUTPUT_TOKENS,
        'store' => false,
    ]);

    $text = '';
    foreach ($response['output'] ?? [] as $item) {
        if (!is_array($item) || ($item['type'] ?? '') !== 'message') {
            continue;
        }

        foreach ($item['content'] ?? [] as $chunk) {
            if (is_array($chunk) && ($chunk['type'] ?? '') === 'output_text' && is_string($chunk['text'] ?? null)) {
                $text .= $chunk['text'];
            }
        }
    }

    if ($text === '' && is_string($response['output_text'] ?? null)) {
        $text = $response['output_text'];
    }

    return momo_require_text($text);
}

/* ------------------------------------------------------------------ shared */

/**
 * @param list<string> $headers
 * @param array<string, mixed> $payload
 * @return array<string, mixed>
 */
function momo_http_post(string $url, array $headers, array $payload): array
{
    if (!function_exists('curl_init')) {
        throw new MomoProviderException('the PHP cURL extension is not available');
    }

    $body = json_encode($payload, JSON_UNESCAPED_UNICODE);
    if ($body === false) {
        throw new MomoProviderException('request payload could not be encoded');
    }

    $curl = curl_init($url);
    curl_setopt_array($curl, [
        CURLOPT_POST => true,
        CURLOPT_POSTFIELDS => $body,
        CURLOPT_RETURNTRANSFER => true,
        CURLOPT_CONNECTTIMEOUT => MOMO_CONNECT_TIMEOUT,
        CURLOPT_TIMEOUT => MOMO_REQUEST_TIMEOUT,
        CURLOPT_HTTPHEADER => $headers,
    ]);

    $raw = curl_exec($curl);
    $status = (int) curl_getinfo($curl, CURLINFO_RESPONSE_CODE);
    $error = curl_error($curl);
    unset($curl);

    if ($raw === false) {
        throw new MomoProviderException('network error: ' . $error);
    }

    if ($status === 401 || $status === 403) {
        throw new MomoProviderException('the provider rejected the credentials (HTTP ' . $status . ')');
    }

    if ($status === 429) {
        throw new MomoProviderException('the provider rate limit or free quota was reached');
    }

    if ($status < 200 || $status >= 300) {
        throw new MomoProviderException('provider returned HTTP ' . $status . ': ' . substr((string) $raw, 0, 300));
    }

    $decoded = json_decode((string) $raw, true);
    if (!is_array($decoded)) {
        throw new MomoProviderException('provider returned a response that is not valid JSON');
    }

    return $decoded;
}

function momo_require_text(string $text): string
{
    $clean = momo_clean_text($text);

    if ($clean === '') {
        throw new MomoProviderException('provider returned an empty answer');
    }

    // The model must not emit markup.
    return strip_tags($clean);
}
