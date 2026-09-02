#!/usr/bin/env python3
"""Upload out/ to the Hostfactory web root over FTPS.

Credentials come from .env.deploy (git-ignored, see .env.deploy.example).

Why Python and not curl: the curl that ships with macOS is built against
SecureTransport, whose TLS data-channel handling this server rejects with
"426 Transfer aborted" for files roughly between 16 KB and 128 KB. Python's
ftplib uses OpenSSL and has no such trouble, and it holds one connection open
for the whole run instead of reconnecting per file.

    python3 scripts/deploy-ftp.py --dry-run   # list what would be uploaded
    python3 scripts/deploy-ftp.py             # upload changed files
    python3 scripts/deploy-ftp.py --all       # ignore the manifest
    python3 scripts/deploy-ftp.py --verify    # size-check every file, upload again if wrong

Every run ends with a size check of what it just uploaded, because a broken FTP
client can report success and leave a 0-byte file behind — which is exactly how
36 pages of this site once ended up empty.
"""
from __future__ import annotations

import hashlib
import json
import os
import re
import ssl
import sys
import time
from ftplib import FTP_TLS, all_errors, error_perm
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent
OUT = ROOT / "out"
MANIFEST = ROOT / ".deploy-manifest.json"
ATTEMPTS = 3

# Never uploaded: the server owns its credentials and runtime state, and
# "-fno-reply@..." is a local accident (a stray sendmail argument that became a
# file), not something the web root should ever see.
SKIP = [
    re.compile(r"^storage/"),
    re.compile(r"^config/(openai|spotify)\.php$"),
    re.compile(r"^-fno-reply@"),
    re.compile(r"(^|/)\.DS_Store$"),
]


def load_env() -> dict[str, str]:
    path = ROOT / ".env.deploy"
    if not path.exists():
        sys.exit("Missing .env.deploy — copy .env.deploy.example and fill it in.")

    env: dict[str, str] = {}
    for line in path.read_text().splitlines():
        if not line.strip() or line.lstrip().startswith("#") or "=" not in line:
            continue
        key, value = line.split("=", 1)
        env[key.strip()] = value.strip().strip("\"'")

    for key in ("FTP_HOST", "FTP_USER", "FTP_PASSWORD"):
        if not env.get(key):
            sys.exit(f"Missing {key} in .env.deploy")

    env["FTP_REMOTE_DIR"] = "/" + env.get("FTP_REMOTE_DIR", "").strip("/")
    return env


def ssl_context(env: dict[str, str]) -> ssl.SSLContext:
    if env.get("FTP_TLS") == "insecure":
        ctx = ssl.create_default_context()
        ctx.check_hostname = False
        ctx.verify_mode = ssl.CERT_NONE
        return ctx
    try:
        import certifi  # type: ignore

        return ssl.create_default_context(cafile=certifi.where())
    except ImportError:
        # The python.org build ships no CA store; macOS keeps one here.
        system = "/etc/ssl/cert.pem"
        return ssl.create_default_context(cafile=system if os.path.exists(system) else None)


def local_files() -> list[str]:
    files = []
    for path in sorted(OUT.rglob("*")):
        if not path.is_file():
            continue
        rel = path.relative_to(OUT).as_posix()
        if any(pattern.search(rel) for pattern in SKIP):
            continue
        files.append(rel)
    return files


def connect(env: dict[str, str]) -> FTP_TLS:
    ftp = FTP_TLS(context=ssl_context(env))
    ftp.connect(env["FTP_HOST"], 21, timeout=60)
    ftp.login(env["FTP_USER"], env["FTP_PASSWORD"])
    ftp.prot_p()  # Encrypt the data channel, not just the login.
    ftp.cwd(env["FTP_REMOTE_DIR"])
    return ftp


def ensure_dir(ftp: FTP_TLS, remote_dir: str, known: set[str]) -> None:
    """mkdir -p, remembering what already exists so each dir is tried once."""
    if not remote_dir or remote_dir in known:
        return
    parts = remote_dir.split("/")
    for i in range(1, len(parts) + 1):
        path = "/".join(parts[:i])
        if path in known:
            continue
        try:
            ftp.mkd(path)
        except error_perm:
            pass  # Already there, which is the common case.
        known.add(path)


def verify(ftp: FTP_TLS, rels: list[str]) -> list[str]:
    """Return the files whose size on the server does not match the local one."""
    ftp.voidcmd("TYPE I")
    bad = []
    for rel in rels:
        local = (OUT / rel).stat().st_size
        try:
            if ftp.size(rel) != local:
                bad.append(rel)
        except all_errors:
            bad.append(rel)
    return bad


