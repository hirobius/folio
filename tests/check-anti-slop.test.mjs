import assert from "node:assert/strict";
import { spawnSync } from "node:child_process";
import { mkdtempSync, mkdirSync, readFileSync, rmSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { after, before, describe, it } from "node:test";
import { fileURLToPath } from "node:url";

const SCRIPT = fileURLToPath(new URL("../scripts/check-anti-slop.mjs", import.meta.url));
const BASELINE = "tools/oxlint/anti-slop-baseline.json";

// A native rule keeps the fixture independent of the vendored plugin.
const CONFIG = { rules: { "no-debugger": "warn" } };

let dir;

function write(rel, text) {
  const path = join(dir, rel);
  mkdirSync(join(path, ".."), { recursive: true });
  writeFileSync(path, text);
}

function run(...args) {
  const env = { ...process.env };
  for (const key of Object.keys(env)) if (key.startsWith("GIT_")) delete env[key];
  return spawnSync(process.execPath, [SCRIPT, "--cwd", dir, "src", ...args], { encoding: "utf8", env });
}

describe("check-anti-slop", () => {
  before(() => {
    dir = mkdtempSync(join(tmpdir(), "anti-slop-"));
    write(".oxlintrc.json", JSON.stringify(CONFIG));
  });
  after(() => rmSync(dir, { recursive: true, force: true }));

  it("--update writes sorted JSON", () => {
    write("src/b.js", "debugger;\n");
    write("src/a.js", "debugger;\ndebugger;\n");
    const res = run("--update");
    assert.equal(res.status, 0, res.stderr);
    const text = readFileSync(join(dir, BASELINE), "utf8");
    assert.deepEqual(JSON.parse(text), { "eslint(no-debugger)": { "src/a.js": 2, "src/b.js": 1 } });
    assert.ok(text.indexOf("src/a.js") < text.indexOf("src/b.js"));
    assert.ok(text.endsWith("\n"));
  });

  it("passes when counts equal the baseline", () => {
    const res = run();
    assert.equal(res.status, 0, res.stderr);
    assert.doesNotMatch(res.stdout, /fewer than baseline/);
  });

  it("fails and names file, rule and fix when a count goes up", () => {
    write("src/b.js", "debugger;\ndebugger;\n");
    const res = run();
    assert.equal(res.status, 1);
    assert.match(res.stderr, /src\/b\.js/);
    assert.match(res.stderr, /no-debugger/);
    assert.match(res.stderr, /--update/);
  });

  it("fails on a hit in a new file", () => {
    write("src/b.js", "debugger;\n");
    write("src/c.js", "debugger;\n");
    const res = run();
    assert.equal(res.status, 1);
    assert.match(res.stderr, /src\/c\.js/);
    rmSync(join(dir, "src/c.js"));
  });

  it("passes with a lock-in hint when counts go down", () => {
    write("src/a.js", "debugger;\n");
    const res = run();
    assert.equal(res.status, 0, res.stderr);
    assert.match(res.stdout, /1 fewer than baseline, run .*--update/);
  });
});
