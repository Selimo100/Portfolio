# Development

## Prerequisites

| Tool | Version | Needed for |
| --- | --- | --- |
| Node.js | 20 or newer (CI uses 22) | the site, the build |
| npm | ships with Node | dependencies, scripts |
| PHP | 8.1 or newer, with `json` and `mbstring` (`curl` only for a remote Momo provider) | the three endpoints |
| Python | 3.9 or newer (macOS ships one) | the FTP deploy scripts |

## Running the site

The site needs two processes: Next for the pages, PHP for the endpoints. From
the project root, in two terminals:

```bash
npm install    # once
npm run php    # terminal 1 — PHP endpoints on :8001, mail captured to a file
npm run dev    # terminal 2 — the site on :3000
```

Open <http://localhost:3000>. `/` redirects to the best matching locale; the
real pages are `/en/`, `/de/` and `/it/`.

In development, `/ask.php`, `/sendMail.php` and `/spotify-top.php` are proxied
to the PHP server through the dev-only `rewrites` in
[`next.config.ts`](../next.config.ts), so Momo, the contact form and the Spotify
card behave exactly as they do in production. Point them elsewhere with
`PHP_DEV_ORIGIN` if port 8001 is taken.

`npm run dev` on its own is fine for styling and layout work — those three
features simply 404 until the PHP server is running too.

## Scripts

| Script | What it does |
| --- | --- |
| `npm run dev` | Next dev server on :3000 |
| `npm run php` | PHP endpoints on :8001, with mail redirected to a log file |
| `npm run lint` | ESLint over the Next app |
| `npm run typecheck` | `tsc --noEmit` |
| `npm run build` | `next build`, then copies the PHP files into `out/` |
| `npm run preview` | serves the built `out/` with PHP on :8000 |
| `npm run deploy*` | see [deployment.md](deployment.md) |

## Building

```bash
npm run build
```

This runs `next build` and then
[`scripts/copy-server-files.mjs`](../scripts/copy-server-files.mjs), which
copies the PHP endpoints, their support files and the deploy `.htaccess` into
`out/`. The contents of `out/` are what gets uploaded.

To check the real bundle before uploading — static pages and PHP together, the
way the server will run it:

```bash
npm run build
npm run preview        # http://localhost:8000
```

`out/` contains no credentials by design, so the Spotify card there shows the
build-time snapshot rather than live tracks. `npm run dev` reads the real
`server/config/`, so it shows live data.

## Where things live

Content lives in exactly one place:
[`src/lib/content.ts`](../src/lib/content.ts). Adding a project or fixing
wording means editing that file, **in all three languages**. Styling lives in
[`src/styles/globals.css`](../src/styles/globals.css), with every design token
defined once at the top for both themes.

## Contact form mail

**Mail cannot be delivered from a development machine.** Gmail, Outlook and the
rest refuse mail sent straight from a residential IP:

```text
550-5.7.1 The IP you're using to send mail is not authorized to send
email directly to our servers. Please use the SMTP relay at your
service provider instead.
```

`mail()` still returns true in that case — it only reports that the local mail
transfer agent accepted the message, which happens long before the rejection. So
the form says "sent", nothing arrives, and the bounce lands in your local mailbox
(`/var/mail/$USER` on macOS) rather than in the browser.

To avoid that trap, `npm run php` points PHP's `sendmail_path` at
[`scripts/dev-mail.sh`](../scripts/dev-mail.sh), which appends every outgoing
message to `server/storage/maillog` instead of trying to send it:

```bash
npm run php
# submit the form, then:
cat server/storage/maillog
```

The log is git-ignored and shows the full message with its headers, which is what
you want when checking wording or debugging the endpoint.

### On the server

Real delivery only happens on the host, and two things decide whether it lands:

- **The envelope sender.** `sendMail.php` passes `-f no-reply@mogicato.ch` as
  `mail()`'s fifth argument. That is the address receiving mail servers check SPF
  against — not the `From:` header. Without it the host's default
  (`www-data@somehost`) is used, and Gmail is likely to reject or spam-folder the
  message.
- **SPF for the sending domain** must authorise the Hostfactory mail servers. If
  DNS is hosted elsewhere, add their SPF include, or change `CONTACT_SENDER` to
  an address on a domain that already authorises them.

The visitor's address goes in `Reply-To:` only, never in `From:` — putting an
arbitrary address in `From:` is what burns a domain's reputation.

After deploying, send one test message and confirm it arrives. `mail()`
returning true proves nothing.