def store(ftp: FTP_TLS, rel: str, known: set[str]) -> None:
    ensure_dir(ftp, os.path.dirname(rel), known)
    with (OUT / rel).open("rb") as handle:
        ftp.storbinary(f"STOR {rel}", handle)


def main() -> int:
    args = set(sys.argv[1:])
    dry_run = "--dry-run" in args
    upload_all = "--all" in args
    verify_only = "--verify" in args

    if not OUT.exists():
        sys.exit("out/ is missing — run `npm run build` first.")

    env = load_env()
    files = local_files()
    previous = json.loads(MANIFEST.read_text()) if MANIFEST.exists() else {}

    current: dict[str, str] = {}
    queue: list[str] = []
    for rel in files:
        digest = hashlib.sha1((OUT / rel).read_bytes()).hexdigest()
        current[rel] = digest
        if upload_all or previous.get(rel) != digest:
            queue.append(rel)

    target = f"ftps://{env['FTP_HOST']}{env['FTP_REMOTE_DIR']}/"
    print(f"{len(files)} files in out/ · {len(queue)} to upload · target {target}")

    gone = [rel for rel in previous if rel not in current]
    if gone:
        print(
            f"\n{len(gone)} file(s) are gone locally but still on the server. This script never "
            f"deletes; remove them by hand if they matter:\n  " + "\n  ".join(gone)
        )

    if dry_run:
        for rel in queue:
            print(f"  would upload  {rel}")
        print("\nDry run — nothing was uploaded.")
        return 0

    if verify_only:
        try:
            ftp = connect(env)
        except all_errors as error:
            sys.exit(f"Could not connect: {error}")
        print("Checking every file against the server…")
        bad = verify(ftp, files)
        if not bad:
            print(f"All {len(files)} files match.")
            ftp.quit()
            return 0
        print(f"{len(bad)} file(s) wrong on the server — re-uploading:")
        known: set[str] = set()
        for rel in bad:
            try:
                store(ftp, rel, known)
                print(f"  fixed  {rel}")
            except all_errors as error:
                print(f"  FAILED {rel}: {error}")
                current.pop(rel, None)
        still_bad = verify(ftp, bad)
        ftp.quit()
        MANIFEST.write_text(json.dumps(current, indent=2))
        print("\nAll fixed." if not still_bad else f"\nStill wrong: {still_bad}")
        return 1 if still_bad else 0

    if not queue:
        print("Nothing changed since the last deploy.")
        return 0

    try:
        ftp = connect(env)
    except all_errors as error:
        sys.exit(f"Could not connect: {error}")

    known_dirs: set[str] = set()
    done = 0
    failures: list[str] = []

    for rel in queue:
        for attempt in range(1, ATTEMPTS + 1):
            try:
                remote_dir = os.path.dirname(rel)
                ensure_dir(ftp, remote_dir, known_dirs)
                with (OUT / rel).open("rb") as handle:
                    ftp.storbinary(f"STOR {rel}", handle)
                done += 1
                print(f"\r  uploaded {done}/{len(queue)}  {rel[:44]:<46}", end="", flush=True)
                break
            except all_errors as error:
                if attempt == ATTEMPTS:
                    failures.append(rel)
                    current.pop(rel, None)  # Never claim a file that did not land.
                    print(f"\n  FAILED  {rel}\n    {error}")
                else:
                    time.sleep(1.5 * attempt)
                    try:  # The connection is often what broke; rebuild it.
                        ftp.quit()
                    except all_errors:
                        pass
                    try:
                        ftp = connect(env)
                        known_dirs.clear()
                    except all_errors as reconnect_error:
                        sys.exit(f"\nLost the connection and could not reopen it: {reconnect_error}")

    # A file can be accepted and still land empty, so check before believing it.
    uploaded = [rel for rel in queue if rel not in failures]
    bad = verify(ftp, uploaded)
    if bad:
        print(f"\n  {len(bad)} file(s) wrong on the server after upload — retrying:")
        known: set[str] = set()
        for rel in bad:
            try:
                store(ftp, rel, known)
                print(f"    fixed  {rel}")
            except all_errors as error:
                print(f"    FAILED {rel}: {error}")
        for rel in verify(ftp, bad):
            failures.append(rel)
            current.pop(rel, None)

    try:
        ftp.quit()
    except all_errors:
        pass

    MANIFEST.write_text(json.dumps(current, indent=2))
    print(f"\n\nUploaded {done} file(s)" + (f", {len(failures)} FAILED" if failures else "."))
    return 1 if failures else 0


if __name__ == "__main__":
    sys.exit(main())
