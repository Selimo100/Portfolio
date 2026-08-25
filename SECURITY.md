# Security Policy

## Supported versions

This is a single deployed website rather than a distributed package. Only the
current `main` branch, and the build running at <https://selina.mogicato.ch>,
receive fixes.

## Reporting a vulnerability

Please **do not open a public issue** for security problems.

Report privately through GitHub's Private Vulnerability Reporting:

> [Open a security advisory](https://github.com/Selimo100/Portfolio/security/advisories/new)

If that form is unavailable, contact the repository owner privately through the
contact channel listed on the [GitHub profile](https://github.com/Selimo100).

Please include what you observed, how to reproduce it, and the impact you
believe it has. You can expect an acknowledgement within a few days.

## Scope

Particularly relevant areas:

- `server/ask.php` — the Momo endpoint: input validation, rate limiting, prompt
  injection, and the fixed allowlist of UI actions
- `server/sendMail.php` — the contact endpoint: header injection, mail relaying
- `server/spotify-top.php` / `server/spotify-auth.php` — token handling
- `server/config/` and `server/storage/` — credential and runtime-state exposure

## Handling of secrets

No credentials belong in this repository. API keys are read from the server
environment, or from `server/config/openai.php` and `server/config/spotify.php`,
which are git-ignored and additionally blocked from HTTP access by
`server/config/.htaccess`. FTP credentials live in `.env.deploy`, which is
git-ignored; `.env.deploy.example` documents the shape with placeholders only.

If you believe a credential was ever committed, report it privately as above so
it can be rotated.
