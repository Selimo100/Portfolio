# Deploying the portfolio

The site is a static export plus a few PHP endpoints, uploaded over FTPS to
`server11.hostfactory.ch:/httpdocs`.

## One-time setup

```bash
cp .env.deploy.example .env.deploy   # then paste the FTP password
```

`.env.deploy` is git-ignored — never commit it. The values are already correct:

| Key | Value | Why |
| --- | --- | --- |
| `FTP_HOST` | `server11.hostfactory.ch` | **not** `mogicato.ch` — the server's certificate covers `*.hostfactory.ch`, so the domain name fails TLS verification |
| `FTP_REMOTE_DIR` | `/httpdocs` | the web root |
| `FTP_TLS` | `true` | require FTPS and verify the certificate |

Needs `python3` (macOS ships one) and Node for the build.

## Every deploy

```bash
npm run build          # next build + copies the PHP files into out/
npm run deploy:dry     # what would be uploaded, and to where — read this line
npm run deploy         # upload, then size-check what was sent
```

Only changed files are uploaded; hashes are tracked in `.deploy-manifest.json`.
Use `npm run deploy -- --all` to ignore it and re-upload everything.

Then check by hand:

1. `/`, `/en/`, `/de/`, `/it/` load
2. the page you actually changed
3. **the contact form** — send a real message and confirm it *arrives*.
   `mail()` returning true proves nothing.

## The other two commands

```bash
npm run deploy:verify              # compare all files against the server, fix mismatches
npm run deploy:prune -- --dry-run  # list files on the server the site no longer has
npm run deploy:prune               # back them up to .server-backup/, then delete
```

Run `deploy:verify` if a page ever loads **blank** — that means a 0-byte file on
the server, and this repairs it.

`deploy:prune` protects four top-level names: `config/`, `storage/` (server
credentials and runtime state) and `Berufswahl/`, `GossipGirl/` (parked sites at
`/Berufswahl/` and `/GossipGirl/`). Anything else you upload by hand counts as
stale — add it to `PROTECTED` in `scripts/prune-remote.py` first.

## Never overwrite on the server

- `config/openai.php`, `config/spotify.php` — real API credentials
- `storage/` — rate-limit salt and the Spotify cache

The build ships `config/*.example.php` and skips `storage/` entirely, so a
normal deploy cannot clobber either.

## If it breaks

| Symptom | Cause |
| --- | --- |
| `curl: (60) certificate ... does not match` | `FTP_HOST` is set to `mogicato.ch`. Use `server11.hostfactory.ch`. |
| `426 Transfer aborted` | You are on the old curl-based uploader. The current one is `scripts/deploy-ftp.py`; macOS curl cannot upload 16–128 KB files to this server. |
| A page is blank | 0-byte file on the server → `npm run deploy:verify` |
| `Login rejected` | wrong `FTP_USER` / `FTP_PASSWORD` in `.env.deploy` |
| Old page still showing | browser cache — HTML is sent with `max-age=0`, but hard-reload to be sure |

Deleted something by accident? `deploy:prune` keeps a copy in
`.server-backup/<date>/`, and everything else can be rebuilt with
`npm run build && npm run deploy -- --all`.

## Why Python, and why the size check

The uploader is [`scripts/deploy-ftp.py`](../scripts/deploy-ftp.py) rather than a
Node script because the `curl` that ships with macOS is built against
SecureTransport. This server rejects its TLS data channel with `426 Transfer
aborted` for files roughly between 16 KB and 128 KB — reproducibly, by size,
regardless of passive mode, EPSV or rate limit. Python's `ftplib` uses OpenSSL
and uploads the same files without complaint, over a single connection held open
for the whole run.

Worse than failing, that `curl` also reported success for some of those files
while leaving **0 bytes** on the server. That is why every run finishes by
comparing the size of each uploaded file against the local one and re-uploading
any that do not match, and why `npm run deploy:verify` exists as a full-site
version of the same check.

## First deploy to an empty web root

The uploader skips `storage/` by design, so create it by hand once: `storage/`
and `storage/ratelimit/`, mode 755 and writable by PHP, with
[`server/storage/.htaccess`](../server/storage/.htaccess) uploaded into it.

The deploy script also never deletes. If a file disappears locally it says so
and leaves the server copy alone — removal is `npm run deploy:prune`.
