# Design documentation

This file records the design decisions behind the PGCCDC redesign, so future updates stay consistent. The live, interactive version is at `/style-guide`.

## 1. Goals

From the brief and the client conversation:

- A **fresh visual direction** that "looks better", appeals to potential clients and partners, and holds up to funders' due diligence.
- **Better navigation**, with Donate and Contact always easy to reach.
- **Community-friendly visuals**: real people doing real things.
- **Fully responsive** and built to **WCAG 2.2 AA**.
- Implement the community partner's (Tamara's) content recommendations.

## 2. Layout approach and reasoning

**A 12-column grid with a multi-page structure** and long-scroll storytelling within each page.

- A single-page site would bury four very different programs in one long scroll and weaken search visibility. Separate pages let each program, partner and the Donate page be linked, shared and found on Google.
- Within each page, content flows as a **story**: hero, then why, then what, then proof, then action. Every page ends with a clear call to action.
- **Asymmetric 7/5 and 5/7 splits** on desktop give the editorial, modern feel. They collapse to one column on phones, and every section is designed mobile-first.
- **Bento grid** for Signature Programs: four large image cards, so visitors understand the breadth of PGCCDC at a glance.

### Navigation

- Four top-level items: About, Signature Programs (a mega-menu with images), Strategic Partnerships and Contact. This is down from eight on the old site.
- **Donate is a permanent gold button** in the header at every screen size. It is the single most important conversion.
- A thin utility bar (desktop) gives the phone, email and a **"Listen live"** link to Muzik Xpose' Radio.
- On mobile, a full-screen menu has large tap targets, the program sub-pages, and Donate and Listen-live buttons pinned at the bottom.
- Breadcrumbs on every inner page.

## 3. Colour

Brand navy and blue are **sampled directly from the PGCCDC logo**. Gold adds warmth and community energy.

| Token | Hex | Use |
| --- | --- | --- |
| `navy-900` | `#002552` | Brand navy: headlines, primary buttons, dark sections |
| `navy-950` | `#00142e` | Footer, overlays, utility bar |
| `blue-600` | `#0074b2` | Brand blue: accents, hovers |
| `blue-700` | `#005c8f` | Links and small accent text (AA on white) |
| `gold-500` | `#f2b33d` | Donate button and key highlights (navy text only) |
| `gold-300` | `#f8d47f` | Accent text on navy; headline underline |
| `leaf-700` | `#1f6447` | Health and food content |
| `plum-800` | `#3f1650` | Muzik Xpose' Radio (echoes the station's purple logo) |
| `ink` / `ink-soft` | `#0e1a2b` / `#46526a` | Body and secondary text |
| `cream` / `sand` | `#fbf8f2` / `#f2ece1` | Warm section backgrounds |

**Rules:**
- Gold is never used for text on white; it fails contrast. Use it as a background with navy text, or as text on navy.
- Use one gold call to action per view.
- All pairings are listed with their measured contrast ratios on `/style-guide`. Every pairing passes AA.

## 4. Typography

| Role | Font | Size (mobile → desktop) | Line height |
| --- | --- | --- | --- |
| Display | Fraunces 500 | 44 → 92px | 1.0 |
| H1 | Fraunces 500 | 38 → 68px | 1.04 |
| H2 | Fraunces 500 | 32 → 52px | 1.08 |
| H3 | Fraunces 500 | 22 → 30px | 1.2 |
| Lead | Plus Jakarta Sans 400 | 18 → 22px | 1.6 |
| Body | Plus Jakarta Sans 400 | 17px | 1.65 |
| Eyebrow | Plus Jakarta Sans 700, caps, +14% tracking | 13px | — |

- **Fraunces**, a soft, warm serif, gives headlines a human, community voice and differentiates PGCCDC from generic corporate templates.
- **Plus Jakarta Sans** is a modern, open sans-serif that is very legible on phones.
- Sizes scale fluidly with `clamp()`, so there are no awkward jumps between breakpoints.
- Use *italic* or the gold underline (`mark-gold`) to emphasise one idea per headline, never more.
- Fonts are self-hosted at build time with `next/font`. There are no external font requests.

## 5. Spacing, shape and elevation

- **4px base scale.** Common steps: 8, 12, 16, 24, 32, 48, 64, 96 and 120px.
- **Section padding** (`section-y`) is fluid: 64px on phones up to 120px on desktop.
- **Container:** 1280px maximum width, with 20px gutters on phones and 40px on desktop (`container-site`).
- **Radius:** 6px (small), 14px (inputs), 24px (cards), 32px (feature panels), full (buttons and chips).
- **Shadows:** `shadow-soft` for resting cards, `shadow-lift` for hover and floating elements.

