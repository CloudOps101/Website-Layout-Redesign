import type { Metadata } from "next";
import Image from "next/image";
import { MapPin } from "lucide-react";

import { board, leadership, municipalities, org, pillars } from "@/content/site";
import { CtaBand, Eyebrow, PageHero, SectionHeader } from "@/components/ui";

import teamHands from "@/assets/img/team-hands.webp";
import communityGarden from "@/assets/img/community-garden.webp";
import seniorsWalking from "@/assets/img/seniors-walking.webp";

export const metadata: Metadata = {
  alternates: { canonical: "/about" },
  title: "About",
  description: org.mission,
};

export default function AboutPage() {
  return (
    <>
      <PageHero
        eyebrow="About PGCCDC"
        title={
          <>
            A real voice for the residents of <span className="italic text-gold-300">Prince George&apos;s County.</span>
          </>
        }
        intro={org.mission}
        image={teamHands}
        alt="Community members joining hands in celebration"
      />

      {/* Story */}
      <section aria-labelledby="story-title" className="section-y bg-white">
        <div className="container-site grid gap-14 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-6" data-reveal>
            <Eyebrow>Our story</Eyebrow>
            <h2 id="story-title" className="text-h2 mt-5 font-medium text-navy-900">
              We are here to make a difference, <span className="italic text-blue-600">block by block.</span>
            </h2>
            <div className="mt-6 space-y-5 text-lg text-ink-soft">
              <p>
                From Oxon Hill to Laurel to Capitol Heights to Bowie to Forestville to Largo to Seat Pleasant, along
                with the other 20 municipalities, we will crisscross the county to make it a better place to live for
                and with our fellow residents.
              </p>
              <p>
                PGCCDC also acts as a vehicle through its “Voice of the County” digital radio station, Muzik Xpose&apos;
                Radio, to highlight and showcase our culture, concerns and issues affecting not only Prince
                George&apos;s County but Black America as well.
              </p>
              <p className="font-semibold text-navy-900">
                Reach out to discuss being a partner, a client or customer, or someone who shares our mindset.
              </p>
            </div>
          </div>
          <div className="relative lg:col-span-6" data-reveal style={{ "--reveal-delay": "120ms" } as React.CSSProperties}>
            <div className="grid grid-cols-5 gap-4">
              <div className="relative col-span-3 aspect-[3/4] overflow-hidden rounded-[var(--radius-lg)]">
                <Image src={communityGarden} alt="Neighbors working together in a community garden" fill placeholder="blur" sizes="(min-width:1024px) 28vw, 60vw" className="object-cover" />
              </div>
              <div className="col-span-2 flex flex-col gap-4 pt-16">
                <div className="relative aspect-square overflow-hidden rounded-[var(--radius-lg)]">
                  <Image src={seniorsWalking} alt="Older adults walking together on a neighborhood sidewalk" fill placeholder="blur" sizes="(min-width:1024px) 18vw, 40vw" className="object-cover" />
                </div>
                <div className="rounded-[var(--radius-lg)] bg-navy-900 p-5 text-white">
                  <span className="block font-display text-4xl font-semibold text-gold-300">27</span>
                  <span className="mt-1 block text-sm leading-snug text-white/85">municipalities, one county-wide commitment</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Communities */}
      <section aria-labelledby="map-title" className="grain bg-cream py-16 md:py-20">
        <div className="container-site">
          <h2 id="map-title" className="eyebrow flex items-center gap-2 text-blue-700">
            <MapPin aria-hidden className="size-4" /> Communities we serve
          </h2>
          <ul className="mt-6 flex flex-wrap gap-2.5">
            {municipalities.map((m) => (
              <li key={m} className="rounded-full border border-line bg-white px-4 py-2 font-medium text-navy-900">
                {m}
              </li>
            ))}
            <li className="rounded-full bg-navy-900 px-4 py-2 font-medium text-white">+ every municipality in between</li>
          </ul>
        </div>
      </section>

      {/* Values */}
      <section aria-labelledby="values-title" className="section-y bg-white">
        <div className="container-site">
          <SectionHeader
            id="values-title"
            eyebrow="What guides us"
            title="Engagement, empowerment and entrepreneurship."
            intro="Three commitments that shape every program, partnership and conversation."
          />
          <ol className="mt-12 grid gap-px overflow-hidden rounded-[var(--radius-lg)] border border-line bg-line md:grid-cols-3">
            {pillars.map((p, i) => (
              <li key={p.title} className="bg-white p-8 md:p-10" data-reveal style={{ "--reveal-delay": `${i * 100}ms` } as React.CSSProperties}>
                <span className="font-display text-5xl font-semibold text-gold-500">0{i + 1}</span>
                <h3 className="text-h3 mt-4 font-medium text-navy-900">{p.title}</h3>
                <p className="mt-3 text-ink-soft">{p.text}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* Leadership */}
      <section aria-labelledby="leadership-title" className="section-y bg-sand">
        <div className="container-site">
          <SectionHeader id="leadership-title" eyebrow="Leadership" title="The people behind PGCCDC." />
          <div className="mt-12 grid gap-6 lg:grid-cols-2">
            {leadership.map((p) => (
              <article key={p.name} data-reveal className="flex flex-col rounded-[var(--radius-lg)] bg-white p-8 shadow-[var(--shadow-soft)] md:p-10">
                <div className="flex items-center gap-5">
                  <Avatar initials={p.initials} large />
                  <div>
                    <h3 className="font-display text-2xl font-medium leading-tight text-navy-900">{p.name}</h3>
                    <p className="mt-1 font-semibold text-blue-700">{p.role}</p>
                  </div>
                </div>
                <div className="mt-6 space-y-4 text-ink-soft">
                  {p.bio.map((para) => (
                    <p key={para.slice(0, 24)}>{para}</p>
                  ))}
                </div>
              </article>
            ))}
          </div>

          <h3 className="eyebrow mt-20 text-blue-700" data-reveal>
            Board of Directors
          </h3>
          <div className="mt-6 grid gap-6 md:grid-cols-3">
            {board.map((p, i) => (
              <article key={p.name} data-reveal style={{ "--reveal-delay": `${i * 100}ms` } as React.CSSProperties} className="rounded-[var(--radius-lg)] border border-line bg-white p-7">
                <div className="flex items-center gap-4">
                  <Avatar initials={p.initials} />
                  <h4 className="font-display text-xl font-medium leading-tight text-navy-900">{p.name}</h4>
                </div>
                <p className="mt-5 text-[0.9375rem] leading-relaxed text-ink-soft">{p.bio}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <CtaBand />
    </>
  );
}

/** Monogram used until headshots are supplied. */
function Avatar({ initials, large }: { initials: string; large?: boolean }) {
  return (
    <span
      aria-hidden
      className={`relative flex shrink-0 items-center justify-center overflow-hidden rounded-full bg-navy-900 font-display font-semibold text-gold-300 ${
        large ? "size-20 text-2xl" : "size-14 text-lg"
      }`}
    >
      <span className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgb(0_116_178/0.7),transparent_60%)]" />
      <span className="relative">{initials}</span>
    </span>
  );
}
