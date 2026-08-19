# Selina Mogicato Portfolio

A trilingual portfolio site built with Next.js, exported as static HTML and
served from shared hosting alongside a handful of small PHP endpoints.

It presents selected projects, background information, contact details, a
Spotify "on repeat" card, and a hidden arcade layer that adds some personality
without getting in the way of the main experience.

## Overview

The site is designed around a minimal, polished presentation: strong typography
(Archivo + IBM Plex), restrained motion, clear spacing, and a light/dark theme
system. Every page exists in English, German and Italian.

The front end is a fully static bundle — no Node process runs in production.
The three things that genuinely need a server (the Momo assistant, the contact
form, and the Spotify feed) are small PHP files uploaded next to it.

## Highlights

- Static export: `out/` uploads straight to the Hostfactory web root
- Three languages (EN / DE / IT), each a real prerendered URL
- Light and dark theme with persisted preference and no flash on load
- Scroll-reveal animations, with sensible no-JS and reduced-motion fallbacks
- Contact form posting to a JSON PHP endpoint
- Spotify top-tracks card, server-cached, with a build-time snapshot fallback
- Dedicated arcade section with multiple browser games and hidden easter eggs
- "Momo", a scoped AI assistant answering questions from a local knowledge base

## Stack

- Next.js 15 (App Router, `output: "export"`)
- React 19 + TypeScript
- Hand-written CSS with design tokens — no UI framework
- PHP 8.1+ for the three dynamic endpoints

## Project Structure

```text
.
├── src/
│   ├── app/
│   │   ├── layout.tsx           # <html>, fonts, theme boot script
│   │   ├── page.tsx             # Locale redirect at /
│   │   └── [lang]/              # One route tree, prerendered per language
│   │       ├── layout.tsx       # Header, footer, Momo, scroll reveal
│   │       ├── page.tsx         # Home
│   │       └── work|about|stack|karate|contact|imprint/
│   ├── components/              # Header, Momo, project cards, forms, …
│   ├── lib/
│   │   ├── content.ts           # All copy and data, in all three languages
│   │   └── i18n.ts              # Locale list, route helpers
│   └── styles/globals.css       # Design tokens + every component style
├── server/                      # Uploaded alongside the export
│   ├── ask.php                  # Momo endpoint
│   ├── sendMail.php             # Contact form endpoint (JSON)
│   ├── spotify-top.php          # Top-tracks JSON feed
│   ├── spotify-auth.php         # One-time Spotify authorisation flow
│   ├── .htaccess                # Deploy rewrite/caching rules
│   ├── lib/  data/  config/     # Support files for the endpoints
│   └── storage/                 # Runtime state — never overwritten on deploy
├── public/assets/
│   ├── images/                  # Portfolio and branding assets
│   └── arcade/                  # Separate arcade experience and game files
├── scripts/copy-server-files.mjs
└── README.md
```

Content lives in exactly one place: `src/lib/content.ts`. Adding a project or
fixing a wording means editing that file, in all three languages.

## Local Development

The site needs two processes: Next for the pages, PHP for the three endpoints.
In two terminals, from the project root:

```bash
npm install      # once
npm run php      # terminal 1 — PHP endpoints on :8001 (mail is captured to a file)
npm run dev      # terminal 2 — the site on :3000
```

Open <http://localhost:3000>. `/` redirects to the best matching locale; the
real pages are `/en/`, `/de/` and `/it/`.

In development, `/ask.php`, `/sendMail.php` and `/spotify-top.php` are proxied
to the PHP server (see the dev-only `rewrites` in `next.config.ts`), so Momo,
the contact form and the Spotify card behave exactly as they do in production.
Point them elsewhere with `PHP_DEV_ORIGIN` if :8001 is taken.

`npm run dev` alone is fine for pure styling and layout work — those three
features will simply 404 until the PHP server is running too.

## Build & Deploy

```bash
npm run build
```

This runs `next build` and then copies the PHP endpoints, their support files
and the deploy `.htaccess` into `out/`. Upload the **contents** of `out/` to the
Hostfactory web root.

To check the real bundle before uploading — static pages and PHP together, the
way the server will run it:

