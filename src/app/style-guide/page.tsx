import type { Metadata } from "next";
import { Check } from "lucide-react";

import { ArrowLink, ButtonLink, Eyebrow } from "@/components/ui";

export const metadata: Metadata = {
  title: "Style Guide",
  description: "PGCCDC design system: colour, typography, spacing, layout and components.",
  robots: { index: false },
};

const colors = [
  { name: "Navy 900", token: "navy-900", hex: "#002552", note: "Brand navy (logo). Headlines, primary buttons, dark sections." },
  { name: "Navy 950", token: "navy-950", hex: "#00142e", note: "Footer, hero overlays, utility bar." },
  { name: "Blue 600", token: "blue-600", hex: "#0074b2", note: "Brand blue (logo). Accents, hover states." },
  { name: "Blue 700", token: "blue-700", hex: "#005c8f", note: "Links and eyebrow text on light backgrounds." },
  { name: "Gold 500", token: "gold-500", hex: "#f2b33d", note: "Community accent. Donate button, highlights. Navy text only." },
  { name: "Gold 300", token: "gold-300", hex: "#f8d47f", note: "Accent text on navy; headline underline." },
  { name: "Leaf 700", token: "leaf-700", hex: "#1f6447", note: "Health & food content." },
  { name: "Plum 800", token: "plum-800", hex: "#3f1650", note: "Muzik Xpose' Radio sections." },
  { name: "Ink", token: "ink", hex: "#0e1a2b", note: "Body text." },
  { name: "Ink soft", token: "ink-soft", hex: "#46526a", note: "Secondary text." },
  { name: "Cream", token: "cream", hex: "#fbf8f2", note: "Warm section background." },
  { name: "Sand", token: "sand", hex: "#f2ece1", note: "Alternate warm background." },
];

// WCAG relative luminance contrast
function lum(hex: string) {
  const [r, g, b] = [1, 3, 5].map((i) => {
    const c = parseInt(hex.slice(i, i + 2), 16) / 255;
    return c <= 0.03928 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4;
  });
  return 0.2126 * r + 0.7152 * g + 0.0722 * b;
}
function ratio(a: string, b: string) {
  const [l1, l2] = [lum(a), lum(b)].sort((x, y) => y - x);
  return (l1 + 0.05) / (l2 + 0.05);
}

const pairs = [
  ["Ink on white", "#0e1a2b", "#ffffff"],
  ["Ink soft on white", "#46526a", "#ffffff"],
  ["Ink soft on cream", "#46526a", "#fbf8f2"],
  ["Ink soft on sand", "#46526a", "#f2ece1"],
  ["Navy 900 on white", "#002552", "#ffffff"],
  ["Blue 700 on white", "#005c8f", "#ffffff"],
  ["Blue 600 on white", "#0074b2", "#ffffff"],
  ["White on navy 900", "#ffffff", "#002552"],
  ["Gold 300 on navy 950", "#f8d47f", "#00142e"],
  ["Gold 300 on navy 900", "#f8d47f", "#002552"],
  ["Navy 950 on gold 500", "#00142e", "#f2b33d"],
  ["Leaf 700 on cream", "#1f6447", "#fbf8f2"],
  ["White on plum 800", "#ffffff", "#3f1650"],
] as const;

const type = [
  { cls: "text-display font-display", label: "Display", spec: "Fraunces 500 · 44 → 92px · lh 1.0 · -3.5%" },
  { cls: "text-h1 font-display", label: "H1", spec: "Fraunces 500 · 38 → 68px · lh 1.04" },
  { cls: "text-h2 font-display", label: "H2", spec: "Fraunces 500 · 32 → 52px · lh 1.08" },
  { cls: "text-h3 font-display", label: "H3", spec: "Fraunces 500 · 22 → 30px · lh 1.2" },
  { cls: "text-lead", label: "Lead", spec: "Plus Jakarta Sans 400 · 18 → 22px · lh 1.6" },
  { cls: "text-[1.0625rem]", label: "Body", spec: "Plus Jakarta Sans 400 · 17px · lh 1.65" },
  { cls: "eyebrow", label: "Eyebrow", spec: "Plus Jakarta Sans 700 · 13px · caps · +14%" },
];

const spacing = [
  ["4", "0.25rem"],
  ["8", "0.5rem"],
  ["12", "0.75rem"],
  ["16", "1rem"],
  ["24", "1.5rem"],
  ["32", "2rem"],
  ["48", "3rem"],
  ["64", "4rem"],
  ["96", "6rem"],
  ["120", "7.5rem"],
];

