# PGCCDC website: HTML mockup

A plain HTML, CSS and JavaScript copy of the PGCCDC redesign, for review and approval. It needs no build step and no server code.

```
index.html                 Home
about/                     About
programs/                  Signature Programs and the four program pages
partnerships/              Strategic Partnerships
donate/                    Donate
contact/                   Contact
style-guide/               Design documentation
404.html                   Page not found
assets/css/site.css        All styles
assets/js/main.js          Menus, scroll animations, video, contact form
assets/img/                Optimised WebP images (several sizes each)
assets/fonts/              Fraunces and Plus Jakarta Sans (self-hosted)
_redirects                 Netlify: old Squarespace URLs → new pages
```

## Deploy on Netlify
Drag this whole folder onto https://app.netlify.com/drop, or connect the GitHub repo with **Base directory** `html-mockup` and an empty build command.

## Preview locally
Links use root paths (`/about`), so open the site through a local server rather than by double-clicking the files:

```bash
npx serve html-mockup
```

## Regenerating
This folder is generated from the Next.js site, so edit the Next.js source rather than these files. Then run:

```bash
npm run build:html
```