```bash
npm run build
npm run preview        # http://localhost:8000
```

Note that `out/` has no credentials in it by design, so the Spotify card shows
the build-time snapshot there rather than live tracks. `npm run dev` reads the
real `server/config/`, so it shows live data.

Two things must never be overwritten on the server:

- `config/openai.php` and `config/spotify.php` — the real API credentials
- `storage/` — the rate-limit salt and the Spotify cache

`out/` ships empty `storage/` and `config/*.example.php` placeholders instead,
so a clean upload cannot clobber them. `storage/` and `storage/ratelimit/` need
to be writable by PHP. A generated `out/DEPLOY.txt` repeats these notes.

## Notes

- The contact form posts to `sendMail.php`, which answers JSON so the page stays
  put. See "Contact form mail" below — it does not deliver from a laptop.
- The Spotify card fetches `spotify-top.php` on the client. If Spotify is not
  configured or unreachable, the snapshot baked into the build is shown instead.
- The arcade opens directly from `assets/arcade/arcade.html`.

## Contact form mail

**Mail cannot be delivered from a development machine.** Gmail, Outlook and the
rest refuse mail sent straight from a residential IP:

```
550-5.7.1 The IP you're using to send mail is not authorized to send
email directly to our servers. Please use the SMTP relay at your
service provider instead.
```

`mail()` still returns true in that case — it only reports that the local mail
transfer agent accepted the message, which happens long before the rejection.
So the form will say "sent" and nothing will arrive, and the bounce lands in
your local mailbox (`/var/mail/$USER` on macOS), not in the browser.

To avoid that trap, `npm run php` points PHP's `sendmail_path` at
`scripts/dev-mail.sh`, which appends every outgoing message to
`server/storage/maillog` instead of trying to send it:

```bash
npm run php
# submit the form, then:
cat server/storage/maillog
```

The log is git-ignored and shows the full message with its headers, which is
what you want when checking wording or debugging the endpoint.

### On the server

Real delivery only happens on the host. Two things decide whether it lands:

- **The envelope sender.** `sendMail.php` passes `-f no-reply@mogicato.ch` as
  `mail()`'s fifth argument. This is the address receiving mail servers check
  SPF against — not the `From:` header. Without it, the host's default
  (`www-data@somehost`) is used and Gmail is likely to reject or spam-folder
  the message.
- **SPF for mogicato.ch** must authorise the Hostfactory mail servers. If the
  domain's DNS is elsewhere, add their SPF include, or change
  `CONTACT_SENDER` to an address on a domain that already authorises them.

The visitor's address goes in `Reply-To:` only, never in `From:` — putting an
arbitrary address in `From:` is what gets a domain's reputation burned.

After deploying, send yourself one test message and confirm it arrives. If it
does not, check the server's mail log; `mail()` returning true proves nothing.

## Momo — the portfolio assistant

Momo is a small AI guide in the bottom-right corner of the portfolio. It answers
questions about Selina's projects, skills, apprenticeship and interests, and
refuses everything else.

**Momo works out of the box with no API key and no cost.** By default it answers
from a local PHP engine that matches questions against the profile context. Add
a free or paid API key and it uses a real language model instead, falling back
to the local engine whenever that provider is unavailable.

### Architecture

```text
src/components/Momo.tsx  →  POST /ask.php  →  provider (Gemini / Groq / OpenAI)
                                       ↘  server/lib/momo-local.php  (default + fallback)
                                              ↑
                                  server/data/profile-context.php
```

| File | Purpose |
| --- | --- |
| `server/ask.php` | JSON endpoint: validation, rate limiting, provider choice, error handling |
| `server/lib/momo-local.php` | Free local answering engine (intents + retrieval) |
| `server/lib/momo-knowledge.php` | Parses and matches `server/data/knowledge.md` |
| `server/lib/momo-remote.php` | Optional Gemini / Groq / OpenAI providers |
| `server/data/knowledge.md` | **Plain-text file for adding your own Q&A — no code needed** |
| `server/data/profile-context.php` | Structured facts (identity, skills, education, …) |
| `server/data/projects.php` | Project list backing Momo's answers |
| `src/components/Momo.tsx` | Chat panel: prompts, message rendering, history |
| `server/config/openai.example.php` | Example configuration (no secrets) |

