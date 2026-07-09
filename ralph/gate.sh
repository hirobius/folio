#!/usr/bin/env bash
# Feedback gate Ralph must pass before opening a PR. Red = no PR.
set -euo pipefail
cd "$(dirname "$0")/.."

# This repo: npm scripts, no test suite. Production site, so include the build.
GATE="npm run typecheck && npm run lint && npm run build"

eval "$GATE"
