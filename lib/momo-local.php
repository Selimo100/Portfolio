<?php

declare(strict_types=1);

/**
 * Local answering engine for Momo.
 *
 * Matches a visitor question against intents and answers straight from
 * data/profile-context.php. No API, no cost, no network — and because every
 * answer is assembled from the context array, it cannot invent facts.
 *
 * Used as the default provider, and as the fallback whenever a remote provider
 * is unavailable.
 */

require_once __DIR__ . '/momo-knowledge.php';

/**
 * Intent definitions. Keywords are matched case-insensitively against the
 * question in English and German. `weight` lifts intents that would otherwise
 * lose to a more generic one.
 *
 * @return array<string, array{keywords: list<string>, weight?: float}>
 */
function momo_local_intents(): array
{
    return [
        'greeting' => [
            'keywords' => ['hello', 'hi ', 'hey', 'hallo', 'guten tag', 'servus', 'moin', 'grüezi', 'ciao'],
        ],
        'assistant' => [
            'keywords' => ['who are you', 'what are you', 'wer bist du', 'was bist du', 'your name',
                'dein name', 'momo', 'chatbot', 'bot', 'assistant', 'assistent'],
        ],
        'about' => [
            'keywords' => ['who is', 'about', 'wer ist', 'über', 'ueber', 'tell me about selina',
                'introduce', 'vorstellen', 'background', 'hintergrund', 'herself', 'she like'],
        ],
        'skills' => [
            'keywords' => ['skill', 'tech', 'technolog', 'technik', 'stack', 'programming language',
                'programmiersprache', 'framework', 'tool', 'werkzeug', 'database', 'datenbank',
                'frontend', 'backend', 'know how', 'kennt sie', 'kann sie', 'arbeitet sie mit',
                'code in', 'coding', 'programmier'],
            'weight' => 1.1,
        ],
        'projects' => [
            'keywords' => ['project', 'projekt', 'built', 'build', 'gebaut', 'entwickelt', 'app',
                'website', 'portfolio piece', 'worked on', 'gearbeitet', 'work has', 'showcase'],
            'weight' => 1.1,
        ],
        'education' => [
            'keywords' => ['education', 'ausbildung', 'apprentice', 'lehre', 'lehrstelle', 'school',
                'schule', 'bms', 'study', 'studium', 'learning', 'lernt', 'basislehrjahr', 'bbc',
                'degree', 'abschluss', 'training'],
            'weight' => 1.2,
        ],
        'experience' => [
            'keywords' => ['experience', 'erfahrung', 'how long', 'wie lange', 'years', 'jahre',
                'since when', 'seit wann', 'career', 'karriere', 'job', 'beruf', 'role', 'position'],
        ],
        'languages' => [
            'keywords' => ['speak', 'spricht', 'spoken language', 'sprache', 'sprachen', 'german',
                'deutsch', 'italian', 'italienisch', 'french', 'französisch', 'english', 'englisch',
                'spanish', 'spanisch', 'mehrsprachig'],
            'weight' => 1.2,
        ],
        'karate' => [
            'keywords' => ['karate', 'sport', 'martial art', 'kampfsport', 'belt', 'gürtel', 'guertel',
                'dojo', 'kaisho', 'competition', 'wettkampf', 'turnier', 'shorin'],
            'weight' => 1.3,
        ],
        'music' => [
            'keywords' => ['music', 'musik', 'song', 'songs', 'lied', 'lieder', 'spotify', 'track',
                'tracks', 'artist', 'artists', 'band', 'listen', 'hören', 'hoeren', 'playlist',
                'album', 'streamed', 'gestreamt'],
            'weight' => 1.3,
        ],
        'interests' => [
            'keywords' => ['interest', 'interesse', 'hobby', 'hobbies', 'hobbys', 'free time',
                'freizeit', 'passion', 'leidenschaft', 'likes', 'mag sie', 'besides', 'neben'],
        ],
        'homelab' => [
            'keywords' => ['homelab', 'home lab', 'server', 'self-host', 'selfhost', 'selbst gehostet',
                'linux', 'docker', 'nginx', 'virtualization', 'netzwerk', 'networking'],
            'weight' => 1.2,
        ],
        'contact' => [
            'keywords' => ['contact', 'kontakt', 'hire', 'einstellen', 'anstellen', 'reach', 'erreichen',
                'email', 'e-mail', 'mail', 'linkedin', 'github', 'collaborat', 'zusammenarbeit',
                'bewerb', 'anfrage', 'get in touch', 'schreiben', 'melden'],
            'weight' => 1.2,
        ],
        'location' => [
            'keywords' => ['where', 'wo ', 'woher', 'location', 'ort', 'based', 'live', 'wohnt',
                'switzerland', 'schweiz', 'zurich', 'zürich', 'country', 'land'],
        ],
        'site' => [
            'keywords' => ['this site', 'this website', 'diese seite', 'diese website', 'portfolio built',
                'arcade', 'game', 'spiel', 'easter egg', 'theme', 'dark mode'],
        ],
    ];
}

