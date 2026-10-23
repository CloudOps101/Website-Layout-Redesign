import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Briefcase, Building, Check, HeartPulse, Landmark, Users } from "lucide-react";

import { ButtonLink, CtaBand, Eyebrow, PageHero, SectionHeader } from "@/components/ui";

import teamHands from "@/assets/img/team-hands.webp";
import naiaLogo from "@/assets/img/naia-logo.webp";
import naiaFlyer from "@/assets/img/naia-flyer.webp";
import techLearning from "@/assets/img/tech-learning.webp";
import deepRootsLogo from "@/assets/img/deep-roots-logo.webp";
import organicStand from "@/assets/img/organic-stand.webp";
import montyRoss from "@/assets/img/monty-ross.webp";
import muzikLogo from "@/assets/img/muzik-xpose-logo.webp";

export const metadata: Metadata = {
  title: "Strategic Partnerships",
  description:
    "PGCCDC partners with organizations that share our commitment to healthier, more prosperous neighborhoods in Prince George's County.",
};

const partnerTypes = [
  { icon: Landmark, title: "Government", text: "County and municipal agencies shaping policy and services." },
  { icon: Briefcase, title: "Business", text: "Employers and entrepreneurs investing in local talent." },
  { icon: HeartPulse, title: "Health & recreation", text: "Clinics, hospitals and rec centers delivering care and fitness." },
  { icon: Users, title: "Community groups", text: "Faith, civic and neighborhood organizations on the ground." },
];

