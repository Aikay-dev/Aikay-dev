/**
 * Turns the captured PNGs into WebP, and generates the assets for the three
 * projects that have no screenshot to take:
 *
 *   - ai-interviewer   an architecture diagram (a real schematic of the real
 *                      pipeline — not a mocked-up UI)
 *   - polymarket-scanner, keylevel-hedge-ea
 *                      typographic covers. Deliberately NOT fabricated
 *                      terminal output or a fake chart.
 *
 *   node scripts/build-work-images.mjs
 */
import sharp from "sharp";
import { readdir, unlink, mkdir } from "node:fs/promises";
import path from "node:path";

const ROOT = path.join(process.cwd(), "public", "images", "work");

/* ------------------------------------------------------- png -> webp ---- */

const dirs = await readdir(ROOT, { withFileTypes: true });
let converted = 0;

for (const dir of dirs.filter((d) => d.isDirectory())) {
  const dirPath = path.join(ROOT, dir.name);
  const files = await readdir(dirPath);

  for (const file of files.filter((f) => f.endsWith(".png"))) {
    const src = path.join(dirPath, file);
    const dest = src.replace(/\.png$/, ".webp");

    // Cap width so a 2x full-page capture doesn't ship as a 6 MB asset.
    await sharp(src).resize({ width: 2000, withoutEnlargement: true }).webp({ quality: 82 }).toFile(dest);
    await unlink(src);
    converted += 1;
  }
}

console.log(`converted ${converted} png -> webp`);

/* ------------------------------------------------ typographic covers ---- */

const escape = (s) => s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");

function coverSvg({ title, discipline, accent, width = 1600, height = 1000 }) {
  return `<svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${height}" viewBox="0 0 ${width} ${height}">
    <rect width="${width}" height="${height}" fill="${accent}"/>
    <g fill="#ffffff">
      <text x="96" y="${height - 168}" font-family="Georgia, 'Times New Roman', serif" font-size="132" letter-spacing="-2">${escape(title)}</text>
      <text x="96" y="${height - 96}" font-family="ui-monospace, 'SF Mono', Menlo, monospace" font-size="30" letter-spacing="3" opacity="0.72">${escape(discipline.toUpperCase())}</text>
    </g>
    <rect x="96" y="96" width="88" height="4" fill="#ffffff" opacity="0.85"/>
  </svg>`;
}

const covers = [
  {
    slug: "polymarket-scanner",
    title: "Polymarket Scanner",
    discipline: "Quant · research",
    accent: "#12513c",
  },
  {
    slug: "keylevel-hedge-ea",
    title: "KeyLevel Hedge EA",
    discipline: "Trading systems",
    accent: "#7a4f14",
  },
  {
    slug: "ai-interviewer",
    title: "AI Interviewer",
    discipline: "Desktop · AI",
    accent: "#3c2c8f",
  },
];

for (const cover of covers) {
  const dir = path.join(ROOT, cover.slug);
  await mkdir(dir, { recursive: true });
  await sharp(Buffer.from(coverSvg(cover)))
    .webp({ quality: 90 })
    .toFile(path.join(dir, "cover.webp"));
  console.log(`cover  ${cover.slug}`);
}

/* -------------------------------------- ai-interviewer architecture ----- */

const BG = "#1a1526";
const INK = "#efedf6";
const MUTED = "#9d95bd";
const ACCENT = "#8f7aff";

const stages = [
  ["Microphone", "system audio capture"],
  ["Whisper", "local GPU transcription"],
  ["Question detection", "last unanswered question"],
  ["OpenRouter", "Gemini · Claude · GPT"],
  ["Answer panel", "excluded from capture"],
];

const W = 1600;
const H = 840;
const boxW = 268;
const boxH = 150;
const gap = (W - 160 - stages.length * boxW) / (stages.length - 1);

let nodes = "";
stages.forEach(([title, sub], i) => {
  const x = 80 + i * (boxW + gap);
  const y = 350;
  const isLast = i === stages.length - 1;

  nodes += `
    <rect x="${x}" y="${y}" width="${boxW}" height="${boxH}" fill="none"
          stroke="${isLast ? ACCENT : MUTED}" stroke-width="${isLast ? 2.5 : 1.5}"/>
    <text x="${x + 22}" y="${y + 58}" fill="${INK}" font-family="Georgia, serif" font-size="27">${escape(title)}</text>
    <text x="${x + 22}" y="${y + 96}" fill="${MUTED}" font-family="ui-monospace, monospace" font-size="14.5">${escape(sub)}</text>`;

  if (i < stages.length - 1) {
    const ax = x + boxW;
    const ay = y + boxH / 2;
    nodes += `
    <line x1="${ax + 12}" y1="${ay}" x2="${ax + gap - 18}" y2="${ay}" stroke="${MUTED}" stroke-width="1.5"/>
    <path d="M ${ax + gap - 18} ${ay} l -10 -6 v 12 z" fill="${MUTED}"/>`;
  }
});

const diagram = `<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}" viewBox="0 0 ${W} ${H}">
  <rect width="${W}" height="${H}" fill="${BG}"/>
  <text x="80" y="132" fill="${INK}" font-family="Georgia, serif" font-size="68">The pipeline</text>
  <text x="80" y="188" fill="${MUTED}" font-family="ui-monospace, monospace" font-size="20">AUDIO IN — ANSWER OUT, WHILE THEY ARE STILL TALKING</text>
  <line x1="80" y1="240" x2="${W - 80}" y2="240" stroke="${MUTED}" stroke-width="1" opacity="0.35"/>
  ${nodes}
  <text x="80" y="630" fill="${MUTED}" font-family="ui-monospace, monospace" font-size="19">Audio never leaves the machine. Only the detected question text is sent out.</text>
  <text x="80" y="668" fill="${ACCENT}" font-family="ui-monospace, monospace" font-size="19">SetWindowDisplayAffinity — WDA_EXCLUDEFROMCAPTURE</text>
</svg>`;

await sharp(Buffer.from(diagram))
  .webp({ quality: 92 })
  .toFile(path.join(ROOT, "ai-interviewer", "pipeline.webp"));
console.log("diagram ai-interviewer/pipeline");