/**
 * Produces an answer from the profile context, or null when nothing matches
 * well enough (the caller then returns an honest "I don't know").
 *
 * @param array<string, mixed> $context
 */
function momo_local_answer(string $question, array $context): ?string
{
    $needle = momo_local_normalise($question);

    if (momo_local_is_out_of_scope($needle)) {
        return momo_local_refusal();
    }

    // Hand-written entries from data/knowledge.md win, so they can extend and
    // override the built-in intents without any code change.
    $custom = momo_knowledge_match($needle);
    if ($custom !== null) {
        return $custom;
    }

    // A directly named project always wins over a generic intent.
    $project = momo_local_find_project($needle, $context);
    if ($project !== null) {
        return momo_local_describe_project($project);
    }

    // A bare technology name only counts as a question about Selina when the
    // question actually refers to her — otherwise "write Python malware" would
    // be read as a question about her Python skills.
    if (momo_local_is_about_selina($needle)) {
        $technology = momo_local_find_technology($needle, $context);
        if ($technology !== null) {
            return momo_local_describe_technology($technology, $context);
        }
    }

    $intent = momo_local_match_intent($needle);
    if ($intent === null) {
        return null;
    }

    return momo_local_render($intent, $context);
}

/**
 * Lower-cases, folds punctuation to spaces and pads the result, so keywords can
 * be matched on word boundaries regardless of how the visitor typed them.
 */
function momo_local_normalise(string $question): string
{
    $lower = mb_strtolower($question, 'UTF-8');
    $lower = preg_replace('/[^\p{L}\p{N}]+/u', ' ', $lower) ?? '';

    return ' ' . trim(preg_replace('/\s+/u', ' ', $lower) ?? '') . ' ';
}

/**
 * Short keywords must match a whole word ("hi" must not match "this"); longer
 * ones may match from a word start, so "programmier" also catches
 * "programmiersprache".
 */
function momo_local_has_keyword(string $needle, string $keyword): bool
{
    $keyword = trim(momo_local_normalise($keyword));
    if ($keyword === '') {
        return false;
    }

    if (mb_strlen($keyword, 'UTF-8') < 4) {
        return str_contains($needle, ' ' . $keyword . ' ');
    }

    return str_contains($needle, ' ' . $keyword);
}

/**
 * @param list<string> $keywords
 */
function momo_local_has_any(string $needle, array $keywords): bool
{
    foreach ($keywords as $keyword) {
        if (momo_local_has_keyword($needle, $keyword)) {
            return true;
        }
    }

    return false;
}

function momo_local_is_about_selina(string $needle): bool
{
    return momo_local_has_any($needle, ['selina', 'she', 'her', 'hers', 'sie', 'ihr', 'ihre', 'mogicato']);
}

/**
 * Two guards: attempts to reprogram or interrogate the assistant are always
 * refused, general-knowledge requests only when they are not about Selina.
 */
