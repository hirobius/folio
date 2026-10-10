# anti-slop provenance

- Source: https://github.com/dmmulroy/anti-slop (MIT, see `LICENSE` beside this file)
- Version: 0.1.2
- Commit: c44ef22ca116d0ba62a3ff663a0bd13a3f3fa40b
- Vendored: 2026-10-08, via the upstream `install-anti-slop` skill (`scripts/install.mjs`)
- Installed paths: `tools/oxlint/anti-slop/` (generic plugin `index.ts`, opt-in `effect/` plugin, `vendor/eslint-stylistic/`)
- Deviations from upstream: none in the vendored files. Local policy lives outside this directory: `oxlint.config.ts` enables the generic rules at `warn`, and `scripts/check-anti-slop.mjs` ratchets the counts against `tools/oxlint/anti-slop-baseline.json`.
- The Effect plugin is not registered, because this repo does not depend on `effect`.
- Oxlint and `@oxlint/plugins` are pinned together at 1.87.0.