export default function StyleGuidePage() {
  return (
    <div className="bg-white">
      <header className="grain border-b border-line bg-cream">
        <div className="container-site py-16 md:py-20">
          <Eyebrow>Design system v1.0</Eyebrow>
          <h1 className="text-h1 mt-4 font-medium text-navy-900">PGCCDC style guide</h1>
          <p className="text-lead mt-4 max-w-2xl text-ink-soft">
            The rules behind the redesign, so every future page stays consistent, accessible and on-brand. All tokens
            live in <code className="rounded bg-white px-1.5 py-0.5 text-base">src/app/globals.css</code>.
          </p>
          <nav aria-label="Style guide sections" className="mt-8">
            <ul className="flex flex-wrap gap-2 text-sm font-semibold">
              {["Colour", "Contrast", "Typography", "Spacing", "Layout", "Components", "Accessibility"].map((s) => (
                <li key={s}>
                  <a href={`#${s.toLowerCase()}`} className="inline-flex min-h-11 items-center rounded-full border border-line bg-white px-4 text-navy-900 hover:border-blue-600">
                    {s}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
        </div>
      </header>

      <div className="container-site space-y-24 py-20">
        {/* Colour */}
        <section id="colour" aria-labelledby="c-title" className="scroll-mt-28">
          <h2 id="c-title" className="text-h2 font-medium text-navy-900">Colour</h2>
          <p className="mt-3 max-w-2xl text-ink-soft">
            Navy and blue are sampled directly from the PGCCDC logo. Gold adds warmth and marks the most important
            action (Donate). Leaf and plum are scoped to health and radio content.
          </p>
          <ul className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {colors.map((c) => (
              <li key={c.token} className="overflow-hidden rounded-[var(--radius-md)] border border-line">
                <div className="h-24" style={{ background: c.hex }} />
                <div className="p-4">
                  <p className="font-semibold text-navy-900">{c.name}</p>
                  <p className="font-mono text-sm text-ink-soft">
                    {c.hex} · {c.token}
                  </p>
                  <p className="mt-2 text-sm text-ink-soft">{c.note}</p>
                </div>
              </li>
            ))}
          </ul>
        </section>

        {/* Contrast */}
        <section id="contrast" aria-labelledby="ct-title" className="scroll-mt-28">
          <h2 id="ct-title" className="text-h2 font-medium text-navy-900">Contrast (WCAG 2.2)</h2>
          <p className="mt-3 max-w-2xl text-ink-soft">
            Every text pairing used on the site, calculated live. AA requires 4.5:1 for body text and 3:1 for large
            text (24px+, or 19px+ bold).
          </p>
          <div className="mt-8 overflow-x-auto rounded-[var(--radius-md)] border border-line">
            <table className="w-full min-w-[36rem] text-left text-sm">
              <thead className="bg-cream text-navy-900">
                <tr>
                  <th scope="col" className="p-4">Pairing</th>
                  <th scope="col" className="p-4">Sample</th>
                  <th scope="col" className="p-4">Ratio</th>
                  <th scope="col" className="p-4">Result</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-line">
                {pairs.map(([label, fg, bg]) => {
                  const r = ratio(fg, bg);
                  return (
                    <tr key={label}>
                      <th scope="row" className="p-4 font-medium text-navy-900">{label}</th>
                      <td className="p-4">
                        <span className="inline-block rounded-md px-3 py-1.5 font-semibold" style={{ color: fg, background: bg, boxShadow: "inset 0 0 0 1px #e4dfd4" }}>
                          Aa Sample
                        </span>
                      </td>
                      <td className="p-4 font-mono">{r.toFixed(2)}:1</td>
                      <td className="p-4 font-semibold">
                        {r >= 7 ? "AAA" : r >= 4.5 ? "AA" : r >= 3 ? "AA large only" : "Fail"}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </section>

        {/* Typography */}
        <section id="typography" aria-labelledby="t-title" className="scroll-mt-28">
          <h2 id="t-title" className="text-h2 font-medium text-navy-900">Typography</h2>
          <p className="mt-3 max-w-2xl text-ink-soft">
            <strong>Fraunces</strong>, a warm, soft serif, for headings gives the site a human, community voice.{" "}
            <strong>Plus Jakarta Sans</strong> for body text is modern and highly legible at small sizes. Sizes scale
            fluidly between mobile and desktop with <code>clamp()</code>, so no text is ever smaller than 13px. Use
            italics in headlines sparingly to emphasise one idea.
          </p>
          <ul className="mt-10 divide-y divide-line border-y border-line">
            {type.map((t) => (
              <li key={t.label} className="grid gap-3 py-6 md:grid-cols-[12rem_1fr] md:items-baseline">
                <div>
                  <p className="font-semibold text-navy-900">{t.label}</p>
                  <p className="text-sm text-ink-soft">{t.spec}</p>
                </div>
                <p className={`${t.cls} text-navy-900`}>For the Community. By the Community.</p>
              </li>
            ))}
          </ul>
        </section>

        {/* Spacing */}
        <section id="spacing" aria-labelledby="s-title" className="scroll-mt-28">
          <h2 id="s-title" className="text-h2 font-medium text-navy-900">Spacing &amp; shape</h2>
          <p className="mt-3 max-w-2xl text-ink-soft">
            A 4px base scale. Sections use fluid vertical padding (<code>section-y</code>: 64px mobile → 120px
            desktop). Cards use 24–40px inner padding. Corners: 6px (small), 14px (medium), 24px (cards), 32px
            (feature panels), full (buttons and chips).
          </p>
          <ul className="mt-10 space-y-3">
            {spacing.map(([px, rem]) => (
              <li key={px} className="flex items-center gap-4">
                <span className="w-16 font-mono text-sm text-ink-soft">{px}px</span>
                <span className="h-4 rounded-sm bg-blue-600" style={{ width: rem }} />
                <span className="font-mono text-sm text-ink-soft">{rem}</span>
              </li>
            ))}
          </ul>
        </section>

        {/* Layout */}
        <section id="layout" aria-labelledby="l-title" className="scroll-mt-28">
          <h2 id="l-title" className="text-h2 font-medium text-navy-900">Layout &amp; grid</h2>
          <p className="mt-3 max-w-3xl text-ink-soft">
            A 12-column grid with a 1280px maximum width. Side gutters scale from 20px on phones to 40px on desktop.
            Content collapses to a single column below 768px, two columns from 768px, and full asymmetric layouts
            (7/5, 5/7) from 1024px. The main navigation switches to a full-screen menu below 1024px, and the gold
            Donate button stays visible at every size.
          </p>
          <div className="mt-8 grid grid-cols-12 gap-2 md:gap-4" aria-hidden>
            {Array.from({ length: 12 }).map((_, i) => (
              <div key={i} className="flex h-24 items-end justify-center rounded-md bg-blue-50 pb-2 font-mono text-xs text-blue-700">
                {i + 1}
              </div>
            ))}
          </div>
          <dl className="mt-8 grid gap-4 sm:grid-cols-4">
            {[
              ["Mobile", "< 640px"],
              ["Tablet", "640–1023px"],
              ["Desktop", "1024–1279px"],
              ["Wide", "≥ 1280px"],
            ].map(([k, v]) => (
              <div key={k} className="rounded-[var(--radius-md)] border border-line p-4">
                <dt className="font-semibold text-navy-900">{k}</dt>
                <dd className="font-mono text-sm text-ink-soft">{v}</dd>
              </div>
            ))}
          </dl>
        </section>

        {/* Components */}
        <section id="components" aria-labelledby="cp-title" className="scroll-mt-28">
          <h2 id="cp-title" className="text-h2 font-medium text-navy-900">Components</h2>
          <p className="mt-3 max-w-2xl text-ink-soft">
            Buttons are at least 48px tall (44px for compact controls). Use one primary action per section. Gold is
            reserved for giving and the single most important action on dark backgrounds.
          </p>
          <div className="mt-8 flex flex-wrap items-center gap-4 rounded-[var(--radius-lg)] border border-line p-8">
            <ButtonLink href="/programs">Primary</ButtonLink>
            <ButtonLink href="/donate" variant="gold">
              Gold / Donate
            </ButtonLink>
            <ButtonLink href="/contact" variant="outline">
              Outline
            </ButtonLink>
            <ArrowLink href="/about">Text link</ArrowLink>
          </div>
          <div className="on-dark mt-4 flex flex-wrap items-center gap-4 rounded-[var(--radius-lg)] bg-navy-900 p-8">
            <ButtonLink href="/donate" variant="gold">
              Gold on dark
            </ButtonLink>
            <ButtonLink href="/contact" variant="outline-light">
              Outline light
            </ButtonLink>
            <ArrowLink href="/about" light>
              Text link on dark
            </ArrowLink>
          </div>
        </section>

        {/* Accessibility */}
        <section id="accessibility" aria-labelledby="a-title" className="scroll-mt-28">
          <h2 id="a-title" className="text-h2 font-medium text-navy-900">Accessibility checklist</h2>
          <p className="mt-3 max-w-2xl text-ink-soft">
            Designed and built to WCAG 2.2 Level AA guidance. A formal audit with assistive-technology users is
            recommended before launch.
          </p>
          <ul className="mt-8 grid gap-3 md:grid-cols-2">
            {[
              "Text contrast meets AA (see table above)",
              "Visible gold focus ring on every interactive element",
              "Skip-to-content link and semantic landmarks",
              "One H1 per page with a logical heading order",
              "Tap targets at least 44 × 44px",
              "Descriptive alt text; decorative images hidden",
              "Menus work by keyboard; Escape closes them",
              "Mobile menu traps focus and restores it on close",
              "Animations respect “reduce motion” settings",
              "Scrolling text pauses on hover and focus",
              "Form fields have labels, required markers and clear errors",
              "External links announce that they open a new tab",
              "Video loads only on request, with a text summary",
              "Key figures written as real text, not images",
            ].map((t) => (
              <li key={t} className="flex gap-3 rounded-xl bg-cream p-4 text-navy-900">
                <Check aria-hidden className="mt-0.5 size-5 shrink-0 text-leaf-600" />
                {t}
              </li>
            ))}
          </ul>
        </section>
      </div>
    </div>
  );
}