## 6. Imagery

- Real PGCCDC images are kept: the logo, the Monty Ross portrait, Deep Roots Farm, Health Notes, Muzik Xpose', the NAIA flyer and the current stock photos.
- Extra photos are from **Unsplash (free license)** and focus on Black residents and families, health, food and learning. Credits are in `src/assets/img/CREDITS.md`.
- **Replace stock with the client's own community photos as they arrive.** Real photos will have the most impact.
- All images are optimised WebP, served responsively by `next/image`, with blur-up placeholders and lazy loading.

## 7. Accessibility (WCAG 2.2 AA)

- An automated **axe-core** scan of all 11 pages found zero violations against WCAG 2.0, 2.1 and 2.2 A/AA rules.
- Every interactive element has a visible gold focus ring, and there is a skip link and semantic landmarks.
- The Programs mega-menu works by keyboard and closes with Escape. The mobile menu traps focus and returns it on close.
- Tap targets are at least 44×44px.
- Motion respects "reduce motion". The scrolling municipality list pauses on hover and focus.
- Key figures (such as the MID numbers) are **real text, not images**, so screen readers and search engines can read them.
- Form fields have labels, required markers, inline errors, and focus moves to the first error.
- External links announce "opens in a new tab".
- Automated tools catch only part of WCAG. **A manual review with assistive technology is recommended before launch.**

## 8. How Tamara's recommendations were implemented

| Recommendation | Where |
| --- | --- |
| Remove National AI Academy as a page; place it under partners | `/partnerships#naia`, framed as a partner profile using NAIA's own wording. The old URL redirects there. |
| Remove the redundant Human Capital and Community Economic Development items | Not carried over |
| Move Health Notes under the Muzik page | `/programs/muzik-xpose-radio#health-notes` (cross-linked from Health) |
| Donate as its own page with a mail-a-check option | `/donate` |
| MIDs video not working | Clear "video coming soon" panel; ready for a working link |
| Leave development out for now | Not included |
| Peterbug video goes under the producer | `/programs/artist-in-residence`: Vimeo trailer with credit to Monty Ross for final edits |
| Pull Deep Roots Farm content on organic, sustainable, local food | `/programs/health-wellness-fitness#nutrition` and `/partnerships#deep-roots-farm` |
| Strategic Partnerships stays its own page and is expanded | `/partnerships`, with partner profiles and "who we partner with" |
| MID and Muzik Xpose' Radio belong under Signature Programs | Both are Signature Programs |

## 9. Open items for the client

1. **Check payee and mailing address.** The Donate page currently uses the full organization name and 11720 Capstan Drive. Please confirm.
2. **MIDs video:** please send a working link.
3. **Community photos and leadership headshots.** Monogram placeholders are used for now.
4. **Email addresses.** The footer of the current site shows `info@ppgccdc.com`, which doesn't match the domain. The new site uses `tolsonbanner@princegeorges-countycdc.org`. Please confirm which to use.
5. **Board member name.** The current site says John "Petersburg" Matthews; the documentary says John "Peterbug" Matthews. Please confirm.
6. **Online giving.** If wanted, choose a provider (e.g. Zeffy, PayPal Giving or Stripe) for the next milestone.
7. **Contact form.** It currently opens the visitor's email app. A form service can be connected at launch.
8. **NAIA flyer.** It states NAIA was "established through PGCCDC". Please confirm whether to keep the flyer image, given the due-diligence concern.
9. **X (Twitter) link.** The current site links to `twitter.com/MuXpose`, but that account doesn't exist, so it was removed. Send the correct handle if there is one.

## 10. Client feedback log

| Date | Feedback | Change |
| --- | --- | --- |
| 2026-10-26 | Executive Director: take out any reference to hyperscale data centers | Removed the data-center comparison, chart and infographic from the homepage and MID page. The MID is now presented on its own merits: jobs, local hiring, revenue, healthcare hub, training and clean energy. |
| 2026-10-27 | Temporarily remove the Deputy Director/COO profile from About, keeping it to add back later | Profile removed from the site and saved, unpublished, in `src/content/archive.ts`. Leadership shows a single wide card. To restore, move it back into `leadership` in `src/content/site.ts`. |
