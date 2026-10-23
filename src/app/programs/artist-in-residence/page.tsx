import type { Metadata } from "next";
import Image from "next/image";
import { Clapperboard, Film, Landmark, Palette, Quote } from "lucide-react";

import { org } from "@/content/site";
import { ButtonLink, CtaBand, Eyebrow, PageHero } from "@/components/ui";
import { VideoEmbed } from "@/components/video-embed";

import filmSet from "@/assets/img/film-set.webp";
import montyRoss from "@/assets/img/monty-ross.webp";
import documentaryPoster from "@/assets/img/documentary-poster.webp";

export const metadata: Metadata = {
  title: "Artist in Residence",
  description:
    "Filmmaker-in-Residence Monty Ross, co-founder of 40 Acres & A Mule Filmworks, and the documentary “Let Me Put This BUG In Your Ear: The John ‘Peterbug’ Matthews Story.”",
};

const credits = [
  "Co-founded 40 Acres & A Mule Filmworks with Spike Lee",
  "Co-produced She's Gotta Have It; later worked on Do the Right Thing, Malcolm X and Clockers",
  "Produced Keep the Faith, Baby, a biopic of Adam Clayton Powell Jr.",
  "Has taught film at Howard, Clark Atlanta, Florida A&M, VCU and Old Dominion",
];

export default function ArtistPage() {
  return (
    <>
      <PageHero
        eyebrow="Artist in Residence"
        title={
          <>
            Telling our community&apos;s stories, <span className="italic text-gold-300">on screen.</span>
          </>
        }
        intro="Through our Artist in Residence program, Forty Acres & A Mule co-founder Monty Ross brings decades of filmmaking to stories rooted in our community."
        image={filmSet}
        alt="A film crew setting up cameras and lights"
        crumbs={[{ label: "Signature Programs", href: "/programs" }]}
      />

      {/* Documentary */}
      <section aria-labelledby="doc-title" className="section-y bg-white">
        <div className="container-site">
          <div className="max-w-3xl" data-reveal>
            <Eyebrow>Featured documentary</Eyebrow>
            <h2 id="doc-title" className="text-h2 mt-4 font-medium text-navy-900">
              Let Me Put This BUG In Your Ear: <span className="italic text-blue-600">The John “Peterbug” Matthews Story</span>
            </h2>
          </div>
          <div className="mt-10 grid gap-12 lg:grid-cols-12">
            <div className="lg:col-span-8" data-reveal>
              <VideoEmbed
                vimeoId="1121020185"
                title="Let Me Put This BUG In Your Ear: The John “Peterbug” Matthews Story"
                poster={documentaryPoster}
                caption="Official trailer. Filmed over four years; final edits by Monty Ross."
              />
            </div>
            <div className="space-y-6 lg:col-span-4" data-reveal style={{ "--reveal-delay": "120ms" } as React.CSSProperties}>
              <p className="text-lg text-ink-soft">
                “Peterbug,” as he is called by many in his community, is a native Washington, DC community organizer,
                business owner and founder of the Peterbug Shoe Academy. After 50 years of dedicated service, this
                heartwarming documentary takes you into his world of mentorship, community engagement and legacy.
              </p>
              <p className="text-ink-soft">
                A documentary project was already underway when PGCCDC engaged Monty Ross, who finished the film. It
                was produced by Noir Prism Studios, Monty Ross and Tolson Banner of PGCCDC.
              </p>
              <dl className="grid grid-cols-2 gap-4 border-t border-line pt-6">
                <div>
                  <dt className="text-sm text-ink-soft">Filmed over</dt>
                  <dd className="font-display text-2xl font-semibold text-navy-900">4 years</dd>
                </div>
                <div>
                  <dt className="text-sm text-ink-soft">Years of service</dt>
                  <dd className="font-display text-2xl font-semibold text-navy-900">50</dd>
                </div>
              </dl>
              <div className="flex items-start gap-3 rounded-2xl bg-cream p-5">
                <Landmark aria-hidden className="mt-0.5 size-5 shrink-0 text-blue-700" />
                <p className="text-sm text-ink-soft">
                  The trailer screened at the Prince George&apos;s County Arts and Humanities Council Film Festival at
                  Bowie State University.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Monty Ross */}
      <section aria-labelledby="monty-title" className="on-dark section-y relative overflow-hidden bg-navy-950 text-white">
        <div aria-hidden className="absolute right-0 top-0 h-full w-1/2 bg-[radial-gradient(circle_at_70%_30%,rgb(0_116_178/0.35),transparent_60%)]" />
        <div className="container-site relative grid items-center gap-12 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-5" data-reveal>
            <div className="relative mx-auto max-w-sm overflow-hidden rounded-[var(--radius-xl)] bg-[#c9c9c9]">
              <Image src={montyRoss} alt="Portrait of filmmaker Monty Ross" placeholder="blur" sizes="(min-width:1024px) 30vw, 80vw" className="w-full" />
            </div>
          </div>
          <div className="lg:col-span-7" data-reveal style={{ "--reveal-delay": "120ms" } as React.CSSProperties}>
            <p className="eyebrow text-gold-300">Filmmaker-in-Residence</p>
            <h2 id="monty-title" className="text-h2 mt-4 font-medium">Monty Ross</h2>
            <p className="text-lead mt-5 text-white/85">
              Forty Acres &amp; A Mule co-founder Monty Ross is back on the film scene. He and Spike Lee met as freshmen
              at Morehouse College; his ties to PGCCDC go back to Clark Atlanta University, where Tolson Banner was his
              roommate.
            </p>
            <ul className="mt-8 grid gap-3 sm:grid-cols-2">
              {credits.map((c, i) => {
                const Icon = [Clapperboard, Film, Quote, Palette][i];
                return (
                  <li key={c} className="flex gap-3 rounded-2xl border border-white/10 bg-white/[0.04] p-4">
                    <Icon aria-hidden className="mt-0.5 size-5 shrink-0 text-gold-300" />
                    <span className="text-[0.9375rem] text-white/85">{c}</span>
                  </li>
                );
              })}
            </ul>
            <div className="mt-9 flex flex-wrap gap-3">
              <ButtonLink
                href="https://blacknews.com/news/forty-acres-a-mule-co-founder-monty-ross-new-documentary-let-me-put-this-bug-your-ear/"
                external
                variant="gold"
              >
                Read the BlackNews feature
              </ButtonLink>
              <ButtonLink href={`mailto:${org.email}?subject=Monty%20Ross%20speaking%20engagement`} variant="outline-light">
                Book a speaking engagement
              </ButtonLink>
            </div>
          </div>
        </div>
      </section>

      <CtaBand title="Have a community story to tell?" text="We partner with artists, filmmakers and storytellers who celebrate the people and culture of Prince George's County." />
    </>
  );
}
