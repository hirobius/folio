# AGENTS

Guidance for AI agents working in this repository.

## Deploy

Vercel is the sole deploy target. The production URL comes from
`VERCEL_PROJECT_PRODUCTION_URL`. There is no Netlify or other host — do not
add `netlify.toml`, `_redirects`, `_headers`, or otherwise assume a second
deploy pipeline.

## Ralph quality bar

REPO_TYPE: production
QUALITY BAR: Personal production site. Clean, tested, no dead code.

Rules for any autonomous loop in this repo:
- One issue per PR. Small steps. Never push to main.
- The gate (ralph/gate.sh) must pass before any PR. No exceptions.
- Fight entropy: leave the code better than you found it.
- No shortcut that creates debt someone else pays for.
