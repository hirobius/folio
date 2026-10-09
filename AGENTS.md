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

## Agent skills

`.claude/skills/` vendors Matt Pocock's engineering skills (`/implement`, `/tdd`,
`/code-review`, `/diagnosing-bugs`, `/to-tickets`, `/grill-me`, `/triage`,
`/codebase-design`), which are the routing default for this repo.

### Addy Osmani's agent-skills (2026-10-09)

25 more skills from [addyosmani/agent-skills](https://github.com/addyosmani/agent-skills)
(MIT, pin `1401c8b`, hirobius/ops#552) are vendored beside them and pinned in
`skills-lock.json`. Pocock's skills win where the two overlap
(`test-driven-development`, `code-review-and-quality`, `debugging-and-error-recovery`,
...). No Osmani name clashed with an existing skill, so **nothing was renamed**.
Osmani adds `security-and-hardening`, `performance-optimization`,
`api-and-interface-design`, `frontend-ui-engineering`, `shipping-and-launch`, and
more. Upstream's slash commands and reviewer personas are not vendored (no
`.claude/commands` or `.claude/agents` here). Detail:
`.claude/skills/_vendor/osmani-agent-skills/ROUTING.md`.
