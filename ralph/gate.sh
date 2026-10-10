#!/usr/bin/env bash
# Feedback gate Ralph must pass before opening a PR. Red = no PR.
set -euo pipefail
cd "$(dirname "$0")/.."

# This repo: npm scripts, node:test suite in tests/. Production site, so include the build.
# The lint step also runs the anti-slop ratchet (scripts/check-anti-slop.mjs).
GATE="npm run typecheck && npm run lint && npm test && npm run build"

eval "$GATE"
