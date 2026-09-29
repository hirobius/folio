#!/usr/bin/env node
// Fails when site copy carries a claim that no longer matches what the design
// system's CI actually checks (hirobius/folio#24). Run: npm run check:claims
import { readdirSync, readFileSync, statSync } from 'node:fs';
import { join } from 'node:path';

const ROOTS = ['lib', 'components', 'app'];
const EXTS = /\.(ts|tsx|css|mjs|js|json|md)$/;

const FORBIDDEN = [
  [/88 components/, 'stale component count (use the generated count)'],
  [/axe-core \/ CI/, 'axe-core is a Storybook panel, not a CI gate'],
  [/Playwright/, 'Playwright layout tests were retired (hds#161)'],
  [/enforced in CI/, 'name what CI checks: WCAG AA contrast gate + jsx-a11y lint'],
  [/year: '2025/, 'stale year (project dates are 2026)'],
  [/in CI['`]?;?$/, 'a11yEvidence must not end in "in CI": call sites add it and the blurb already says CI'],
  [/hds#92 \/ PR #99/, 'cite the field report as a link, not jargon'],
  [/github\.com\/hirobius\/hirobius-design-system/, 'old repo name'],
  [/job-hunt-jade|Job Hunt Jade|Apply Board/, 'cut card duplicating hds#92 / PR #99'],
  [/github\.com\/hirobius['"]/, 'profile link is github.com/adr-eng'],
];

function* walk(dir) {
  for (const name of readdirSync(dir)) {
    const p = join(dir, name);
    if (statSync(p).isDirectory()) yield* walk(p);
    else if (EXTS.test(name)) yield p;
  }
}

let bad = 0;
for (const root of ROOTS) {
  for (const file of walk(root)) {
    readFileSync(file, 'utf8').split('\n').forEach((line, i) => {
      for (const [re, why] of FORBIDDEN) {
        if (re.test(line)) {
          console.error(`${file}:${i + 1}: ${why}\n  ${line.trim()}`);
          bad++;
        }
      }
    });
  }
}
if (bad) {
  console.error(`\ncheck:claims failed: ${bad} stale claim(s)`);
  process.exit(1);
}
console.log('check:claims ok');
