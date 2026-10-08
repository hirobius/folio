#!/usr/bin/env node
// Warn-first ratchet for the vendored anti-slop Oxlint rules.
// Runs oxlint, counts warnings per rule and per file, and compares them with the
// committed baseline. A count going UP anywhere fails; going down passes with a hint.
//
//   node scripts/check-anti-slop.mjs            check against the baseline
//   node scripts/check-anti-slop.mjs --update   rewrite the baseline (sorted keys)
//
// Options (used by the tests, defaults suit this repo):
//   --config <file>    oxlint config      (default .oxlintrc.json)
//   --baseline <file>  baseline file      (default tools/oxlint/anti-slop-baseline.json)
//   --cwd <dir>        working directory  (default current directory)
//   <paths...>         paths to lint      (default app components lib scripts)
import { spawnSync } from "node:child_process";
import { existsSync, mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const DEFAULT_PATHS = ["app", "components", "lib", "scripts"];

function sortObject(value) {
  if (!(value instanceof Object)) return value;

  return Object.fromEntries(
    Object.keys(value)
      .sort()
      .map((key) => [key, sortObject(value[key])]),
  );
}

/** Count diagnostics as { rule: { file: count } }, keys sorted. */
export function countDiagnostics(diagnostics) {
  const counts = {};

  for (const d of diagnostics) {
    const rule = d.code;
    const file = String(d.filename).replaceAll("\\", "/");
    counts[rule] ??= {};
    counts[rule][file] = (counts[rule][file] ?? 0) + 1;
  }

  return sortObject(counts);
}

/** Compare current counts with the baseline. */
export function compareCounts(baseline, current) {
  const regressions = [];
  let improved = 0;
  const rules = new Set([...Object.keys(baseline), ...Object.keys(current)]);

  for (const rule of [...rules].sort()) {
    const files = new Set([...Object.keys(baseline[rule] ?? {}), ...Object.keys(current[rule] ?? {})]);

    for (const file of [...files].sort()) {
      const before = baseline[rule]?.[file] ?? 0;
      const after = current[rule]?.[file] ?? 0;

      if (after > before) regressions.push({ rule, file, before, after });
      else if (after < before) improved += before - after;
    }
  }

  return { regressions, improved };
}

function parseArgs(argv) {
  const opts = {
    update: false,
    config: ".oxlintrc.json",
    baseline: "tools/oxlint/anti-slop-baseline.json",
    cwd: process.cwd(),
    paths: [],
  };

  for (let i = 0; i < argv.length; i++) {
    const arg = argv[i];

    if (arg === "--update") opts.update = true;
    else if (arg === "--config") opts.config = argv[++i];
    else if (arg === "--baseline") opts.baseline = argv[++i];
    else if (arg === "--cwd") opts.cwd = resolve(argv[++i]);
    else opts.paths.push(arg);
  }

  if (opts.paths.length === 0) opts.paths = DEFAULT_PATHS;

  return opts;
}

function resolveOxlintBin(cwd) {
  // Prefer the target repo's install, then this script's repo.
  const here = dirname(fileURLToPath(import.meta.url));

  for (const base of [cwd, resolve(here, "..")]) {
    const bin = resolve(base, "node_modules/oxlint/bin/oxlint");

    if (existsSync(bin)) return bin;
  }

  throw new Error("oxlint is not installed. Run `npm ci` first.");
}

function runOxlint(opts) {
  const paths = opts.paths.filter((p) => existsSync(resolve(opts.cwd, p)));

  const result = spawnSync(
    process.execPath,
    [resolveOxlintBin(opts.cwd), "-c", opts.config, "--format", "json", ...paths],
    { cwd: opts.cwd, encoding: "utf8", maxBuffer: 256 * 1024 * 1024 },
  );

  let parsed;

  try {
    parsed = JSON.parse(result.stdout);
  } catch {
    throw new Error(`oxlint produced no JSON output (exit ${result.status}).\n${result.stderr}`);
  }

  return parsed.diagnostics ?? [];
}

function main() {
  const opts = parseArgs(process.argv.slice(2));
  const current = countDiagnostics(runOxlint(opts));
  const baselinePath = resolve(opts.cwd, opts.baseline);

  if (opts.update) {
    mkdirSync(dirname(baselinePath), { recursive: true });
    writeFileSync(baselinePath, `${JSON.stringify(current, null, 2)}\n`);
    const total = Object.values(current).reduce((n, files) => n + Object.values(files).reduce((a, b) => a + b, 0), 0);
    console.log(`anti-slop: baseline updated (${total} warnings) -> ${opts.baseline}`);

    return 0;
  }

  const baseline = existsSync(baselinePath) ? JSON.parse(readFileSync(baselinePath, "utf8")) : {};
  const { regressions, improved } = compareCounts(baseline, current);

  if (regressions.length > 0) {
    console.error("anti-slop: new warnings above the baseline:");

    for (const r of regressions) {
      console.error(`  ${r.file}  ${r.rule}  ${r.before} -> ${r.after}`);
    }

    console.error(
      "Fix the code (run `npm run lint:slop` to see each hit). Only with a stated reason, accept the new count with `node scripts/check-anti-slop.mjs --update`.",
    );

    return 1;
  }

  console.log("anti-slop: no new warnings above the baseline.");

  if (improved > 0) {
    console.log(`anti-slop: ${improved} fewer than baseline, run \`node scripts/check-anti-slop.mjs --update\` to lock in.`);
  }

  return 0;
}

if (process.argv[1] && resolve(process.argv[1]) === fileURLToPath(import.meta.url)) {
  try {
    process.exitCode = main();
  } catch (error) {
    console.error(`anti-slop: ${error.message}`);
    process.exitCode = 2;
  }
}
