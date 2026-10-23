import type { Metadata } from "next";
import Image from "next/image";
import { ChevronDown, CreditCard, HandHeart, Mail, Megaphone, PenLine, Phone } from "lucide-react";

import { org } from "@/content/site";
import { ButtonLink, Eyebrow, PageHero, SectionHeader } from "@/components/ui";
import { CopyButton } from "@/components/copy-button";

import fatherDaughter from "@/assets/img/father-daughter.webp";
import familyCooking from "@/assets/img/family-cooking.webp";
import entrepreneurCoaching from "@/assets/img/entrepreneur-coaching.webp";
import communityMeeting from "@/assets/img/community-meeting.webp";

export const metadata: Metadata = {
  title: "Donate",
  description:
    "Support PGCCDC's work in Prince George's County. Give by check, or contact us about other ways to give.",
};

const payee = org.name;
const mailing = `${org.short}\n${org.address.line1}\n${org.address.line2}`;

const impact = [
  { title: "Health & nutrition", text: "Health education, fitness programming and fresh, local food for families.", image: familyCooking, alt: "A family cooking a healthy meal together" },
  { title: "Economic opportunity", text: "Coaching first-time entrepreneurs and opening doors to good local jobs.", image: entrepreneurCoaching, alt: "Women reviewing a business plan together" },
  { title: "A voice for residents", text: "Bringing neighbors into the conversations that shape county programs and policy.", image: communityMeeting, alt: "Residents in a community discussion" },
];

const faqs = [
  {
    q: "Who should I make my check payable to?",
    a: `Please make checks payable to “${payee}” and mail them to ${org.address.line1}, ${org.address.line2}.`,
  },
  {
    q: "Will I receive an acknowledgment of my gift?",
    a: "Yes. Include your name, mailing address and email with your check, and we'll send an acknowledgment for your records.",
  },
  {
    q: "Can I support a specific program?",
    a: "Absolutely. Write the program name, for example “Health & Wellness” or “Muzik Xpose' Radio”, on the memo line of your check.",
  },
  {
    q: "Is my donation tax-deductible?",
    a: `Please contact us at ${org.phone} or ${org.email} for tax information about your gift.`,
  },
];

