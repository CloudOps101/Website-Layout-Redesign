// Builds a plain HTML/CSS/JS copy of the site in ./html-mockup.
//
// It takes the pages Next.js pre-renders during `next build`, so the markup and
// CSS are identical to the Next.js site, then:
//   - removes the React/Next runtime scripts
//   - copies the compiled CSS and self-hosted fonts
//   - replaces /_next/image URLs with pre-sized WebP files
//   - adds the mobile menu markup and a small vanilla JS file (main.js)
//
// Usage: npm run build:html
//   (runs `next build` with SITE_URL set to the Netlify address, then this script).
//   Set MOCKUP_URL to change the address used in social-share tags.
import sharp from "sharp";
import { cp, mkdir, readFile, readdir, rm, writeFile, copyFile } from "node:fs/promises";
import { existsSync } from "node:fs";
import { execSync } from "node:child_process";
import path from "node:path";

sharp.cache(false);

const APP = ".next/server/app";
const MEDIA = ".next/static/media";
const OUT = "html-mockup";
const WIDTHS = [400, 800, 1200];

const routes = [
  ["index.html", "/"],
  ["about.html", "/about"],
  ["programs.html", "/programs"],
  ["programs/medical-innovation-districts.html", "/programs/medical-innovation-districts"],
  ["programs/health-wellness-fitness.html", "/programs/health-wellness-fitness"],
  ["programs/muzik-xpose-radio.html", "/programs/muzik-xpose-radio"],
  ["programs/artist-in-residence.html", "/programs/artist-in-residence"],
  ["partnerships.html", "/partnerships"],
  ["donate.html", "/donate"],
  ["contact.html", "/contact"],
  ["style-guide.html", "/style-guide"],
  ["_not-found.html", "/404"],
];

const MOCKUP_URL = (process.env.MOCKUP_URL ?? "https://pgccdc-mockup.netlify.app").replace(/\/$/, "");
if (process.argv.includes("--build")) {
  // Social images and canonical links must be absolute, so build against the mockup's own address
  execSync("npx next build", { stdio: "inherit", env: { ...process.env, SITE_URL: MOCKUP_URL } });
}

if (!existsSync(path.join(APP, "index.html"))) {
  console.error("No pre-rendered pages found. Run `npm run build` first.");
  process.exit(1);
}

await rm(OUT, { recursive: true, force: true });
await mkdir(`${OUT}/assets/css`, { recursive: true });
await mkdir(`${OUT}/assets/fonts`, { recursive: true });
await mkdir(`${OUT}/assets/img`, { recursive: true });
await mkdir(`${OUT}/assets/js`, { recursive: true });

/* ---------- Static files ---------- */
for (const f of await readdir("public")) await copyFile(`public/${f}`, `${OUT}/${f}`);
// Icons and the social-share image, as Next.js generated them
for (const f of ["favicon.ico", "icon.png", "apple-icon.png", "opengraph-image.jpg"]) {
  await copyFile(path.join(APP, `${f}.body`), `${OUT}/${f}`);
}
// Contact form key (same variable as the Next.js site); empty keeps the email-app fallback
const envFile = existsSync(".env.local") ? await readFile(".env.local", "utf8") : "";
const formKey = process.env.NEXT_PUBLIC_WEB3FORMS_KEY ?? envFile.match(/^NEXT_PUBLIC_WEB3FORMS_KEY=(.*)$/m)?.[1]?.trim() ?? "";
await writeFile(`${OUT}/assets/js/main.js`, (await readFile("scripts/html-mockup/main.js", "utf8")).replace("__WEB3FORMS_KEY__", formKey));
if (!formKey) console.log("note: NEXT_PUBLIC_WEB3FORMS_KEY not set, contact form will open the email app");
for (const f of await readdir(MEDIA)) {
  if (f.endsWith(".woff2")) await copyFile(`${MEDIA}/${f}`, `${OUT}/assets/fonts/${f}`);
}

/* ---------- Images: original + resized variants ---------- */
const images = {}; // name -> { width, variants: [[w, url]] }
async function imageFor(name) {
  if (images[name]) return images[name];
  const src = `src/assets/img/${name}.webp`;
  const { width } = await sharp(src).metadata();
  await copyFile(src, `${OUT}/assets/img/${name}.webp`);
  const variants = [];
  for (const w of WIDTHS) {
    if (w >= width) continue;
    await sharp(src).resize({ width: w }).webp({ quality: 74, effort: 5 }).toFile(`${OUT}/assets/img/${name}-${w}.webp`);
    variants.push([w, `/assets/img/${name}-${w}.webp`]);
  }
  variants.push([width, `/assets/img/${name}.webp`]);
  return (images[name] = { width, variants });
}

const decode = (s) => decodeURIComponent(s.replace(/&amp;/g, "&"));
const mediaName = (url) => path.basename(url).split(".")[0]; // "blood-pressure.2x46.webp" -> "blood-pressure"

async function mapImageUrl(nextUrl, wanted) {
  const target = decode(nextUrl);
  if (!target.startsWith("/_next/static/media/")) return target; // public files, e.g. /logo-pgccdc.png
  const img = await imageFor(mediaName(target));
  return (img.variants.find(([w]) => w >= wanted) ?? img.variants.at(-1))[1];
}

/* ---------- CSS ---------- */
const cssMap = {};
async function cssFor(href) {
  if (cssMap[href]) return cssMap[href];
  const file = path.basename(href);
  let css = await readFile(`.next/static/chunks/${file}`, "utf8");
  css = css.replace(/url\(\.\.\/media\/([^)]+\.woff2)\)/g, "url(../fonts/$1)");
  const name = Object.keys(cssMap).length ? `site-${Object.keys(cssMap).length}.css` : "site.css";
  await writeFile(`${OUT}/assets/css/${name}`, css);
  return (cssMap[href] = `/assets/css/${name}`);
}

