import Image from "next/image";
import Link from "next/link";
import { Mail, MapPin, Phone } from "lucide-react";

import { org, programs } from "@/content/site";
import { SocialIcon } from "@/components/social-icon";

const explore = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about" },
  { label: "Signature Programs", href: "/programs" },
  { label: "Strategic Partnerships", href: "/partnerships" },
  { label: "Donate", href: "/donate" },
  { label: "Contact", href: "/contact" },
];

export function SiteFooter() {
  return (
    <footer className="on-dark relative overflow-hidden bg-navy-950 text-white/80">
      {/* Decorative county-grid motif echoing the logo's building mark */}
      <svg
        aria-hidden
        className="pointer-events-none absolute -bottom-10 -left-16 size-80 text-white/[0.03]"
        viewBox="0 0 200 200"
        fill="currentColor"
      >
        <rect x="20" y="40" width="40" height="140" rx="4" />
        <rect x="70" y="10" width="40" height="170" rx="4" />
        <rect x="120" y="70" width="60" height="110" rx="4" />
      </svg>

      <div className="container-site relative grid gap-12 py-16 md:grid-cols-2 lg:grid-cols-[1.3fr_0.8fr_1fr_1.5fr] lg:py-20">
        <div>
          <Link href="/" aria-label={`${org.short} home`} className="inline-block">
            <Image src="/logo-pgccdc-white.png" alt="" width={314} height={105} className="h-14 w-auto" />
          </Link>
          <p className="mt-6 max-w-sm text-[0.9375rem] leading-relaxed">{org.summary}</p>
          <p className="mt-6 font-display text-xl italic text-gold-300">{org.motto}</p>
        </div>

        <nav aria-label="Footer">
          <h2 className="eyebrow text-white">Explore</h2>
          <ul className="mt-5 space-y-1">
            {explore.map((l) => (
              <li key={l.href}>
                <Link href={l.href} className="inline-flex min-h-10 items-center hover:text-gold-300">
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div>
          <h2 className="eyebrow text-white">Programs</h2>
          <ul className="mt-5 space-y-1">
            {programs.map((p) => (
              <li key={p.slug}>
                <Link href={p.href} className="inline-flex min-h-10 items-center hover:text-gold-300">
                  {p.title}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h2 className="eyebrow text-white">Get in touch</h2>
          <address className="mt-5 space-y-4 not-italic">
            <p className="flex gap-3">
              <MapPin aria-hidden className="mt-1 size-4 shrink-0 text-gold-300" />
              <span>
                {org.address.line1}
                <br />
                {org.address.line2}
              </span>
            </p>
            <p className="flex gap-3">
              <Phone aria-hidden className="mt-1 size-4 shrink-0 text-gold-300" />
              <a href={org.phoneHref} className="hover:text-gold-300">
                {org.phone}
              </a>
            </p>
            <p className="flex gap-3">
              <Mail aria-hidden className="mt-1 size-4 shrink-0 text-gold-300" />
              <a href={`mailto:${org.email}`} className="[overflow-wrap:anywhere] hover:text-gold-300">
                {org.email}
              </a>
            </p>
          </address>
          <ul className="mt-6 flex gap-2" aria-label="Social media">
            {org.social.map((s) => (
              <li key={s.label}>
                <a
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex size-11 items-center justify-center rounded-full border border-white/20 transition hover:border-gold-300 hover:bg-white/5 hover:text-gold-300"
                >
                  <SocialIcon name={s.label} className="size-[1.125rem]" />
                  <span className="sr-only">{s.label} (opens in a new tab)</span>
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="border-t border-white/10">
        <div className="container-site flex flex-col gap-2 py-6 text-sm text-white/65 sm:flex-row sm:items-center sm:justify-between">
          <p>© 2026 {org.name}. All rights reserved.</p>
          <p>Serving every municipality in Prince George&apos;s County, Maryland.</p>
        </div>
      </div>
    </footer>
  );
}
