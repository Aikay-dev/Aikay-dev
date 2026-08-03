/**
 * One-off: convert the source phone photos into web-ready WebP.
 * next/image handles responsive resizing from these; this step only strips
 * EXIF bulk and gets them out of multi-megabyte JPEG territory.
 *
 *   node scripts/process-portraits.mjs
 */
import sharp from "sharp";
import { mkdir } from "node:fs/promises";
import path from "node:path";

const SRC = "C:/Users/AIKAY/Documents/images";
const OUT = path.join(process.cwd(), "public", "images", "portrait");

const jobs = [
  {
    in: "WhatsApp Image 2026-08-03 at 14.59.32 (2).jpeg",
    out: "hero.webp",
    // Golden-hour three-quarter portrait. Crop to a tall 3:4 biased toward the
    // top so the face sits on the upper third rather than dead centre.
    resize: { width: 1400, height: 1867, fit: "cover", position: "top" },
    quality: 86,
  },
  {
    in: "WhatsApp Image 2026-08-03 at 14.59.32 (1).jpeg",
    out: "about.webp",
    // Full body, overcast. Keep the whole frame — the negative space above and
    // below is what makes it work beside a column of text.
    resize: { width: 1100, height: 1600, fit: "cover", position: "centre" },
    quality: 86,
  },
  {
    in: "WhatsApp Image 2026-08-03 at 14.59.32.jpeg",
    out: "candid.webp",
    resize: { width: 1400, height: 1050, fit: "cover", position: "centre" },
    quality: 84,
  },
];

await mkdir(OUT, { recursive: true });

for (const job of jobs) {
  const dest = path.join(OUT, job.out);
  const info = await sharp(path.join(SRC, job.in))
    .rotate()
    .resize(job.resize)
    .webp({ quality: job.quality })
    .toFile(dest);
  console.log(`${job.out.padEnd(14)} ${info.width}x${info.height}  ${(info.size / 1024).toFixed(0)} KB`);
}
