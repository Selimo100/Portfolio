<?php

declare(strict_types=1);

/**
 * Contact form endpoint.
 *
 * Answers JSON rather than redirecting, because the form now lives in a static
 * page that stays put while the request is in flight.
 */

ini_set('display_errors', '0');
header('Content-Type: application/json; charset=utf-8');
header('X-Content-Type-Options: nosniff');
header('Cache-Control: no-store');

const CONTACT_RECIPIENT = 'selimo.contact@gmail.com';
const CONTACT_MAX_MESSAGE_LENGTH = 4000;

/**
 * @param array<string, mixed> $payload
 */
function contact_respond(int $status, array $payload): never
{
    http_response_code($status);
    echo json_encode($payload, JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES);
    exit;
}

if (($_SERVER['REQUEST_METHOD'] ?? '') !== 'POST') {
    contact_respond(405, ['success' => false, 'error' => 'Method not allowed.']);
}

$name = trim(strip_tags((string) ($_POST['name'] ?? '')));
$email = trim((string) ($_POST['email'] ?? ''));
$message = trim(strip_tags((string) ($_POST['message'] ?? '')));

if ($name === '' || $message === '' || !filter_var($email, FILTER_VALIDATE_EMAIL)) {
    contact_respond(422, [
        'success' => false,
        'error' => 'Please fill in your name, a valid email address and a message.',
    ]);
}

if (mb_strlen($message, 'UTF-8') > CONTACT_MAX_MESSAGE_LENGTH) {
    contact_respond(422, ['success' => false, 'error' => 'Please shorten your message.']);
}

// The sender address is attacker-controlled, so it never reaches a mail header
// unescaped; From stays on our own domain and the visitor goes in Reply-To.
$replyTo = preg_replace('/[\r\n]+/', '', $email) ?? '';
$safeName = preg_replace('/[\r\n]+/', ' ', $name) ?? '';

$headers = implode("\r\n", [
    'From: Portfolio <no-reply@mogicato.ch>',
    'Reply-To: ' . $replyTo,
    'Content-Type: text/plain; charset=UTF-8',
]);

$body = "Name: {$safeName}\nEmail: {$replyTo}\n\nMessage:\n{$message}\n";

if (!mail(CONTACT_RECIPIENT, 'Portfolio contact from ' . $safeName, $body, $headers)) {
    error_log('[contact] mail() returned false');
    contact_respond(502, [
        'success' => false,
        'error' => 'The message could not be sent. Please email me directly.',
    ]);
}

contact_respond(200, ['success' => true, 'message' => 'Message sent — thank you!']);
