#!/usr/bin/env bash
set -euo pipefail
cd "$(dirname "$0")/.."
if [[ ! -s .next/BUILD_ID ]]; then
  printf '[render-start] ERROR: Production build missing (.next/BUILD_ID). Run scripts/render-build.sh during the build step.\n' >&2
  exit 1
fi
printf '[render-start] Starting built app on 0.0.0.0:%s (Node %s)\n' "${PORT:-10000}" "$(node --version)"
# Launch the server directly: startup must never install packages or rebuild.
exec node node_modules/next/dist/bin/next start --hostname 0.0.0.0 --port "${PORT:-10000}"