/* ---------- Pages ---------- */
const mobileMenu = await readFile("scripts/html-mockup/mobile-menu.html", "utf8");

async function replaceAsync(str, re, fn) {
  const parts = [];
  let last = 0;
  for (const m of str.matchAll(re)) {
    parts.push(str.slice(last, m.index), await fn(...m));
    last = m.index + m[0].length;
  }
  parts.push(str.slice(last));
  return parts.join("");
}

for (const [file, route] of routes) {
  let html = await readFile(path.join(APP, file), "utf8");

  // Runtime scripts, script/image preloads, React markers
  html = html.replace(/<script\b[^>]*>[\s\S]*?<\/script>/g, "");
  html = html.replace(/<link rel="preload"[^>]*\/?>/g, "");
  html = html.replace(/<!--\$-->|<!--\/\$-->|<!-- -->/g, "");

  // Stylesheets and favicon
  html = await replaceAsync(html, /<link rel="stylesheet" href="([^"]+)"[^>]*\/?>/g, async (_, href) => `<link rel="stylesheet" href="${await cssFor(href)}"/>`);
  // Icon and social-image URLs carry a cache-busting query; the static files don't need it
  html = html.replace(/((?:favicon\.ico|icon\.png|apple-icon\.png|opengraph-image\.jpg))\?[^"]+/g, "$1");

  // Images: srcSet -> pre-sized variants, src -> mapped file, drop blur placeholders
  html = await replaceAsync(html, /srcSet="([^"]+)"/g, async (_, set) => {
    const entries = set.split(", ").map((e) => e.trim().split(" "));
    if (entries[0][1]?.endsWith("x")) {
      const urls = await Promise.all(entries.map(([u]) => mapImageUrl(u.match(/url=([^&]+)/)[1], 640)));
      return urls[0].startsWith("/assets/") ? `srcset="${urls.map((u, i) => `${u} ${entries[i][1]}`).join(", ")}"` : "";
    }
    const name = mediaName(decode(entries[0][0].match(/url=([^&]+)/)[1]));
    const img = await imageFor(name);
    return `srcset="${img.variants.map(([w, u]) => `${u} ${w}w`).join(", ")}"`;
  });
  html = await replaceAsync(html, /\/_next\/image\?url=([^&"]+)&amp;w=(\d+)&amp;q=\d+/g, (_, u, w) => mapImageUrl(u, Number(w)));
  html = await replaceAsync(html, /href="(\/_next\/static\/media\/[^"]+\.webp)"/g, async (_, u) => `href="/assets/img/${mediaName(u)}.webp"`);
  html = html.replace(/;?background-size:cover;background-position:50% 50%;background-repeat:no-repeat;background-image:url\(&quot;data:image\/[^"]*?&quot;\)/g, "");
  html = html.replace(/ fetchPriority=/g, " fetchpriority=").replace(/ imageSizes=/g, " sizes=");

  // Hooks for main.js
  html = html.replace(
    '<button type="button" class="group absolute inset-0 size-full">',
    '<button type="button" class="group absolute inset-0 size-full" data-vimeo="1121020185" data-title="Let Me Put This BUG In Your Ear: The John “Peterbug” Matthews Story">',
  );
  html = html.replace(/<button type="button"(?=[^>]*>(?:(?!<\/button>)[\s\S])*Copy address)/, "<button type=\"button\" data-copy-address");

  // Mobile menu with the current page marked
  const menu = mobileMenu
    .trim()
    .replace(new RegExp(`(<a )(class="[^"]*" href="${route.replace(/[/]/g, "\\/")}")`), '$1aria-current="page" $2');
  html = html.replace("</header>", `</header>${menu}`);

  // JS flag (enables reveal styles) + behaviour script
  html = html.replace(/<head>/, "<head><script>document.documentElement.classList.add('js')</script>");
  html = html.replace("</body>", '<script src="/assets/js/main.js" defer></script></body>');

  const outFile = route === "/" ? "index.html" : route === "/404" ? "404.html" : `${route.slice(1)}/index.html`;
  await mkdir(path.dirname(path.join(OUT, outFile)), { recursive: true });
  await writeFile(path.join(OUT, outFile), html);
  console.log("page", outFile);
}

/* ---------- Netlify: old Squarespace URLs ---------- */
await writeFile(
  `${OUT}/_redirects`,
  [
    "/home                 /                                        301",
    "/about-1              /about                                   301",
    "/projects-1           /partnerships                            301",
    "/projects-2-1         /programs/health-wellness-fitness        301",
    "/projects-2-1-1       /partnerships#naia                       301",
    "/projects-2-1-1-2     /programs/medical-innovation-districts   301",
    "/projects-3           /programs/muzik-xpose-radio              301",
    "/new-dropdown         /programs                                301",
    "",
  ].join("\n"),
);
await cp("scripts/html-mockup/README.md", `${OUT}/README.md`);
// The mockup is a review copy: keep it out of search results
await writeFile(`${OUT}/robots.txt`, "User-agent: *\nDisallow: /\n");
// Netlify (when deployed from Git with base directory "html-mockup"): plain static files, no build
await writeFile(`${OUT}/netlify.toml`, `[build]
  publish = "."
  command = ""
`);
console.log(`done: ${Object.keys(images).length} images, ${Object.keys(cssMap).length} stylesheet(s)`);
