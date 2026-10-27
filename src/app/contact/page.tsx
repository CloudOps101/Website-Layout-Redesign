import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Heart, Mail, MapPin, Phone, User } from "lucide-react";

import { org } from "@/content/site";
import { ContactForm } from "@/components/contact-form";
import { SocialIcon } from "@/components/social-icon";

export const metadata: Metadata = {
  alternates: { canonical: "/contact" },
  title: "Contact",
  description: `Get in touch with ${org.short}. ${org.address.line1}, ${org.address.line2}. ${org.phone}.`,
};

export default function ContactPage() {
  return (
    <>
      <section aria-labelledby="contact-title" className="grain relative overflow-hidden bg-cream">
        <div aria-hidden className="absolute -right-32 -top-32 size-[28rem] rounded-full bg-blue-100/80 blur-3xl" />
        <div className="container-site relative pb-12 pt-14 md:pb-16 md:pt-20 lg:pb-28">
          <nav aria-label="Breadcrumb" className="mb-8 text-sm text-ink-soft">
            <ol className="flex gap-2">
              <li>
                <Link href="/" className="hover:text-navy-900">
                  Home
                </Link>
              </li>
              <li aria-hidden>/</li>
              <li aria-current="page" className="text-navy-900">
                Contact
              </li>
            </ol>
          </nav>
          <p className="eyebrow text-blue-700">Get in touch</p>
          <h1 id="contact-title" className="text-h1 mt-4 max-w-3xl font-medium text-navy-900">
            We would love to <span className="mark-gold italic">hear from you.</span>
          </h1>
          <p className="text-lead mt-5 max-w-2xl text-ink-soft">
            If you have any questions or comments, please contact us via email or phone, or send us a message using
            the form below.
          </p>
        </div>
      </section>

      <section aria-label="Contact details and form" className="bg-white pb-20 pt-8 md:pb-28 lg:pt-0">
        <div className="container-site grid gap-10 lg:grid-cols-12 lg:gap-14">
          {/* Details */}
          <aside className="relative z-10 space-y-5 lg:col-span-5 lg:-mt-16">
            <div className="on-dark rounded-[var(--radius-xl)] bg-navy-900 p-8 text-white shadow-[var(--shadow-lift)] ring-1 ring-white/10 md:p-10">
              <div className="flex items-center gap-4">
                <span className="flex size-14 items-center justify-center rounded-full bg-gold-500 font-display text-lg font-semibold text-navy-950">
                  <User aria-hidden className="size-6" />
                </span>
                <div>
                  <p className="font-display text-2xl">{org.contactName}</p>
                  <p className="text-white/75">{org.contactRole}</p>
                </div>
              </div>
              <ul className="mt-8 space-y-5">
                <li>
                  <a href={org.phoneHref} className="group flex items-center gap-4">
                    <span className="flex size-11 items-center justify-center rounded-xl bg-white/10 text-gold-300">
                      <Phone aria-hidden className="size-5" />
                    </span>
                    <span>
                      <span className="block text-sm text-white/70">Call</span>
                      <span className="block font-semibold group-hover:text-gold-300">{org.phone}</span>
                    </span>
                  </a>
                </li>
                <li>
                  <a href={`mailto:${org.email}`} className="group flex items-center gap-4">
                    <span className="flex size-11 shrink-0 items-center justify-center rounded-xl bg-white/10 text-gold-300">
                      <Mail aria-hidden className="size-5" />
                    </span>
                    <span className="min-w-0">
                      <span className="block text-sm text-white/70">Email</span>
                      <span className="block font-semibold [overflow-wrap:anywhere] group-hover:text-gold-300">
                        {org.email.split("@")[0]}@<wbr />
                        {org.email.split("@")[1]}
                      </span>
                    </span>
                  </a>
                </li>
                <li className="flex items-center gap-4">
                  <span className="flex size-11 shrink-0 items-center justify-center rounded-xl bg-white/10 text-gold-300">
                    <MapPin aria-hidden className="size-5" />
                  </span>
                  <address className="not-italic">
                    <span className="block text-sm text-white/70">Address</span>
                    <span className="block font-semibold">
                      {org.address.line1}, {org.address.line2}
                    </span>
                  </address>
                </li>
              </ul>
              <ul className="mt-8 flex gap-2 border-t border-white/10 pt-6" aria-label="Social media">
                {org.social.map((s) => (
                  <li key={s.label}>
                    <a href={s.href} target="_blank" rel="noopener noreferrer" className="inline-flex size-11 items-center justify-center rounded-full border border-white/20 hover:border-gold-300 hover:text-gold-300">
                      <SocialIcon name={s.label} className="size-[1.125rem]" />
                      <span className="sr-only">{s.label} (opens in a new tab)</span>
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            <Link
              href="/donate"
              className="group flex items-center justify-between gap-4 rounded-[var(--radius-xl)] border-2 border-gold-500 bg-gold-100 p-7 transition hover:bg-gold-300"
            >
              <span className="flex items-center gap-4">
                <Heart aria-hidden className="size-7 text-gold-600" />
                <span>
                  <span className="block font-display text-xl font-medium text-navy-900">Make a donation</span>
                  <span className="block text-sm text-ink-soft">Give by check or explore other ways to give.</span>
                </span>
              </span>
              <ArrowRight aria-hidden className="size-5 text-navy-900 transition group-hover:translate-x-1" />
            </Link>

            <div className="overflow-hidden rounded-[var(--radius-xl)] border border-line">
              <iframe
                title={`Map showing ${org.address.line1}, ${org.address.line2}`}
                src={`https://maps.google.com/maps?q=${encodeURIComponent(org.mapQuery)}&z=14&output=embed`}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="block h-72 w-full"
              />
            </div>
          </aside>

          {/* Form */}
          <div className="pt-4 lg:col-span-7 lg:pt-12">
            <h2 className="text-h2 font-medium text-navy-900">Send us a message</h2>
            <p className="mt-3 text-ink-soft">Partners, residents, media and donors are all welcome. We&apos;ll reply as soon as we can.</p>
            <div className="mt-8">
              <ContactForm />
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
