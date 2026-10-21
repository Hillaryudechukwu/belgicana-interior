#!/usr/bin/env bash
set -euo pipefail
cd "$(dirname "$0")/.."
npm ci --include=dev
# Render's build machine has a separate memory allowance from the Free runtime.
# Scope the larger heap to compilation; do not apply it to the 512 MB web service.
NODE_OPTIONS="${NODE_OPTIONS:-} --max-old-space-size=${RENDER_BUILD_HEAP_MB:-4096}" npm run build
