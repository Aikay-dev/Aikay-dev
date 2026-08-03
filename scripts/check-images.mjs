/**
 * Guards against the failure that is invisible until production: a project
 * referencing a screenshot nobody ever captured. Run it after touching either
 * the content file or the images.
 *
 *   node scripts/check-images.mjs
 */
import { readFileSync, existsSync, readdirSync } from "node:fs";
import path from "node:path";

const src = readFileSync("src/content/projects.ts", "utf8");
const referenced = [...new Set([...src.matchAll(/["'](\/images\/[^"']+)["']/g)].map((m) => m[1]))];

const missing = referenced.filter((ref) => !existsSync(path.join("public", ref)));

const walk = (dir) =>
  readdirSync(dir, { withFileTypes: true }).flatMap((entry) =>
    entry.isDirectory() ? walk(path.join(dir, entry.name)) : [path.join(dir, entry.name)]
  );

const onDisk = walk(path.join("public", "images", "work")).map((f) =>
  f.split(path.sep).join("/").replace(/^public/, "")
);
const unused = onDisk.filter((f) => !referenced.includes(f));

console.log(`referenced: ${referenced.length}   missing: ${missing.length}   unused: ${unused.length}`);
missing.forEach((m) => console.log(`  MISSING  ${m}`));
unused.forEach((u) => console.log(`  unused   ${u}`));

if (missing.length) process.exit(1);
