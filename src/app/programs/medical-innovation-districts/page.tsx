import type { Metadata } from "next";
import Image from "next/image";
import { Building2, Check, GraduationCap, HeartPulse, MonitorSmartphone, Recycle, Users } from "lucide-react";

import { CtaBand, Eyebrow, PageHero, SectionHeader } from "@/components/ui";

import medicalTeam from "@/assets/img/medical-team.webp";
import nursePortrait from "@/assets/img/nurse-portrait.webp";

export const metadata: Metadata = {
  title: "Medical Innovation Districts",
  description:
    "A Medical Innovation District would bring a 200-bed healthcare hub, free workforce training and 2,430+ career-level jobs with local hiring to Prince George's County.",
};

const components = [
  {
    icon: Building2,
    title: "Healthcare Hub",
    text: "A 200-bed hospital and specialty clinics serving 125,000+ underserved residents.",
  },
  {
    icon: GraduationCap,
    title: "Free Workforce Training",
    text: "Trains 1,200 residents annually in tech and healthcare, with guaranteed interviews.",
  },
  {
    icon: MonitorSmartphone,
    title: "Last-Mile AI Clinics",
    text: "A network of 9 small community computing and training centers.",
  },
  {
    icon: Recycle,
    title: "Waste-to-Energy Power",
    text: "An on-site facility converts 300 tons of daily trash into clean hydrogen fuel.",
  },
];