**Request flow:** the visitor submits a question → `Momo.tsx` POSTs
`{question, history}` as JSON → `server/ask.php` checks method, origin, content type,
question length and history shape → applies the rate limit → loads the profile
context → asks the configured provider, or the local engine → picks an optional
UI action from a fixed allowlist → returns `{success, answer, action}`.

### Providers

| Provider | Cost | Key variable | Default model |
| --- | --- | --- | --- |
| `local` | free, no signup, no network | – | – |
| `gemini` | free tier | `GEMINI_API_KEY` | `gemini-2.0-flash` |
| `groq` | free tier | `GROQ_API_KEY` | `llama-3.3-70b-versatile` |
| `openai` | paid | `OPENAI_API_KEY` | `gpt-4o-mini` |

Selection is automatic: the first provider with a key set wins, otherwise the
local engine is used. Pin one explicitly with `MOMO_PROVIDER=local|gemini|groq|openai`.

Free-tier keys come from https://aistudio.google.com/apikey (Gemini) or
https://console.groq.com/keys (Groq) — no credit card. Free tiers change over
time and typically allow the provider to use prompts for product improvement, so
the privacy note in the chat panel stays accurate either way.

### Requirements

- PHP 8.1 or newer
- Extensions: `json`, `mbstring` (plus `curl` only if you use a remote provider)
- A writable `server/storage/` directory (rate-limit buckets and the hashing salt)

### Environment variables

| Variable | Required | Default | Purpose |
| --- | --- | --- | --- |
| `MOMO_PROVIDER` | no | auto-detect | Pin a provider |
| `GEMINI_API_KEY` / `GROQ_API_KEY` / `OPENAI_API_KEY` | no | – | Enables that provider |
| `MOMO_MODEL` | no | per provider | Model override |
| `MOMO_RATE_LIMIT_SALT` | no | auto-generated | Salt for hashed visitor identifiers |

Environment variables always take precedence over `config/openai.php`.

### Local setup

```bash
php -S localhost:8000                 # works immediately, local engine

export GEMINI_API_KEY="..."           # optional: free AI provider
php -S localhost:8000
```

`config/openai.php`, `storage/ratelimit/` and `storage/rate-limit-salt` are
git-ignored. **Never commit an API key.**

### Production setup

The local engine needs no configuration at all. For a remote provider, set the
key in the server environment:

```apache
# Apache .htaccess or vhost (mod_env)
SetEnv GEMINI_API_KEY "..."
```

```ini
; PHP-FPM pool configuration
env[GEMINI_API_KEY] = ...
```

If the hosting plan offers no way to set environment variables, copy
`server/config/openai.example.php` to `config/openai.php` — that file is git-ignored and
additionally blocked by `config/.htaccess`.

Make sure `server/storage/` is writable by the web server:

```bash
chmod 770 storage
```

The `config/`, `data/`, `lib/` and `server/storage/` directories ship with an
`.htaccess` that denies direct HTTP access. On Nginx, add equivalent `location`
deny rules.

### Teaching Momo new things

There are two places, and for everyday additions you only need the first.

**1. `server/data/knowledge.md` — the easy one.** A plain text file you can fill in
without touching any code. Each entry is a heading, optional keywords, and the
answer:

```markdown
## Which editor does Selina use?
keywords: editor, ide, vscode
She works mainly in Visual Studio Code.
```

Save the file and it takes effect on the next question — no restart, no deploy
step beyond uploading the file. The local engine matches against it directly,
and remote providers receive it as additional trusted context.

Rules of thumb: give every entry at least two distinct keywords, prefer single
words over phrases, add German trigger words alongside English ones, and only
write things that may be public and are true — Momo repeats them verbatim.

**2. `server/data/profile-context.php` — the structured one.** Momo may only state facts contained in that
file — anything missing gets an honest "I don't know based on the portfolio".
Project entries come from `server/data/projects.php`, which `index.php` also uses to
render the project cards, so projects only need to be maintained once.

