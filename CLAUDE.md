# CLAUDE.md

See `AGENTS.md` for this repo's deploy target and quality bar, and `CONTEXT.md` for the project.

## Fleet hub

This repo is part of the Hirobius fleet. The operations hub is the
hirobius/ops repo: fleet state at /api/projects, consolidated tasks at
/ops/tasks (this repo's GitHub Issues sync there), current cross-project
state in docs/ai/HANDOFF.md (in ops). Conventions for every session here:
(a) track new work as GitHub Issues in THIS repo — never a local TODO
file; (b) before ending any session that changed project state, update
root status.json (updatedAt, phase, headline, next, blocked) — the ops
dashboard renders it; (c) read the ops HANDOFF before cross-project
decisions; (d) Adrian often dictates — read past voice-transcription
errors and act on evident intent; (e) every status, plan, audit or report
page you publish (Artifact or HTML) is registered in the ops library that
session: an entry in hirobius/ops docs/ai/library.json (`render: "artifact"`
until rebuilt on HDS), or, if this session cannot write to ops, an ops
issue with its title, date, link and one-line summary.
