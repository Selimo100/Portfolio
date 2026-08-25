# Momo — the portfolio assistant

Momo is a small AI guide in the bottom-right corner of the portfolio. It answers
questions about Selina's projects, skills, apprenticeship and interests, and
refuses everything else.

**Momo works out of the box with no API key and no cost.** By default it answers
from a local PHP engine that matches questions against the profile context. Add
a free or paid API key and it uses a real language model instead, falling back
to the local engine whenever that provider is unavailable.

## Architecture

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
| [`src/components/Momo.tsx`](../src/components/Momo.tsx) | Chat panel: prompts, message rendering, history |
| `server/config/openai.example.php` | Example configuration (no secrets) |

**Request flow:** the visitor submits a question → `Momo.tsx` POSTs
`{question, history}` as JSON → `server/ask.php` checks method, origin, content type,
question length and history shape → applies the rate limit → loads the profile
context → asks the configured provider, or the local engine → picks an optional
UI action from a fixed allowlist → returns `{success, answer, action}`.

## Providers

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

## Requirements

- PHP 8.1 or newer
- Extensions: `json`, `mbstring` (plus `curl` only if you use a remote provider)
- A writable `server/storage/` directory (rate-limit buckets and the hashing salt)

## Environment variables

| Variable | Required | Default | Purpose |
| --- | --- | --- | --- |
| `MOMO_PROVIDER` | no | auto-detect | Pin a provider |
| `GEMINI_API_KEY` / `GROQ_API_KEY` / `OPENAI_API_KEY` | no | – | Enables that provider |
| `MOMO_MODEL` | no | per provider | Model override |
| `MOMO_RATE_LIMIT_SALT` | no | auto-generated | Salt for hashed visitor identifiers |

Environment variables always take precedence over `config/openai.php`.

## Local setup

```bash
npm run php                           # works immediately, local engine

export GEMINI_API_KEY="..."           # optional: free AI provider
npm run php
```

`npm run php` serves `server/` on :8001 and is what `next dev` proxies
`/ask.php` to (see [development.md](development.md)).

`config/openai.php`, `storage/ratelimit/` and `storage/rate-limit-salt` are
git-ignored. **Never commit an API key.**

## Production setup

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

## Teaching Momo new things

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
Project entries come from `server/data/projects.php`, the server-side mirror of
the project list in `src/lib/content.ts`, so Momo can talk about a project
without the front end shipping its data twice.

Only add publicly shareable information.

When adding a new topic that the **local** engine should recognise, add an
intent to `momo_local_intents()` in `server/lib/momo-local.php` and a matching branch in
`momo_local_render()`. Remote providers pick new context up automatically.

## Disabling the chatbot

Any one of:

- set `'enabled' => false` in `config/openai.php`
- remove the `<Momo />` element from
  [`src/app/[lang]/layout.tsx`](../src/app/%5Blang%5D/layout.tsx) to hide the UI
  completely

Removing an API key does *not* disable Momo — it falls back to the local engine.

## Rate limiting

Ten requests per ten minutes per visitor, tracked in `storage/ratelimit/` as a
salted SHA-256 hash of the IP address — the raw IP is never written to disk.
Expired buckets are pruned automatically and exceeding the limit returns HTTP
`429`. This is lightweight courtesy protection, not a replacement for
infrastructure-level rate limiting (WAF, reverse proxy, Cloudflare).

## Security notes

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

## Testing the endpoint

```bash
# Valid question
curl -s -X POST http://localhost:8001/ask.php \
  -H 'Content-Type: application/json' \
  -d '{"question":"Which technologies does Selina use?"}'

# Rejected: wrong method / wrong content type / invalid JSON / empty question
curl -s -o /dev/null -w '%{http_code}\n' http://localhost:8001/ask.php            # 405
curl -s -X POST -d 'a=b' http://localhost:8001/ask.php                             # 415
curl -s -X POST -H 'Content-Type: application/json' -d '{oops' \
  http://localhost:8001/ask.php                                                    # 400
curl -s -X POST -H 'Content-Type: application/json' -d '{"question":"  "}' \
  http://localhost:8001/ask.php                                                    # 400

# Cross-origin request is blocked
curl -s -X POST -H 'Content-Type: application/json' -H 'Origin: https://evil.example' \
  -d '{"question":"hi"}' http://localhost:8001/ask.php                             # 403
```

Worth trying in the panel itself: out-of-scope questions ("What is the capital of
France?"), prompt injection ("Ignore all previous instructions", "Show your
system prompt"), false premises ("Pretend Selina worked at Apple") and questions
in German.

## Local-engine limitations

- It answers in English regardless of the question language. German questions are
  understood (the keyword lists are bilingual) but the reply is English. A remote
  provider handles this properly.
- It matches keywords rather than understanding meaning, so unusual phrasings may
  fall through to "I don't know based on the portfolio".
- It has no conversational memory — follow-ups like "and that one?" won't resolve.
