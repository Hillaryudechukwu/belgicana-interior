#!/usr/bin/env bash
# Generate Render's Blueprint setup link for a pushed repository.
set -euo pipefail
cd "$(dirname "$0")/.."
repo="${1:-}"
if [[ -z "$repo" ]]; then
  printf 'Usage: bash scripts/deploy-render.sh https://github.com/OWNER/REPO\n' >&2
  exit 1
fi
case "$repo" in
  https://github.com/*/*|https://gitlab.com/*/*|https://bitbucket.org/*/*) ;;
  *) printf 'Provide an HTTPS GitHub, GitLab, or Bitbucket repository URL.\n' >&2; exit 1 ;;
esac
command -v node >/dev/null 2>&1 || { printf 'Node.js is required to generate the deployment link.\n' >&2; exit 1; }
encoded="$(node -e 'process.stdout.write(encodeURIComponent(process.argv[1]))' "$repo")"
printf 'Push render.yaml and scripts/ to your repository default branch first.\n'
printf 'Open this link, connect your repository, review the Free service, and deploy:\nhttps://render.com/deploy?repo=%s\n' "$encoded"
printf 'No service has been created by this script. Render completes deployment after dashboard setup.\n'
