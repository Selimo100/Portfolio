#!/bin/sh
# Local stand-in for sendmail.
#
# Mail cannot actually be delivered from a laptop — Gmail and the other big
# providers refuse mail sent directly from residential IPs. So during
# development PHP hands messages to this script, which appends them to
# server/storage/maillog for inspection instead of dropping them silently.
set -e
dir=$(CDPATH= cd -- "$(dirname -- "$0")/.." && pwd)
log="$dir/server/storage/maillog"
{
  echo "===== $(date '+%Y-%m-%d %H:%M:%S') ====="
  cat
  echo
} >> "$log"
