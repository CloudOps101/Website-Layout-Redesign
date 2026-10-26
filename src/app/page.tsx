import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  ArrowUpRight,
  Building2,
  HandCoins,
  Handshake,
  HeartHandshake,
  Lightbulb,
  Mail,
  Megaphone,
  Phone,
  Radio,
  Users,
} from "lucide-react";

import { org, pillars, priorities, programs, municipalities } from "@/content/site";
import { ArrowLink, ButtonLink, Eyebrow, SectionHeader } from "@/components/ui";
import { VideoEmbed } from "@/components/video-embed";

import communityMeeting from "@/assets/img/community-meeting.webp";
import gardenPlanting from "@/assets/img/garden-planting.webp";
import doctorChild from "@/assets/img/doctor-child.webp";
import radioStudio from "@/assets/img/radio-studio.webp";
import healthNotes from "@/assets/img/health-notes.webp";
import documentaryPoster from "@/assets/img/documentary-poster.webp";
import naiaLogo from "@/assets/img/naia-logo.webp";
import deepRootsLogo from "@/assets/img/deep-roots-logo.webp";
import muzikLogo from "@/assets/img/muzik-xpose-logo.webp";
import montyRoss from "@/assets/img/monty-ross.webp";

export default function HomePage() {
  return (
    <>
      <Hero />
      <MunicipalityMarquee />
      <Purpose />
      <ProgramsBento />
      <Priorities />
      <MidSpotlight />
      <RadioBand />
      <Documentary />
      <Partners />
      <GetInvolved />
    </>
  );
}

/* -------------------------------------------------------------------------- */

