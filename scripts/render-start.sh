#!/usr/bin/env bash
set -euo pipefail
cd "$(dirname "$0")/.."
exec npm start -- --hostname 0.0.0.0 --port "${PORT:-10000}"