export default function PartnershipsPage() {
  return (
    <>
      <PageHero
        eyebrow="Strategic Partnerships"
        title={
          <>
            Stronger together, <span className="italic text-gold-300">for the county we share.</span>
          </>
        }
        intro="Let's work together to formulate strategies that will yield and foster communal relationships between government, business, and community."
        image={teamHands}
        alt="Partners joining hands in celebration"
      >
        <ButtonLink href="/contact" variant="gold">
          Become a partner
        </ButtonLink>
      </PageHero>

      {/* Partner index */}
      <nav aria-label="Partners on this page" className="border-b border-line bg-white">
        <ul className="container-site flex gap-2 overflow-x-auto py-4 text-sm font-semibold">
          {[
            ["Deep Roots Farm", "#deep-roots-farm"],
            ["The National AI Academy", "#naia"],
            ["Filmmaker-in-Residence", "#artist"],
            ["Muzik Xpose' Radio", "#radio"],
            ["Partner with us", "#partner"],
          ].map(([l, h]) => (
            <li key={h} className="shrink-0">
              <a href={h} className="inline-flex min-h-11 items-center rounded-full border border-line px-4 text-navy-900 hover:border-blue-600 hover:text-blue-700">
                {l}
              </a>
            </li>
          ))}
        </ul>
      </nav>

      {/* Deep Roots Farm */}
      <section id="deep-roots-farm" aria-labelledby="drf-title" className="section-y scroll-mt-24 bg-white">
        <div className="container-site grid items-center gap-12 lg:grid-cols-2 lg:gap-20">
          <div className="relative" data-reveal>
            <div className="relative aspect-[5/4] overflow-hidden rounded-[var(--radius-xl)]">
              <Image src={organicStand} alt="A farm stand with fresh organic vegetables and a chalkboard sign" fill placeholder="blur" sizes="(min-width:1024px) 45vw, 100vw" className="object-cover" />
            </div>
            <Image src={deepRootsLogo} alt="" placeholder="blur" sizes="112px" className="absolute -bottom-8 left-6 size-28 rounded-full border-4 border-white object-cover shadow-[var(--shadow-lift)]" />
          </div>
          <div data-reveal style={{ "--reveal-delay": "120ms" } as React.CSSProperties}>
            <Eyebrow>Food access partner</Eyebrow>
            <h2 id="drf-title" className="text-h2 mt-4 font-medium text-navy-900">Deep Roots Farm</h2>
            <p className="mt-2 font-display text-xl italic text-leaf-700">
              Farm to Table Initiative to Address Food Deserts in Prince George&apos;s County
            </p>
            <p className="mt-5 text-lg text-ink-soft">
              A regenerative, Black woman-owned farm on 53 acres in Upper Marlboro, Deep Roots Farm grows vegetables,
              herbs, fruit and flowers and raises chickens for our community. Together we bring fresh, locally sourced
              food to neighborhoods that need it most.
            </p>
            <ul className="mt-6 space-y-2.5">
              {["Organic, regeneratively grown produce", "Nutrition education with our health programs", "Harvested to order to reduce waste"].map((t) => (
                <li key={t} className="flex gap-3 text-navy-900">
                  <Check aria-hidden className="mt-1 size-4 shrink-0 text-leaf-600" /> {t}
                </li>
              ))}
            </ul>
            <div className="mt-8 flex flex-wrap gap-3">
              <ButtonLink href="https://www.deeprootsfarm.us/" external>
                deeprootsfarm.us
              </ButtonLink>
              <ButtonLink href="/programs/health-wellness-fitness#nutrition" variant="outline">
                Our nutrition work
              </ButtonLink>
            </div>
          </div>
        </div>
      </section>

      {/* NAIA */}
      <section id="naia" aria-labelledby="naia-title" className="section-y grain scroll-mt-24 bg-sand">
        <div className="container-site">
          <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
            <div className="lg:col-span-7" data-reveal>
              <Eyebrow>Workforce &amp; education partner</Eyebrow>
              <Image src={naiaLogo} alt="The National AI Academy" placeholder="blur" sizes="320px" className="mt-6 h-20 w-auto mix-blend-multiply" />
              <h2 id="naia-title" className="sr-only">
                The National AI Academy
              </h2>
              <p className="mt-6 font-display text-2xl leading-snug text-navy-900 md:text-3xl">
                “Building AI literacy. Building equitable ecosystems. Advancing America&apos;s future.”
              </p>
              <p className="mt-6 text-lg text-ink-soft">
                The National AI Academy (NAIA) has a national mission to build equitable and impactful AI ecosystems,
                advancing responsible innovation that strengthens communities and expands access to opportunity.
              </p>
              <div className="mt-8 grid gap-4 sm:grid-cols-2">
                <div className="rounded-2xl bg-white p-6">
                  <h3 className="font-display text-lg font-medium text-navy-900">Their solutions</h3>
                  <ul className="mt-3 space-y-2 text-[0.9375rem] text-ink-soft">
                    {["Customized, self-paced eLearning", "Virtual/augmented reality vocational training", "AI health services", "Sustainable last-mile AI clinics", "Clean energy"].map((s) => (
                      <li key={s} className="flex gap-2">
                        <Check aria-hidden className="mt-1 size-4 shrink-0 text-blue-700" /> {s}
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="relative min-h-[14rem] overflow-hidden rounded-2xl">
                  <Image src={techLearning} alt="Two adults learning together at a computer" fill placeholder="blur" sizes="(min-width:1024px) 22vw, 100vw" className="object-cover" />
                </div>
              </div>
              <p className="mt-6 text-sm text-ink-soft">
                Partner profile. Program details are provided by The National AI Academy; learn more at{" "}
                <a href="https://www.nationalai-academy.com" target="_blank" rel="noopener noreferrer" className="font-semibold text-blue-700 underline underline-offset-4">
                  nationalai-academy.com<span className="sr-only"> (opens in a new tab)</span>
                </a>
                .
              </p>
            </div>
            <div className="lg:col-span-5" data-reveal style={{ "--reveal-delay": "120ms" } as React.CSSProperties}>
              <figure className="overflow-hidden rounded-[var(--radius-lg)] bg-white shadow-[var(--shadow-lift)] lg:sticky lg:top-28">
                <Image src={naiaFlyer} alt="The National AI Academy flyer outlining its mission and solutions" placeholder="blur" sizes="(min-width:1024px) 34vw, 100vw" className="w-full" />
                <figcaption className="p-4 text-sm text-ink-soft">NAIA program flyer</figcaption>
              </figure>
            </div>
          </div>
        </div>
      </section>

      {/* Artist + Radio */}
      <section aria-label="Program partners" className="section-y bg-white">
        <div className="container-site grid gap-6 lg:grid-cols-2">
          <article id="artist" data-reveal className="group scroll-mt-24 overflow-hidden rounded-[var(--radius-xl)] border border-line">
            <div className="grid sm:grid-cols-[12rem_1fr]">
              <div className="relative min-h-[14rem] bg-[#c9c9c9]">
                <Image src={montyRoss} alt="" fill placeholder="blur" sizes="12rem" className="object-cover object-top grayscale" />
              </div>
              <div className="p-7">
                <p className="eyebrow text-blue-700">Filmmaker-in-Residence</p>
                <h2 className="mt-2 font-display text-2xl font-medium text-navy-900">Monty Ross</h2>
                <p className="mt-3 text-ink-soft">
                  Co-founder of 40 Acres &amp; A Mule Filmworks. Monty completed the final edits on our documentary about
                  John “Peterbug” Matthews.
                </p>
                <Link href="/programs/artist-in-residence" className="mt-5 inline-flex min-h-11 items-center gap-2 font-bold text-blue-700 hover:underline">
                  Watch the trailer <ArrowRight aria-hidden className="size-4" />
                </Link>
              </div>
            </div>
          </article>
          <article id="radio" data-reveal style={{ "--reveal-delay": "120ms" } as React.CSSProperties} className="scroll-mt-24 overflow-hidden rounded-[var(--radius-xl)] border border-line">
            <div className="grid sm:grid-cols-[12rem_1fr]">
              <div className="relative min-h-[14rem] bg-plum-800">
                <Image src={muzikLogo} alt="" fill placeholder="blur" sizes="12rem" className="object-contain p-4" />
              </div>
              <div className="p-7">
                <p className="eyebrow text-blue-700">Media partner</p>
                <h2 className="mt-2 font-display text-2xl font-medium text-navy-900">Muzik Xpose&apos; Radio</h2>
                <p className="mt-3 text-ink-soft">
                  The Voice of the County: streaming Black music, news and real talk, and home of the Health Notes
                  podcast.
                </p>
                <Link href="/programs/muzik-xpose-radio" className="mt-5 inline-flex min-h-11 items-center gap-2 font-bold text-blue-700 hover:underline">
                  About the station <ArrowRight aria-hidden className="size-4" />
                </Link>
              </div>
            </div>
          </article>
        </div>
      </section>

      {/* Partner with us */}
      <section id="partner" aria-labelledby="partner-title" className="section-y scroll-mt-24 bg-blue-50">
        <div className="container-site">
          <SectionHeader
            id="partner-title"
            eyebrow="Partner with us"
            title="Who we partner with."
            intro="We're always looking for partners who want to improve health, opportunity and quality of life across Prince George's County."
          />
          <ul className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {partnerTypes.map((p, i) => (
              <li key={p.title} data-reveal style={{ "--reveal-delay": `${i * 90}ms` } as React.CSSProperties} className="rounded-[var(--radius-lg)] bg-white p-7 shadow-[var(--shadow-soft)]">
                <p.icon aria-hidden className="size-7 text-blue-700" />
                <h3 className="mt-5 font-display text-xl font-medium text-navy-900">{p.title}</h3>
                <p className="mt-2 text-[0.9375rem] text-ink-soft">{p.text}</p>
              </li>
            ))}
          </ul>
          <div className="mt-10 flex items-center gap-3" data-reveal>
            <Building aria-hidden className="size-5 text-blue-700" />
            <p className="text-ink-soft">
              Interested? <Link href="/contact" className="font-bold text-blue-700 underline underline-offset-4">Contact our Executive Director</Link> to start the conversation.
            </p>
          </div>
        </div>
      </section>

      <CtaBand />
    </>
  );
}