function Hero() {
  return (
    <section aria-labelledby="hero-title" className="grain relative overflow-hidden bg-cream">
      <div
        aria-hidden
        className="absolute -right-40 top-0 h-full w-[60%] rounded-bl-[12rem] bg-gradient-to-b from-blue-100/70 to-blue-50/0 max-lg:hidden"
      />
      <div className="container-site relative grid items-center gap-14 pb-16 pt-12 md:pt-16 lg:grid-cols-12 lg:gap-8 lg:pb-24 lg:pt-20">
        <div className="lg:col-span-6 xl:col-span-6">
          <p className="eyebrow inline-flex items-center gap-2 rounded-full border border-blue-200 bg-white/70 px-4 py-2 text-blue-700 backdrop-blur max-sm:text-[0.6875rem] max-sm:tracking-[0.08em]">
            <Users aria-hidden className="size-4" />
            {org.motto}
          </p>
          <h1 id="hero-title" className="text-display mt-7 font-medium text-navy-900">
            Engagement.
            <br />
            Activism.
            <br />
            <span className="mark-gold italic">Service.</span>
          </h1>
          <p className="text-lead mt-7 max-w-xl text-ink-soft">
            Prince George&apos;s County residents deserve a real voice in decisions about their health, their
            neighborhoods, and their future. We connect neighbors to better health, healthy food and real economic
            opportunity.
          </p>
          <div className="mt-9 flex flex-wrap gap-3">
            <ButtonLink href="/programs">Explore our programs</ButtonLink>
            <ButtonLink href="/contact" variant="outline">
              Partner with us
            </ButtonLink>
          </div>

          <dl className="mt-12 grid max-w-lg grid-cols-3 gap-4 border-t border-line pt-8">
            {[
              ["27", "municipalities served"],
              ["4", "signature programs"],
              ["2,430+", "local jobs proposed"],
            ].map(([n, l]) => (
              <div key={l}>
                <dt className="sr-only">{l}</dt>
                <dd>
                  <span className="block font-display text-3xl font-semibold text-navy-900 md:text-4xl">{n}</span>
                  <span className="mt-1 block text-sm leading-snug text-ink-soft">{l}</span>
                </dd>
              </div>
            ))}
          </dl>
        </div>

        {/* Photo mosaic */}
        <div className="relative lg:col-span-6">
          <div className="relative mx-auto grid max-w-xl grid-cols-6 grid-rows-6 gap-3 sm:gap-4 lg:max-w-none" style={{ aspectRatio: "1 / 1.02" }}>
            <div className="relative col-span-4 col-start-3 row-span-5 row-start-1 overflow-hidden rounded-[var(--radius-xl)] shadow-[var(--shadow-lift)]">
              <Image
                src={communityMeeting}
                alt="Residents of all ages talking together at a community meeting"
                fill
                priority
                placeholder="blur"
                sizes="(min-width: 1024px) 34vw, 70vw"
                className="object-cover object-[40%_center]"
              />
            </div>
            <div className="relative col-span-2 col-start-1 row-span-3 row-start-2 overflow-hidden rounded-[var(--radius-lg)] shadow-[var(--shadow-soft)]">
              <Image
                src={doctorChild}
                alt="A doctor listening to a young patient"
                fill
                placeholder="blur"
                sizes="(min-width: 1024px) 16vw, 32vw"
                className="object-cover object-[30%_center]"
              />
            </div>
            <div className="relative col-span-3 col-start-1 row-span-2 row-start-5 overflow-hidden rounded-[var(--radius-lg)] border-4 border-cream shadow-[var(--shadow-soft)]">
              <Image
                src={gardenPlanting}
                alt="Neighbors planting crops together in a garden"
                fill
                placeholder="blur"
                sizes="(min-width: 1024px) 22vw, 45vw"
                className="object-cover"
              />
            </div>
          </div>

          {/* Floating live radio card */}
          <a
            href={org.listenLive}
            target="_blank"
            rel="noopener noreferrer"
            className="group absolute -bottom-4 right-2 flex items-center gap-3 rounded-2xl border border-line bg-white/95 p-3 pr-5 shadow-[var(--shadow-lift)] backdrop-blur transition hover:-translate-y-1 sm:right-6 lg:-bottom-6"
          >
            <span className="relative flex size-11 items-center justify-center rounded-xl bg-navy-900 text-gold-300">
              <Radio aria-hidden className="size-5" />
              <span className="absolute -right-0.5 -top-0.5 size-3 rounded-full border-2 border-white bg-red-500" />
            </span>
            <span className="leading-tight">
              <span className="block text-xs font-semibold uppercase tracking-wider text-red-600">On air now</span>
              <span className="block font-semibold text-navy-900">Muzik Xpose&apos; Radio</span>
            </span>
            <ArrowUpRight aria-hidden className="size-4 text-blue-700 transition group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            <span className="sr-only">Listen live (opens in a new tab)</span>
          </a>
        </div>
      </div>
    </section>
  );
}

function MunicipalityMarquee() {
  const items = [...municipalities, "and every community in between"];
  return (
    <section aria-label="Communities we serve" className="marquee on-dark overflow-hidden bg-navy-900 py-5 text-white">
      <p className="sr-only">
        We serve communities across Prince George&apos;s County, including {municipalities.join(", ")}.
      </p>
      <div aria-hidden className="marquee-track flex w-max animate-marquee motion-reduce:animate-none">
        {[0, 1].map((dup) => (
          <ul key={dup} className="flex shrink-0 items-center">
            {items.map((m) => (
              <li key={`${dup}-${m}`} className="flex items-center gap-8 px-4 font-display text-xl italic text-white/90 md:text-2xl">
                {m}
                <span className="size-1.5 rounded-full bg-gold-500" />
              </li>
            ))}
          </ul>
        ))}
      </div>
    </section>
  );
}