function momo_local_is_out_of_scope(string $needle): bool
{
    $injection = ['ignore all', 'ignore your', 'ignore previous', 'ignore the previous', 'system prompt',
        'api key', 'your instructions', 'your prompt', 'jailbreak', 'act as', 'pretend', 'reveal your',
        'environment variable', 'you are now', 'disregard'];

    if (momo_local_has_any($needle, $injection)) {
        return true;
    }

    $offTopic = ['write', 'schreib', 'solve', 'homework', 'hausaufgabe', 'capital of', 'hauptstadt',
        'translate', 'malware', 'exploit', 'recipe for', 'calculate', 'weather', 'wetter', 'joke', 'witz'];

    return momo_local_has_any($needle, $offTopic) && !momo_local_is_about_selina($needle);
}

function momo_local_refusal(): string
{
    return 'I can only answer questions about Selina using information available in her portfolio.';
}

function momo_local_match_intent(string $needle): ?string
{
    $best = null;
    $bestScore = 0.0;

    foreach (momo_local_intents() as $intent => $definition) {
        $score = 0.0;
        foreach ($definition['keywords'] as $keyword) {
            if (momo_local_has_keyword($needle, $keyword)) {
                // Longer keywords are more specific, so they count for more.
                $score += 1 + (mb_strlen($keyword, 'UTF-8') / 20);
            }
        }

        $score *= $definition['weight'] ?? 1.0;

        if ($score > $bestScore) {
            $bestScore = $score;
            $best = $intent;
        }
    }

    return $bestScore > 0 ? $best : null;
}

/**
 * @param array<string, mixed> $context
 * @return array<string, mixed>|null
 */
function momo_local_find_project(string $needle, array $context): ?array
{
    foreach ($context['projects'] ?? [] as $project) {
        $title = trim(momo_local_normalise((string) $project['title']));
        $short = trim(str_replace([' app', ' website'], '', $title));

        if (mb_strlen($short, 'UTF-8') >= 4 && str_contains($needle, ' ' . $short)) {
            return $project;
        }
    }

    return null;
}

/**
 * @param array<string, mixed> $project
 */
function momo_local_describe_project(array $project): string
{
    $answer = $project['title'] . ' — ' . $project['type'] . '. ' . $project['description'];

    if (!empty($project['timeframe'])) {
        $answer .= "\n\nTimeframe: " . $project['timeframe'] . '.';
    }

    $answer .= "\n\nBuilt with: " . momo_local_list($project['technologies']) . '.';

    if (!empty($project['link'])) {
        $answer .= "\nYou can see it live at " . $project['link'] . '.';
    }

    return $answer;
}

/**
 * @param array<string, mixed> $context
 */
function momo_local_find_technology(string $needle, array $context): ?string
{
    $names = [];
    foreach ($context['skills'] ?? [] as $items) {
        foreach ($items as $item) {
            $names[] = (string) $item;
        }
    }

    // Longest name first, so "React Native" wins over "React".
    usort($names, static fn(string $a, string $b): int => mb_strlen($b, 'UTF-8') <=> mb_strlen($a, 'UTF-8'));

    foreach ($names as $name) {
        $normalised = trim(momo_local_normalise($name));
        if ($normalised !== '' && str_contains($needle, ' ' . $normalised . ' ')) {
            return $name;
        }
    }

    return null;
}

/**
 * @param array<string, mixed> $context
 */
function momo_local_describe_technology(string $technology, array $context): string
{
    $answer = 'Yes — ' . $technology . ' is part of Selina\'s tech stack.';

    $used = [];
    foreach ($context['projects'] ?? [] as $project) {
        foreach ($project['technologies'] as $tech) {
            if (mb_strtolower((string) $tech, 'UTF-8') === mb_strtolower($technology, 'UTF-8')) {
                $used[] = $project['title'];
            }
        }
    }

    if ($used !== []) {
        $answer .= ' She used it in ' . momo_local_list($used) . '.';
    }

    $answer .= "\n\nYou can find her full tech stack in the About section of the portfolio.";

    return $answer;
}

/**
 * @param array<string, mixed> $context
 */
