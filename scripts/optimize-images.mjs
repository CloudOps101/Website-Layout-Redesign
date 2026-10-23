// One-time asset pipeline: pulls the current site's images (saved in _crawl/img)
// and the selected Unsplash photos, then writes optimised WebP files to src/assets/img.
import sharp from "sharp";
import { mkdir, writeFile } from "node:fs/promises";

sharp.cache(false);

const OUT = "src/assets/img";
const local = {
  "community-meeting": "_crawl/img/home-hero.jpg",
  "radio-studio": "_crawl/img/home-future.jpg",
  "team-hands": "_crawl/img/home-join.jpg",
  "monty-ross": "_crawl/img/monty.jpg",
  "deep-roots-logo": "_crawl/img/deeproots.jpg",
  "health-notes": "_crawl/img/health.jpg",
  "naia-flyer": "_crawl/img/naia.jpg",
  "mid-infographic": "_crawl/img/mid.png",
  "muzik-xpose-logo": "_crawl/img/muzik.jpg",
  // Vimeo poster frame of the documentary trailer (vimeo.com/1121020185)
  "documentary-poster": "_crawl/img/doc-poster.jpg",
  // Logo cropped from the NAIA flyer (python crop of naia.jpg)
  "naia-logo": "_crawl/img/naia-logo.png",
};
// Unsplash photo ids (free Unsplash License) -> local name
const unsplash = {
  "garden-planting": "1509099342178-e323b1717dba",
  "community-garden": "1781785273371-a959f34bfab0",
  "market-vegetables": "1591586116988-62fe65164f8d",
  "farmers-market": "1757609907613-57c5ad21f12a",
  "organic-stand": "1506484381205-f7945653044d",
  "doctor-child": "1536064479547-7ee40b74b807",
  "nurse-portrait": "1622253692010-333f2da6031d",
  "tech-learning": "1531482615713-2afd69097998",
  "girls-computer": "1653566031471-85365f8d0ae0",
  "entrepreneur-coaching": "1655720357872-ce227e4164ba",
  "family-cooking": "1761839258568-fd466a93f68b",
  "father-daughter": "1624272864537-8ecc72b67958",
  "fitness-class": "1518310383802-640c2de311b2",
  "film-set": "1632187981988-40f3cbaeef5e",
  "seniors-walking": "1782218948595-c7f6b86fa210",
  "medical-team": "1516841273335-e39b37888115",
  "blood-pressure": "1666887360680-9dc27a1d2753",
  "produce-basket": "1635774855717-0aec182f92cc",
};

await mkdir(OUT, { recursive: true });
const opts = { quality: 74, effort: 5 };
for (const [name, src] of Object.entries(local)) {
  const max = name.endsWith("-logo") ? 600 : 1800;
  await sharp(src).resize({ width: max, height: max, fit: "inside", withoutEnlargement: true }).webp(opts).toFile(`${OUT}/${name}.webp`);
  console.log("local", name);
}
for (const [name, id] of Object.entries(unsplash)) {
  const res = await fetch(`https://images.unsplash.com/photo-${id}?w=2200&q=85&fm=jpg`);
  const buf = Buffer.from(await res.arrayBuffer());
  await sharp(buf).resize({ width: 1800, withoutEnlargement: true }).webp(opts).toFile(`${OUT}/${name}.webp`);
  console.log("unsplash", name);
}
// Logo: colour + white (for dark surfaces) versions
await sharp("_crawl/img/logo-orig.png").toFile("public/logo-pgccdc.png");
await sharp("_crawl/img/logo-orig.png").ensureAlpha()
  .composite([{ input: { create: { width: 314, height: 105, channels: 4, background: "#ffffff" } }, blend: "in" }])
  .png().toFile("public/logo-pgccdc-white.png");
await writeFile(`${OUT}/CREDITS.md`, "# Image credits\n\nStock photos: Unsplash (free Unsplash License), ids:\n\n" +
  Object.entries(unsplash).map(([n, id]) => `- ${n}.webp — https://images.unsplash.com/photo-${id}`).join("\n") +
  "\n\nAll other images are from the current PGCCDC website.\n");