Only add publicly shareable information.

When adding a new topic that the **local** engine should recognise, add an
intent to `momo_local_intents()` in `server/lib/momo-local.php` and a matching branch in
`momo_local_render()`. Remote providers pick new context up automatically.

### Disabling the chatbot

Any one of:

- set `'enabled' => false` in `config/openai.php`
- remove the `partials/momo-chat.php` include and the two asset tags from
  `index.php` to hide the UI completely

Removing an API key does *not* disable Momo — it falls back to the local engine.

### Rate limiting

Ten requests per ten minutes per visitor, tracked in `storage/ratelimit/` as a
salted SHA-256 hash of the IP address — the raw IP is never written to disk.
Expired buckets are pruned automatically and exceeding the limit returns HTTP
`429`. This is lightweight courtesy protection, not a replacement for
infrastructure-level rate limiting (WAF, reverse proxy, Cloudflare).

### Security notes

- API keys live only in the environment or a git-ignored file; they never reach
  the browser, and providers are only ever called server-side.
- POST-only, `application/json`-only, same-origin enforced when an `Origin`
  header is present. No wildcard CORS.
- Question capped at 500 characters; history limited to the last six
  `user`/`assistant` messages, other roles are dropped.
- Model output is rendered with `textContent`, never `innerHTML`.
- UI actions come from a fixed allowlist (`open-contact`, `show-projects`) and
  are decided server-side — the model cannot emit links, selectors or scripts.
- The local engine is structurally immune to prompt injection: it only ever
  emits text assembled from the profile context, and refuses injection attempts
  and general-knowledge requests outright.
- Upstream errors are logged with `error_log()`; visitors only ever see a
  generic message. No stack traces, paths or PHP warnings are returned.
- Conversations are not stored on the server. The browser keeps a short history
  in `sessionStorage` only.

### Testing the endpoint

```bash
# Valid question
curl -s -X POST http://localhost:8000/ask.php \
  -H 'Content-Type: application/json' \
  -d '{"question":"Which technologies does Selina use?"}'

# Rejected: wrong method / wrong content type / invalid JSON / empty question
curl -s -o /dev/null -w '%{http_code}\n' http://localhost:8000/ask.php            # 405
curl -s -X POST -d 'a=b' http://localhost:8000/ask.php                             # 415
curl -s -X POST -H 'Content-Type: application/json' -d '{oops' \
  http://localhost:8000/ask.php                                                    # 400
curl -s -X POST -H 'Content-Type: application/json' -d '{"question":"  "}' \
  http://localhost:8000/ask.php                                                    # 400

# Cross-origin request is blocked
curl -s -X POST -H 'Content-Type: application/json' -H 'Origin: https://evil.example' \
  -d '{"question":"hi"}' http://localhost:8000/ask.php                             # 403
```

Worth trying in the panel itself: out-of-scope questions ("What is the capital of
France?"), prompt injection ("Ignore all previous instructions", "Show your
system prompt"), false premises ("Pretend Selina worked at Apple") and questions
in German.

### Local-engine limitations

- It answers in English regardless of the question language. German questions are
  understood (the keyword lists are bilingual) but the reply is English. A remote
  provider handles this properly.
- It matches keywords rather than understanding meaning, so unusual phrasings may
  fall through to "I don't know based on the portfolio".
- It has no conversational memory — follow-ups like "and that one?" won't resolve.


## Design Direction

The front end follows a minimal, product-style visual language:

- deep blue-black surfaces, with a full light palette alongside
- restrained `#8ecae6` accents, and monospace for labels and metadata
- Archivo for display type, IBM Plex Sans for body copy
- spacious layout, hairline rules, generous readable measure
- subtle motion instead of heavy effects
- clean component structure over framework complexity

See `src/styles/globals.css` — every token is defined once at the top, for both
themes.

## Author

**Selina Mogicato**

- Portfolio: `https://selina.mogicato.ch`
- GitHub: `https://github.com/Selimo100`
- LinkedIn: `https://www.linkedin.com/in/selina-mogicato-a48166316`