function momo_local_render(string $intent, array $context): string
{
    $identity = $context['identity'];
    $about = $context['about'];

    switch ($intent) {
        case 'greeting':
            return "Hi! I'm Momo, " . $identity['name'] . "'s portfolio assistant. "
                . 'Ask me about her projects, skills, apprenticeship or how to get in touch.';

        case 'assistant':
            return "I'm Momo, the assistant on " . $identity['name'] . "'s portfolio. "
                . "I'm not Selina herself — I just answer questions about her using the information on this site. "
                . 'Anything outside her portfolio is out of my scope.';

        case 'about':
            return $identity['name'] . ' is an ' . $identity['role'] . ' based in ' . $identity['location'] . ".\n\n"
                . $about['summary'] . "\n\n"
                . 'What she cares about most: ' . momo_local_list($about['values']) . '.';

        case 'skills':
            $lines = [];
            foreach ($context['skills'] as $group => $items) {
                $lines[] = ucfirst(str_replace('_', ' ', $group)) . ': ' . momo_local_list($items) . '.';
            }

            return "Here's what Selina works with:\n\n" . implode("\n", $lines);

        case 'projects':
            $lines = [];
            foreach ($context['projects'] as $project) {
                $lines[] = $project['title'] . ' — ' . $project['description']
                    . ' (' . momo_local_list($project['technologies']) . ')';
            }

            return "Selina has built these projects:\n\n" . implode("\n\n", $lines)
                . "\n\nAsk me about any one of them for more detail.";

        case 'education':
            $education = $context['education'];

            return $education['apprenticeship'] . "\n\n" . $education['vocational_school'] . "\n\n"
                . 'Her focus: ' . $education['focus'] . ' ' . $education['previous'];

        case 'experience':
            return 'Selina is an ' . $identity['role'] . ' with ' . $about['professional_experience'] . '. '
                . 'She has been programming since ' . $about['programming_since'] . ".\n\n"
                . $about['works_across'];

        case 'languages':
            return 'Selina speaks ' . momo_local_list($about['spoken_languages']) . '.';

        case 'karate':
            $karate = $context['interests']['karate'];

            return $karate['summary'] . "\n\n"
                . 'Current belt: ' . $karate['current_belt'] . ".\n"
                . $karate['teaching'] . "\n\n"
                . 'Competitions: ' . momo_local_list($karate['competitions']) . ".\n\n"
                . 'She also built ' . $karate['related_project'];

        case 'music':
            $music = $context['interests']['music'];
            $answer = $music['summary'];

            if ($music['top_tracks'] !== []) {
                $answer .= "\n\nHer top tracks right now: " . momo_local_list($music['top_tracks']) . '.';
            }

            return $answer . "\n\n" . $music['top_tracks_note'];

        case 'interests':
            return 'Professionally Selina is interested in ' . momo_local_list($context['interests']['professional']) . ".\n\n"
                . 'Outside of that: ' . $context['interests']['karate']['summary'] . ' '
                . $context['interests']['music']['summary'] . "\n\n"
                . $context['interests']['other'];

        case 'homelab':
            return $context['interests']['other'];

        case 'contact':
            $contact = $context['contact'];

            return $contact['note'] . "\n\nYou can also reach her by email at " . $contact['email']
                . ', on LinkedIn (' . $contact['linkedin'] . ') or on GitHub (' . $contact['github'] . ').';

        case 'location':
            return 'Selina is based in ' . $identity['location'] . '. Her portfolio is at ' . $identity['portfolio'] . '.';

        case 'site':
            $site = $context['portfolio_site'];

            return 'This portfolio is built with ' . $site['built_with'] . "\n\n"
                . 'It has these sections: ' . momo_local_list($site['sections']) . ".\n\n"
                . $site['extras'];
    }

    return momo_local_unknown();
}

function momo_local_unknown(): string
{
    return "I don't know that based on Selina's portfolio.\n\n"
        . 'I can tell you about her projects, technologies, apprenticeship, karate, music, or how to contact her.';
}

/**
 * @param array<int, mixed> $items
 */
function momo_local_list(array $items): string
{
    $items = array_values(array_map('strval', $items));
    $count = count($items);

    if ($count === 0) {
        return '';
    }

    if ($count === 1) {
        return $items[0];
    }

    $last = array_pop($items);

    return implode(', ', $items) . ' and ' . $last;
}
