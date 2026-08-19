<?php

declare(strict_types=1);

/**
 * Reads the hand-written knowledge file, data/knowledge.md.
 *
 * The format is deliberately plain so the file can be edited without touching
 * PHP. Each entry starts with a "## " heading and looks like this:
 *
 *   ## Which editor does Selina use?
 *   keywords: editor, ide, vscode
 *   She works mainly in Visual Studio Code.
 *
 * The heading doubles as the question and as matching material; the optional
 * keywords line adds extra trigger words; everything after it is the answer.
 */

const MOMO_KNOWLEDGE_FILE = __DIR__ . '/../data/knowledge.md';
const MOMO_KNOWLEDGE_MAX_BYTES = 262144; // 256 KB
const MOMO_KNOWLEDGE_MIN_SCORE = 3.0;

/**
 * A single generic keyword must not be enough — otherwise "favourite pizza
 * topping" would match an entry keyed on "favourite". At least two distinct
 * terms have to line up.
 */
const MOMO_KNOWLEDGE_MIN_SIGNALS = 2;

/**
 * @return list<array{question: string, keywords: list<string>, answer: string}>
 */
function momo_knowledge_entries(): array
{
    static $entries = null;
    if ($entries !== null) {
        return $entries;
    }

    $entries = [];

    if (!is_readable(MOMO_KNOWLEDGE_FILE)) {
        return $entries;
    }

    $size = filesize(MOMO_KNOWLEDGE_FILE);
    if ($size === false || $size > MOMO_KNOWLEDGE_MAX_BYTES) {
        error_log('[momo] knowledge file missing or too large, ignoring it');
        return $entries;
    }

    $raw = file_get_contents(MOMO_KNOWLEDGE_FILE);
    if ($raw === false) {
        return $entries;
    }

    return $entries = momo_knowledge_parse($raw);
}

/**
 * @return list<array{question: string, keywords: list<string>, answer: string}>
 */
function momo_knowledge_parse(string $raw): array
{
    $raw = str_replace(["\r\n", "\r"], "\n", $raw);
    $entries = [];

    // Split on "## " headings at the start of a line.
    $blocks = preg_split('/^##[ \t]+/m', $raw) ?: [];

    foreach ($blocks as $index => $block) {
        if ($index === 0) {
            continue; // Anything before the first heading is a comment.
        }

        $lines = explode("\n", $block);
        $question = trim((string) array_shift($lines));

        if ($question === '') {
            continue;
        }

        $keywords = [];
        while ($lines !== [] && preg_match('/^\s*keywords\s*:(.*)$/i', $lines[0], $match) === 1) {
            foreach (explode(',', $match[1]) as $keyword) {
                $keyword = trim($keyword);
                if ($keyword !== '') {
                    $keywords[] = $keyword;
                }
            }
            array_shift($lines);
        }

        $answer = trim(implode("\n", $lines));
        if ($answer === '') {
            continue;
        }

        $entries[] = [
            'question' => $question,
            'keywords' => $keywords,
            'answer' => $answer,
        ];
    }

    return $entries;
}

/**
 * Finds the best hand-written answer for a question, or null when nothing
 * matches confidently enough.
 *
 * $needle must already be normalised by momo_local_normalise().
 */
function momo_knowledge_match(string $needle): ?string
{
    $best = null;
    $bestScore = MOMO_KNOWLEDGE_MIN_SCORE - 0.001;

    foreach (momo_knowledge_entries() as $entry) {
        $score = 0.0;
        $signals = [];

        // Explicit keywords are the strongest signal.
        foreach ($entry['keywords'] as $keyword) {
            if (momo_local_has_keyword($needle, $keyword)) {
                $score += 2 + (mb_strlen($keyword, 'UTF-8') / 20);
                $signals[trim(momo_local_normalise($keyword))] = true;
            }
        }

        // Meaningful words from the heading count for less.
        foreach (momo_knowledge_terms($entry['question']) as $term) {
            if (momo_local_has_keyword($needle, $term)) {
                $score += 1;
                $signals[$term] = true;
            }
        }

        if (count($signals) < MOMO_KNOWLEDGE_MIN_SIGNALS) {
            continue;
        }

        if ($score > $bestScore) {
            $bestScore = $score;
            $best = $entry['answer'];
        }
    }

    return $best;
}

/**
 * Splits a heading into matchable terms, dropping short filler words.
 *
 * @return list<string>
 */
function momo_knowledge_terms(string $question): array
{
    static $stopWords = ['what', 'which', 'where', 'when', 'does', 'did', 'has', 'have', 'her', 'she',
        'the', 'and', 'for', 'with', 'about', 'selina', 'you', 'your', 'this', 'that', 'from', 'are',
        'was', 'ist', 'sie', 'ihre', 'ihr', 'wie', 'was', 'welche', 'welches', 'wer', 'hat', 'der',
        'die', 'das', 'und', 'für', 'mit', 'von'];

    $normalised = trim(momo_local_normalise($question));
    $terms = [];

    foreach (explode(' ', $normalised) as $word) {
        if (mb_strlen($word, 'UTF-8') >= 4 && !in_array($word, $stopWords, true)) {
            $terms[] = $word;
        }
    }

    return array_values(array_unique($terms));
}

/**
 * The knowledge entries as plain text, appended to the trusted context that
 * remote providers receive.
 */
function momo_knowledge_as_text(): string
{
    $parts = [];

    foreach (momo_knowledge_entries() as $entry) {
        $parts[] = $entry['question'] . "\n" . $entry['answer'];
    }

    return implode("\n\n", $parts);
}