function Purpose() {
  const icons = [Megaphone, HeartHandshake, Lightbulb];
  return (
    <section aria-labelledby="purpose-title" className="section-y bg-white">
      <div className="container-site">
        <div className="grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-7" data-reveal>
            <Eyebrow>Why we exist</Eyebrow>
            <h2 id="purpose-title" className="text-h2 mt-5 font-medium text-navy-900">
              From Oxon Hill to Laurel, we crisscross the county to make it a better place to live,{" "}
              <span className="italic text-blue-600">for and with</span> our fellow residents.
            </h2>
          </div>
          <div className="lg:col-span-5 lg:pt-14" data-reveal style={{ "--reveal-delay": "120ms" } as React.CSSProperties}>
            <p className="text-lead text-ink-soft">
              PGCCDC operates every day to give residents a real voice in the decisions that shape their community,
              through engagement, empowerment and entrepreneurship, building healthier, stronger neighborhoods from the
              inside out.
            </p>
            <div className="mt-6">
              <ArrowLink href="/about">More about PGCCDC</ArrowLink>
            </div>
          </div>
        </div>

        <ul className="mt-16 grid gap-5 md:grid-cols-3">
          {pillars.map((p, i) => {
            const Icon = icons[i];
            return (
              <li
                key={p.title}
                data-reveal
                style={{ "--reveal-delay": `${i * 100}ms` } as React.CSSProperties}
                className="group relative overflow-hidden rounded-[var(--radius-lg)] border border-line bg-cream p-8 transition duration-500 hover:-translate-y-1 hover:border-blue-200 hover:bg-white hover:shadow-[var(--shadow-lift)]"
              >
                <span className="absolute right-6 top-5 font-display text-6xl font-semibold text-navy-900/[0.06]" aria-hidden>
                  0{i + 1}
                </span>
                <span className="flex size-14 items-center justify-center rounded-2xl bg-navy-900 text-gold-300 transition group-hover:bg-blue-600 group-hover:text-white">
                  <Icon aria-hidden className="size-6" />
                </span>
                <h3 className="text-h3 mt-6 font-medium text-navy-900">{p.title}</h3>
                <p className="mt-3 text-ink-soft">{p.text}</p>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}

function ProgramsBento() {
  const spans = ["lg:col-span-7", "lg:col-span-5", "lg:col-span-5", "lg:col-span-7"];
  return (
    <section aria-labelledby="programs-title" className="section-y grain bg-sand">
      <div className="container-site">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <SectionHeader
            id="programs-title"
            eyebrow="Signature Programs"
            title={
              <>
                Programs built <span className="italic">with</span> the community, not just for it.
              </>
            }
          />
          <div data-reveal>
            <ButtonLink href="/programs" variant="outline">
              All programs
            </ButtonLink>
          </div>
        </div>

        <ul className="mt-12 grid gap-5 lg:grid-cols-12">
          {programs.map((p, i) => (
            <li key={p.slug} className={spans[i]} data-reveal style={{ "--reveal-delay": `${(i % 2) * 120}ms` } as React.CSSProperties}>
              <Link
                href={p.href}
                className="group relative flex h-[24rem] flex-col justify-end overflow-hidden rounded-[var(--radius-lg)] bg-navy-950 p-7 text-white shadow-[var(--shadow-soft)] md:h-[27rem] md:p-9"
              >
                <Image
                  src={p.image}
                  alt=""
                  fill
                  placeholder="blur"
                  sizes="(min-width: 1024px) 50vw, 100vw"
                  className="object-cover opacity-90 transition duration-[1.2s] ease-out group-hover:scale-105"
                />
                <span aria-hidden className="absolute inset-0 bg-gradient-to-t from-navy-950 via-navy-950/55 to-navy-950/0" />
                <span className="relative">
                  <span className="eyebrow inline-block rounded-full bg-white/15 px-3 py-1.5 text-[0.6875rem] text-white backdrop-blur">
                    {p.tag}
                  </span>
                  <span className="text-h3 mt-4 block font-display font-medium md:text-[2.125rem]">{p.title}</span>
                  <span className="mt-3 block max-w-lg text-[0.9375rem] leading-relaxed text-white/85">{p.summary}</span>
                  <span className="mt-5 inline-flex items-center gap-2 font-bold text-gold-300">
                    Learn more
                    <ArrowRight aria-hidden className="size-4 transition-transform group-hover:translate-x-1" />
                  </span>
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

function Priorities() {
  return (
    <section aria-labelledby="priorities-title" className="section-y bg-white">
      <div className="container-site grid gap-12 lg:grid-cols-12">
        <div className="lg:col-span-5">
          <div className="lg:sticky lg:top-32">
            <SectionHeader
              id="priorities-title"
              eyebrow="What we do"
              title={
                <>
                  At PGCCDC, <span className="mark-gold">your priorities</span> matter.
                </>
              }
              intro="Real work, in real neighborhoods. Here is what a week at PGCCDC can look like."
            />
            <div className="mt-8 hidden lg:block" data-reveal>
              <ButtonLink href="/contact">Tell us what matters to you</ButtonLink>
            </div>
          </div>
        </div>
        <ol className="space-y-5 lg:col-span-7">
          {priorities.map((p, i) => (
            <li
              key={p.title}
              data-reveal
              className="group grid overflow-hidden rounded-[var(--radius-lg)] border border-line bg-white transition duration-500 hover:shadow-[var(--shadow-lift)] sm:grid-cols-[13rem_1fr]"
            >
              <div className="relative aspect-[16/9] overflow-hidden sm:aspect-auto">
                <Image
                  src={p.image}
                  alt={p.alt}
                  fill
                  placeholder="blur"
                  sizes="(min-width: 640px) 13rem, 100vw"
                  className="object-cover transition duration-700 group-hover:scale-105"
                />
              </div>
              <div className="p-6 md:p-8">
                <span className="font-display text-sm font-semibold text-blue-700">0{i + 1}</span>
                <h3 className="mt-1 font-display text-2xl font-medium text-navy-900">{p.title}</h3>
                <p className="mt-2 text-ink-soft">{p.text}</p>
              </div>
            </li>
          ))}
        </ol>
        <div className="lg:hidden" data-reveal>
          <ButtonLink href="/contact">Tell us what matters to you</ButtonLink>
        </div>
      </div>
    </section>
  );
}

function MidSpotlight() {
  return (
    <section aria-labelledby="mid-title" className="on-dark section-y relative overflow-hidden bg-navy-950 text-white">
      <div aria-hidden className="absolute -left-40 top-20 size-[30rem] rounded-full bg-blue-600/25 blur-[120px]" />
      <div aria-hidden className="absolute -right-20 bottom-0 size-[24rem] rounded-full bg-gold-500/15 blur-[120px]" />
      <div className="container-site relative grid items-center gap-14 lg:grid-cols-2 lg:gap-20">
        <div>
          <SectionHeader
            id="mid-title"
            light
            eyebrow="Medical Innovation Districts"
            title={
              <>
                Health care, careers and clean energy, <span className="italic text-gold-300">close to home.</span>
              </>
            }
            intro="PGCCDC champions a Medical Innovation District for Prince George's County: a healthcare hub, free workforce training and career-level jobs for local residents, powered by clean, on-site energy."
          />
          <ul data-reveal className="mt-10 grid grid-cols-2 gap-3 sm:gap-4">
            {[
              ["200-bed", "healthcare hub serving 125,000+ underserved residents"],
              ["1,200", "residents trained free each year in tech and healthcare"],
              ["300 tons", "of daily waste turned into clean hydrogen fuel"],
              ["All 14", "County AI Task Force recommendations the MID aligns with"],
            ].map(([n, t]) => (
              <li key={n} className="rounded-2xl border border-white/10 bg-white/[0.04] p-4 sm:p-5">
                <span className="block font-display text-3xl font-semibold text-gold-300">{n}</span>
                <span className="mt-1 block text-sm leading-snug text-white/80">{t}</span>
              </li>
            ))}
          </ul>
          <div className="mt-10" data-reveal>
            <ButtonLink href="/programs/medical-innovation-districts" variant="gold">
              Explore the MID plan
            </ButtonLink>
          </div>
        </div>
        <div className="rounded-[var(--radius-xl)] border border-white/10 bg-white/[0.04] p-7 backdrop-blur md:p-10">
          <h3 className="font-display text-2xl font-medium">By the numbers</h3>
          <p className="mt-1 text-sm text-white/70">What a Medical Innovation District brings to the county</p>
          <dl data-reveal className="mt-8 divide-y divide-white/10">
            {[
              ["2,430+", "direct jobs created", "Career-level jobs with mandated local hiring."],
              ["$76M", "projected annual tax revenue", "New revenue for Prince George's County."],
              ["75%", "local hiring", "Of MID jobs reserved for county residents, including 40% from Landover."],
            ].map(([n, t, d]) => (
              <div key={t} className="py-6 first:pt-0 last:pb-0">
                <dt className="eyebrow text-gold-300">{t}</dt>
                <dd className="mt-2">
                  <span className="block font-display text-5xl font-semibold leading-none">{n}</span>
                  <span className="mt-2 block text-sm text-white/75">{d}</span>
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </section>
  );
}

function RadioBand() {
  return (
    <section aria-labelledby="radio-title" className="on-dark relative isolate overflow-hidden bg-plum-800 text-white">
      <Image src={radioStudio} alt="" fill placeholder="blur" sizes="100vw" className="-z-20 object-cover opacity-40" />
      <div aria-hidden className="absolute inset-0 -z-10 bg-[linear-gradient(110deg,rgb(63_22_80/0.97)_20%,rgb(0_37_82/0.85)_70%,rgb(0_37_82/0.6))]" />
      <div className="container-site section-y grid items-center gap-12 lg:grid-cols-12">
        <div className="lg:col-span-7" data-reveal>
          <p className="eyebrow inline-flex items-center gap-2 text-gold-300">
            <Radio aria-hidden className="size-4" /> Voice of the County
          </p>
          <h2 id="radio-title" className="text-h2 mt-5 font-medium">
            Muzik Xpose&apos; Radio
          </h2>
          <p className="text-lead mt-5 max-w-2xl text-white/85">
            The Nation&apos;s premier Black Muzik streaming network and the Voice of Prince George&apos;s County,
            showcasing our culture, concerns and the issues affecting the county and Black America.
          </p>
          <ul className="mt-7 flex flex-wrap gap-2" aria-label="On the station">
            {["Satire", "Live Music", "Real Talk"].map((t) => (
              <li key={t} className="rounded-full border border-white/25 px-4 py-1.5 text-sm font-semibold">
                {t}
              </li>
            ))}
          </ul>
          <div className="mt-9 flex flex-wrap gap-3">
            <ButtonLink href={org.listenLive} external variant="gold">
              Listen live
            </ButtonLink>
            <ButtonLink href="/programs/muzik-xpose-radio" variant="outline-light">
              About the station
            </ButtonLink>
          </div>
        </div>
        <div className="lg:col-span-5" data-reveal style={{ "--reveal-delay": "150ms" } as React.CSSProperties}>
          <div className="overflow-hidden rounded-[var(--radius-lg)] bg-white text-navy-900 shadow-[var(--shadow-lift)]">
            <Image src={healthNotes} alt="Health Notes logo: to keep you dancing to the music of life, on Muzik Xpose Radio" placeholder="blur" sizes="(min-width: 1024px) 34vw, 100vw" className="aspect-[16/10] w-full object-cover" />
            <div className="p-6">
              <p className="eyebrow text-leaf-700">Coming soon</p>
              <h3 className="mt-2 font-display text-2xl font-medium">The Health Notes podcast</h3>
              <p className="mt-2 text-ink-soft">
                Health tips and expert conversations “to keep you dancing to the music of life,” streaming on Muzik
                Xpose&apos; Radio.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function Documentary() {
  return (
    <section aria-labelledby="doc-title" className="section-y bg-white">
      <div className="container-site grid items-center gap-12 lg:grid-cols-12 lg:gap-16">
        <div className="lg:col-span-7" data-reveal>
          <VideoEmbed
            vimeoId="1121020185"
            title="Let Me Put This BUG In Your Ear: The John “Peterbug” Matthews Story"
            poster={documentaryPoster}
          />
        </div>
        <div className="lg:col-span-5" data-reveal style={{ "--reveal-delay": "120ms" } as React.CSSProperties}>
          <Eyebrow>Artist in Residence</Eyebrow>
          <h2 id="doc-title" className="text-h2 mt-5 font-medium text-navy-900">
            Stories that honor <span className="italic text-blue-600">our own.</span>
          </h2>
          <p className="mt-5 text-ink-soft">
            Our Filmmaker-in-Residence <strong className="text-navy-900">Monty Ross</strong>, co-founder of 40 Acres
            &amp; A Mule Filmworks, completed the final edits on this community documentary about John
            “Peterbug” Matthews: shoemaker, mentor and founder of the Peterbug Shoe Academy, after 50 years of
            service.
          </p>
          <div className="mt-8 flex items-center gap-4">
            <Image src={montyRoss} alt="" placeholder="blur" sizes="64px" className="size-16 rounded-full object-cover object-top" />
            <div className="leading-tight">
              <p className="font-semibold text-navy-900">Monty Ross</p>
              <p className="text-sm text-ink-soft">Filmmaker-in-Residence, PGCCDC</p>
            </div>
          </div>
          <div className="mt-8">
            <ArrowLink href="/programs/artist-in-residence">About the documentary</ArrowLink>
          </div>
        </div>
      </div>
    </section>
  );
}

function Partners() {
  const partners = [
    { name: "The National AI Academy", role: "Workforce & digital literacy partner", logo: naiaLogo, bg: "bg-white", href: "/partnerships#naia" },
    { name: "Deep Roots Farm", role: "Farm-to-table food access partner", logo: deepRootsLogo, bg: "bg-[#4a2a2c]", href: "/partnerships#deep-roots-farm" },
    { name: "Muzik Xpose' Radio", role: "Media & community voice partner", logo: muzikLogo, bg: "bg-plum-800", href: "/programs/muzik-xpose-radio" },
    { name: "Monty Ross", role: "Filmmaker-in-Residence", logo: montyRoss, bg: "bg-[#c9c9c9]", href: "/programs/artist-in-residence" },
  ];
  return (
    <section aria-labelledby="partners-title" className="section-y bg-cream">
      <div className="container-site">
        <SectionHeader
          id="partners-title"
          align="center"
          eyebrow="Strategic Partnerships"
          title="Stronger together."
          intro="We work alongside organizations that share our commitment to healthier, more prosperous neighborhoods."
        />
        <ul className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {partners.map((p, i) => (
            <li key={p.name} data-reveal style={{ "--reveal-delay": `${i * 90}ms` } as React.CSSProperties}>
              <Link
                href={p.href}
                className="group block h-full overflow-hidden rounded-[var(--radius-lg)] border border-line bg-white transition duration-500 hover:-translate-y-1 hover:shadow-[var(--shadow-lift)]"
              >
                <span className={`relative flex h-44 items-center justify-center overflow-hidden ${p.bg}`}>
                  <Image
                    src={p.logo}
                    alt=""
                    placeholder="blur"
                    sizes="(min-width: 1024px) 22vw, 50vw"
                    className={
                      p.name === "Monty Ross"
                        ? "absolute inset-0 size-full object-cover object-[center_15%] grayscale transition duration-700 group-hover:scale-105"
                        : "max-h-32 w-auto max-w-[80%] object-contain transition duration-700 group-hover:scale-105"
                    }
                  />
                </span>
                <span className="block p-6">
                  <span className="block font-display text-xl font-medium text-navy-900">{p.name}</span>
                  <span className="mt-1 block text-sm text-ink-soft">{p.role}</span>
                </span>
              </Link>
            </li>
          ))}
        </ul>
        <div className="mt-12 text-center" data-reveal>
          <ArrowLink href="/partnerships">See all partnerships</ArrowLink>
        </div>
      </div>
    </section>
  );
}

function GetInvolved() {
  const paths = [
    {
      icon: Handshake,
      title: "Partner with us",
      text: "Government, business or nonprofit, let's build strategies that foster communal relationships across the county.",
      cta: "Start a conversation",
      href: "/contact",
    },
    {
      icon: Building2,
      title: "Get connected",
      text: "Looking for health, nutrition, fitness or business resources? We'll link you to programs and services near you.",
      cta: "Find resources",
      href: "/programs",
    },
    {
      icon: HandCoins,
      title: "Give",
      text: "Your gift keeps programs free for residents. Donate by check or reach out about other ways to give.",
      cta: "Ways to donate",
      href: "/donate",
    },
  ];
  return (
    <section aria-labelledby="involved-title" className="section-y bg-white">
      <div className="container-site">
        <SectionHeader
          id="involved-title"
          eyebrow="Join hands for a cause"
          title={
            <>
              We stand for a better future. <span className="italic text-blue-600">We thrive with you.</span>
            </>
          }
        />
        <ul className="mt-12 grid gap-5 md:grid-cols-3">
          {paths.map((p, i) => (
            <li key={p.title} data-reveal style={{ "--reveal-delay": `${i * 100}ms` } as React.CSSProperties}>
              <Link
                href={p.href}
                className={`group flex h-full flex-col rounded-[var(--radius-lg)] p-8 transition duration-500 hover:-translate-y-1 hover:shadow-[var(--shadow-lift)] ${
                  i === 2 ? "on-dark bg-navy-900 text-white" : "border border-line bg-cream"
                }`}
              >
                <span className={`flex size-14 items-center justify-center rounded-2xl ${i === 2 ? "bg-gold-500 text-navy-950" : "bg-white text-blue-700 shadow-[var(--shadow-soft)]"}`}>
                  <p.icon aria-hidden className="size-6" />
                </span>
                <h3 className={`text-h3 mt-6 font-medium ${i === 2 ? "text-white" : "text-navy-900"}`}>{p.title}</h3>
                <p className={`mt-3 flex-1 ${i === 2 ? "text-white/80" : "text-ink-soft"}`}>{p.text}</p>
                <span className={`mt-6 inline-flex items-center gap-2 font-bold ${i === 2 ? "text-gold-300" : "text-blue-700"}`}>
                  {p.cta}
                  <ArrowRight aria-hidden className="size-4 transition-transform group-hover:translate-x-1" />
                </span>
              </Link>
            </li>
          ))}
        </ul>

        <div data-reveal className="mt-16 flex flex-col items-start justify-between gap-8 rounded-[var(--radius-xl)] border border-blue-200 bg-blue-50 p-8 md:flex-row md:items-center md:p-12">
          <div>
            <h2 className="text-h3 font-medium text-navy-900">We would love to hear from you!</h2>
            <p className="mt-2 text-ink-soft">Just want to say hi? Need to tell us something? Connect with us now.</p>
          </div>
          <div className="flex flex-wrap gap-3">
            <a href={org.emailHref} className="inline-flex min-h-12 items-center gap-2 rounded-full bg-navy-900 px-6 font-bold text-white transition hover:bg-blue-600">
              <Mail aria-hidden className="size-4" /> Let&apos;s talk
            </a>
            <a href={org.phoneHref} className="inline-flex min-h-12 items-center gap-2 rounded-full border-2 border-navy-900 px-6 font-bold text-navy-900 transition hover:bg-navy-900 hover:text-white">
              <Phone aria-hidden className="size-4" /> {org.phone}
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