export default function DonatePage() {
  return (
    <>
      <PageHero
        eyebrow="Donate"
        title={
          <>
            Invest in the neighborhoods <span className="italic text-gold-300">you call home.</span>
          </>
        }
        intro="Your gift keeps our programs free and close to home for Prince George's County residents. We stand for a better future, and we thrive with you."
        image={fatherDaughter}
        alt="A father hugging his laughing daughter"
        position="center 35%"
      />

      {/* Ways to give */}
      <section aria-labelledby="ways-title" className="section-y bg-white">
        <div className="container-site">
          <SectionHeader id="ways-title" eyebrow="Ways to give" title="Choose how you'd like to give." />

          <div className="mt-12 grid gap-6 lg:grid-cols-12">
            {/* Check: primary */}
            <article data-reveal className="relative self-start overflow-hidden rounded-[var(--radius-xl)] border-2 border-navy-900 bg-cream lg:col-span-7">
              <div className="flex items-center gap-3 bg-navy-900 px-8 py-4 text-white">
                <PenLine aria-hidden className="size-5 text-gold-300" />
                <h3 className="font-display text-xl font-medium">Give by check</h3>
                <span className="ml-auto rounded-full bg-gold-500 px-3 py-1 text-xs font-bold uppercase tracking-wider text-navy-950">
                  Preferred
                </span>
              </div>
              <div className="grid gap-8 p-8 md:grid-cols-2 md:p-10">
                <div>
                  <p className="eyebrow text-blue-700">Make checks payable to</p>
                  <p className="mt-2 font-display text-xl font-medium leading-snug text-navy-900">{payee}</p>
                  <p className="eyebrow mt-7 text-blue-700">Memo (optional)</p>
                  <p className="mt-2 text-ink-soft">The program you&apos;d like to support</p>
                </div>
                <div>
                  <p className="eyebrow text-blue-700">Mail to</p>
                  <address className="mt-2 text-lg not-italic leading-relaxed text-navy-900">
                    {org.short}
                    <br />
                    {org.address.line1}
                    <br />
                    {org.address.line2}
                  </address>
                  <div className="mt-5">
                    <CopyButton text={mailing} label="Copy address" />
                  </div>
                </div>
              </div>
              <p className="border-t border-line px-8 py-5 text-sm text-ink-soft md:px-10">
                Please include your name, address and email so we can acknowledge your gift.
              </p>
              {/* Decorative check perforation */}
              <span aria-hidden className="absolute inset-y-0 right-0 w-3 bg-[radial-gradient(circle_at_100%_50%,#fff_5px,transparent_6px)] bg-[length:12px_18px]" />
            </article>

            <div className="grid gap-6 lg:col-span-5">
              <article data-reveal style={{ "--reveal-delay": "100ms" } as React.CSSProperties} className="rounded-[var(--radius-xl)] border border-line p-8">
                <div className="flex items-center gap-3">
                  <span className="flex size-12 items-center justify-center rounded-2xl bg-blue-50 text-blue-700">
                    <CreditCard aria-hidden className="size-5" />
                  </span>
                  <h3 className="font-display text-xl font-medium text-navy-900">Give online</h3>
                  <span className="ml-auto rounded-full bg-sand px-3 py-1 text-xs font-bold uppercase tracking-wider text-ink-soft">Coming soon</span>
                </div>
                <p className="mt-4 text-ink-soft">
                  Secure online giving is on the way. In the meantime, call us to arrange your gift.
                </p>
                <a href={org.phoneHref} className="mt-4 inline-flex min-h-11 items-center gap-2 font-bold text-blue-700 hover:underline">
                  <Phone aria-hidden className="size-4" /> {org.phone}
                </a>
              </article>
              <article data-reveal style={{ "--reveal-delay": "200ms" } as React.CSSProperties} className="rounded-[var(--radius-xl)] border border-line p-8">
                <div className="flex items-center gap-3">
                  <span className="flex size-12 items-center justify-center rounded-2xl bg-gold-100 text-gold-600">
                    <HandHeart aria-hidden className="size-5" />
                  </span>
                  <h3 className="font-display text-xl font-medium text-navy-900">Give time or expertise</h3>
                </div>
                <p className="mt-4 text-ink-soft">Volunteer, mentor an entrepreneur or share your professional skills.</p>
                <ButtonLink href="/contact" variant="ghost" className="mt-2">
                  Get in touch
                </ButtonLink>
              </article>
              <article data-reveal style={{ "--reveal-delay": "300ms" } as React.CSSProperties} className="rounded-[var(--radius-xl)] border border-line p-8">
                <div className="flex items-center gap-3">
                  <span className="flex size-12 items-center justify-center rounded-2xl bg-plum-800 text-gold-300">
                    <Megaphone aria-hidden className="size-5" />
                  </span>
                  <h3 className="font-display text-xl font-medium text-navy-900">Sponsor a program</h3>
                </div>
                <p className="mt-4 text-ink-soft">Businesses can sponsor a program or Muzik Xpose&apos; Radio programming.</p>
                <ButtonLink href={org.emailHref} variant="ghost" className="mt-2">
                  Email us
                </ButtonLink>
              </article>
            </div>
          </div>
        </div>
      </section>

      {/* Impact */}
      <section aria-labelledby="impact-title" className="section-y grain bg-sand">
        <div className="container-site">
          <SectionHeader id="impact-title" eyebrow="Your impact" title="Where your gift goes." align="center" />
          <ul className="mt-12 grid gap-6 md:grid-cols-3">
            {impact.map((i, idx) => (
              <li key={i.title} data-reveal style={{ "--reveal-delay": `${idx * 100}ms` } as React.CSSProperties} className="overflow-hidden rounded-[var(--radius-lg)] bg-white shadow-[var(--shadow-soft)]">
                <div className="relative aspect-[4/3]">
                  <Image src={i.image} alt={i.alt} fill placeholder="blur" sizes="(min-width:768px) 33vw, 100vw" className="object-cover" />
                </div>
                <div className="p-7">
                  <h3 className="font-display text-xl font-medium text-navy-900">{i.title}</h3>
                  <p className="mt-2 text-ink-soft">{i.text}</p>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* FAQ */}
      <section aria-labelledby="faq-title" className="section-y bg-white">
        <div className="container-site grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-4" data-reveal>
            <Eyebrow>Questions</Eyebrow>
            <h2 id="faq-title" className="text-h2 mt-4 font-medium text-navy-900">Giving FAQs</h2>
            <p className="mt-4 text-ink-soft">Can&apos;t find your answer? We&apos;re happy to help.</p>
            <a href={org.emailHref} className="mt-6 inline-flex min-h-12 items-center gap-2 rounded-full bg-navy-900 px-6 font-bold text-white hover:bg-blue-600">
              <Mail aria-hidden className="size-4" /> Ask a question
            </a>
          </div>
          <div className="divide-y divide-line border-y border-line lg:col-span-8">
            {faqs.map((f) => (
              <details key={f.q} className="group py-2" data-reveal>
                <summary className="flex min-h-14 cursor-pointer list-none items-center justify-between gap-6 font-display text-xl font-medium text-navy-900 [&::-webkit-details-marker]:hidden">
                  {f.q}
                  <ChevronDown aria-hidden className="size-5 shrink-0 text-blue-700 transition-transform duration-300 group-open:rotate-180" />
                </summary>
                <p className="pb-5 pr-10 text-ink-soft">{f.a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