export default function MidPage() {
  return (
    <>
      <PageHero
        eyebrow="Medical Innovation Districts"
        title={
          <>
            Health care, careers and clean energy, <span className="italic text-gold-300">close to home.</span>
          </>
        }
        intro="PGCCDC champions a Medical Innovation District (MID) in Prince George's County: a healthcare hub, free workforce training and career-level jobs for local residents, powered by clean, on-site energy."
        image={medicalTeam}
        alt="A team of doctors and nurses walking down a bright hospital corridor"
        crumbs={[{ label: "Signature Programs", href: "/programs" }]}
      />

      {/* Key numbers */}
      <section aria-label="Key figures" className="relative z-10 -mt-10 md:-mt-14">
        <div className="container-site">
          <dl className="grid overflow-hidden rounded-[var(--radius-lg)] bg-white shadow-[var(--shadow-lift)] sm:grid-cols-2 lg:grid-cols-4">
            {[
              ["2,430+", "direct jobs with mandated local hiring"],
              ["$76M", "projected annual tax revenue"],
              ["1,200", "residents trained free every year"],
              ["125,000+", "underserved residents served"],
            ].map(([n, l], i) => (
              <div key={l} className={`p-7 md:p-8 ${i ? "border-t border-line sm:border-t-0 sm:border-l" : ""}`}>
                <dt className="sr-only">{l}</dt>
                <dd>
                  <span className="block font-display text-4xl font-semibold text-navy-900 md:text-5xl">{n}</span>
                  <span className="mt-2 block text-ink-soft">{l}</span>
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      {/* What the MID delivers */}
      <section aria-labelledby="delivers-title" className="section-y bg-white">
        <div className="container-site grid gap-12 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-5">
            <SectionHeader
              id="delivers-title"
              eyebrow="What the MID delivers"
              title="Good jobs and better care, built around residents."
              intro="A Medical Innovation District brings health care, training and career-level jobs into the heart of the community, with hiring commitments that keep opportunity local."
            />
            <dl data-reveal className="mt-10 grid grid-cols-2 gap-4">
              {[
                ["75%", "of hires from Prince George's County"],
                ["40%", "of hires from Landover"],
              ].map(([n, l]) => (
                <div key={l} className="rounded-2xl bg-blue-50 p-5">
                  <dt className="sr-only">{l}</dt>
                  <dd>
                    <span className="block font-display text-4xl font-semibold text-blue-700">{n}</span>
                    <span className="mt-1 block text-sm leading-snug text-ink-soft">{l}</span>
                  </dd>
                </div>
              ))}
            </dl>
          </div>
          <article
            data-reveal
            style={{ "--reveal-delay": "120ms" } as React.CSSProperties}
            className="on-dark relative overflow-hidden rounded-[var(--radius-xl)] bg-navy-900 p-8 text-white md:p-10 lg:col-span-7"
          >
            <div aria-hidden className="absolute -right-16 -top-16 size-56 rounded-full bg-gold-500/20 blur-3xl" />
            <div className="relative flex items-center gap-4">
              <span className="flex size-14 items-center justify-center rounded-2xl bg-gold-500 text-navy-950">
                <HeartPulse aria-hidden className="size-6" />
              </span>
              <div>
                <p className="eyebrow text-gold-300">At a glance</p>
                <h3 className="font-display text-2xl font-medium">Medical Innovation District</h3>
              </div>
            </div>
            <ul className="relative mt-8 space-y-5">
              <Fact light n="2,430+" t="direct jobs created" d="Career-level jobs with mandated local hiring: 40% Landover, 75% Prince George's County." />
              <Fact light n="$76M" t="projected annual tax revenue" d="New revenue for Prince George's County." />
              <Fact light n="200-bed" t="healthcare hub" d="A hospital and specialty clinics serving 125,000+ underserved residents." />
              <Fact light n="All 14" t="County AI Task Force recommendations" d="A community-centered solution that aligns with every recommendation." />
            </ul>
          </article>
        </div>
      </section>

      {/* Components */}
      <section aria-labelledby="components-title" className="section-y grain bg-sand">
        <div className="container-site">
          <SectionHeader
            id="components-title"
            eyebrow="Key components of the MID"
            title="What a Medical Innovation District brings home."
          />
          <ul className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {components.map((c, i) => (
              <li
                key={c.title}
                data-reveal
                style={{ "--reveal-delay": `${i * 90}ms` } as React.CSSProperties}
                className="rounded-[var(--radius-lg)] border border-line bg-white p-7 transition duration-500 hover:-translate-y-1 hover:border-gold-500 hover:shadow-[var(--shadow-lift)]"
              >
                <span className="flex size-14 items-center justify-center rounded-2xl bg-gold-100 text-gold-600">
                  <c.icon aria-hidden className="size-6" />
                </span>
                <h3 className="mt-6 font-display text-xl font-medium text-navy-900">{c.title}</h3>
                <p className="mt-2 text-[0.9375rem] text-ink-soft">{c.text}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Community */}
      <section aria-labelledby="community-title" className="section-y bg-cream">
        <div className="container-site grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
          <div className="relative" data-reveal>
            <div className="relative aspect-[4/5] overflow-hidden rounded-[var(--radius-xl)]">
              <Image src={nursePortrait} alt="A smiling healthcare worker in scrubs" fill placeholder="blur" sizes="(min-width:1024px) 45vw, 100vw" className="object-cover" />
            </div>
            <div className="absolute -bottom-6 right-4 max-w-xs rounded-2xl bg-white p-5 shadow-[var(--shadow-lift)] md:right-8">
              <div className="flex items-center gap-3">
                <Users aria-hidden className="size-5 text-blue-700" />
                <p className="font-semibold text-navy-900">75% local hiring</p>
              </div>
              <p className="mt-1 text-sm text-ink-soft">of MID jobs reserved for Prince George&apos;s County residents.</p>
            </div>
          </div>
          <div data-reveal style={{ "--reveal-delay": "120ms" } as React.CSSProperties}>
            <Eyebrow>A community-centered solution</Eyebrow>
            <h2 id="community-title" className="text-h2 mt-5 font-medium text-navy-900">
              Careers, care and clean power, <span className="italic text-blue-600">for the people who live here.</span>
            </h2>
            <p className="text-lead mt-5 text-ink-soft">
              Every part of the MID is designed with residents in mind, so the benefits stay in Prince George&apos;s
              County.
            </p>
            <ul className="mt-8 space-y-4">
              {[
                "Career-level jobs with mandated local hiring commitments",
                "A hospital and specialty clinics for neighborhoods that need them most",
                "Free tech and healthcare training that leads to guaranteed interviews",
                "Clean hydrogen fuel made on-site from 300 tons of daily waste",
              ].map((t) => (
                <li key={t} className="flex gap-3 text-lg text-navy-900">
                  <Check aria-hidden className="mt-1.5 size-5 shrink-0 text-leaf-600" />
                  {t}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* Video */}
      <section aria-labelledby="video-title" className="section-y bg-white">
        <div className="container-site">
          <div className="mx-auto max-w-4xl text-center" data-reveal>
            <Eyebrow className="justify-center">Watch</Eyebrow>
            <h2 id="video-title" className="text-h2 mt-4 font-medium text-navy-900">
              The MID story, in motion.
            </h2>
          </div>
          <div data-reveal className="on-dark relative mx-auto mt-10 flex aspect-video max-w-5xl items-center justify-center overflow-hidden rounded-[var(--radius-xl)] bg-navy-950 text-center text-white">
            <Image src={medicalTeam} alt="" fill placeholder="blur" sizes="(min-width:1024px) 64rem, 100vw" className="object-cover opacity-30" />
            <div className="relative px-6">
              <p className="eyebrow text-gold-300">Video coming soon</p>
              <p className="mx-auto mt-3 max-w-md font-display text-2xl md:text-3xl">
                Our Medical Innovation District video will appear here.
              </p>
            </div>
          </div>
        </div>
      </section>

      <CtaBand title="Stand with the Medical Innovation District." text="Partners, residents and officials: help us build a healthier, more prosperous future for Prince George's County." />
    </>
  );
}

function Fact({ n, t, d, light }: { n: string; t: string; d?: string; light?: boolean }) {
  return (
    <li className={`border-t pt-5 ${light ? "border-white/15" : "border-line"}`}>
      <p className="flex flex-wrap items-baseline gap-x-3">
        <span className={`font-display text-3xl font-semibold ${light ? "text-gold-300" : "text-navy-900"}`}>{n}</span>
        <span className={`font-semibold ${light ? "text-white" : "text-navy-900"}`}>{t}</span>
      </p>
      {d && <p className={`mt-1 text-[0.9375rem] ${light ? "text-white/75" : "text-ink-soft"}`}>{d}</p>}
    </li>
  );
}
