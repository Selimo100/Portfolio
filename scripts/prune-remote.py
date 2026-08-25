#!/usr/bin/env python3
"""Remove files from the web root that are no longer part of the site.

`deploy-ftp.py` never deletes, so old files accumulate — this is the other
half. It compares the server against `.deploy-manifest.json`, downloads
anything that is not part of the current site into `.server-backup/`, and only
then deletes it. Empty directories are removed afterwards, deepest first.

Protected trees are never touched: the server's own credentials and runtime
state, and the standalone sites parked in the web root.

    python3 scripts/prune-remote.py --dry-run   # show what would go
    python3 scripts/prune-remote.py             # back up, then delete
"""
from __future__ import annotations

import json
import ssl
import sys
from datetime import date
from pathlib import Path
from ftplib import FTP_TLS, all_errors

ROOT = Path(__file__).resolve().parent.parent
MANIFEST = ROOT / ".deploy-manifest.json"
BACKUP = ROOT / ".server-backup" / date.today().isoformat()

# Top-level names the prune must never walk into.
#   config/ storage/  — credentials and runtime state, owned by the server
#   Berufswahl/ GossipGirl/ — separate little sites, reachable at /<name>/
PROTECTED = {"config", "storage", "Berufswahl", "GossipGirl"}


def load_env() -> dict[str, str]:
    path = ROOT / ".env.deploy"
    if not path.exists():
        sys.exit("Missing .env.deploy")
    env = {}
    for line in path.read_text().splitlines():
        if line.strip() and not line.lstrip().startswith("#") and "=" in line:
            key, value = line.split("=", 1)
            env[key.strip()] = value.strip().strip("\"'")
    env["FTP_REMOTE_DIR"] = "/" + env.get("FTP_REMOTE_DIR", "").strip("/")
    return env


def connect(env: dict[str, str]) -> FTP_TLS:
    ctx = ssl.create_default_context(cafile="/etc/ssl/cert.pem")
    ftp = FTP_TLS(context=ctx)
    ftp.connect(env["FTP_HOST"], 21, timeout=60)
    ftp.login(env["FTP_USER"], env["FTP_PASSWORD"])
    ftp.prot_p()
    ftp.cwd(env["FTP_REMOTE_DIR"])
    return ftp


def walk(ftp: FTP_TLS, path: str = "") -> tuple[list[str], list[str]]:
    """Every file and directory below `path`, skipping protected trees."""
    files: list[str] = []
    dirs: list[str] = []
    try:
        entries = list(ftp.mlsd(path or "."))
    except all_errors as error:
        print(f"  cannot list {path or '/'}: {error}")
        return files, dirs

    for name, facts in entries:
        if name in (".", ".."):
            continue
        rel = f"{path}/{name}" if path else name
        if rel.split("/")[0] in PROTECTED:
            continue
        if facts.get("type") == "dir":
            dirs.append(rel)
            sub_files, sub_dirs = walk(ftp, rel)
            files += sub_files
            dirs += sub_dirs
        elif facts.get("type") == "file":
            files.append(rel)
    return files, dirs


def main() -> int:
    dry_run = "--dry-run" in sys.argv[1:]
    if not MANIFEST.exists():
        sys.exit("No .deploy-manifest.json — run a deploy first, or the prune has nothing to compare against.")

    env = load_env()
    keep = set(json.load(MANIFEST.open()))
    ftp = connect(env)

    print(f"Scanning ftps://{env['FTP_HOST']}{env['FTP_REMOTE_DIR']}/ …")
    files, dirs = walk(ftp)
    stale = sorted(f for f in files if f not in keep)

    print(f"{len(files)} file(s) outside protected trees · {len(stale)} not part of the site")
    for rel in stale:
        print(f"  stale  {rel}")

    # A directory is only removed once everything in it is gone.
    remaining = {f for f in files if f not in stale}
    empty = sorted(
        (d for d in dirs if not any(f == d or f.startswith(d + "/") for f in remaining)),
        key=lambda d: d.count("/"),
        reverse=True,
    )
    for rel in empty:
        print(f"  empty dir  {rel}/")

    if dry_run:
        print("\nDry run — nothing was changed.")
        ftp.quit()
        return 0
    if not stale and not empty:
        print("\nAlready clean.")
        ftp.quit()
        return 0

    print(f"\nBacking up {len(stale)} file(s) to {BACKUP.relative_to(ROOT)}/ …")
    for rel in stale:
        local = BACKUP / rel
        local.parent.mkdir(parents=True, exist_ok=True)
        try:
            with local.open("wb") as handle:
                ftp.retrbinary(f"RETR {rel}", handle.write)
        except all_errors as error:
            # Never delete something that could not be saved first.
            print(f"  could not download {rel}: {error} — leaving it in place")
            stale.remove(rel)

    deleted = 0
    for rel in stale:
        try:
            ftp.delete(rel)
            deleted += 1
        except all_errors as error:
            print(f"  FAILED to delete {rel}: {error}")

    pruned_dirs = 0
    for rel in empty:
        try:
            ftp.rmd(rel)
            pruned_dirs += 1
        except all_errors as error:
            print(f"  kept {rel}/: {error}")

    ftp.quit()
    print(f"\nDeleted {deleted} file(s) and {pruned_dirs} empty director(y/ies).")
    print(f"Backup: {BACKUP}")
    return 0


if __name__ == "__main__":
    sys.exit(main())
