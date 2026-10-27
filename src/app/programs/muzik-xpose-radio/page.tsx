import type { Metadata } from "next";
import Image from "next/image";
import { Headphones, Laugh, Mic, Music } from "lucide-react";

import { org } from "@/content/site";
import { ButtonLink, CtaBand, Eyebrow, PageHero } from "@/components/ui";
import { SocialIcon } from "@/components/social-icon";

import radioStudio from "@/assets/img/radio-studio.webp";
import muzikLogo from "@/assets/img/muzik-xpose-logo.webp";
import healthNotes from "@/assets/img/health-notes.webp";

export const metadata: Metadata = {
  alternates: { canonical: "/programs/muzik-xpose-radio" },
  title: "Muzik Xpose' Radio",
  description:
    "The Nation's premier Black Muzik streaming network and Voice of Prince George's County. Home of the Health Notes podcast.",
};

const formats = [
  { icon: Laugh, title: "Satire", text: "Sharp, funny commentary on the headlines that shape our community." },
  { icon: Music, title: "Live Music", text: "Black music the mainstream won't play, streaming live." },
  { icon: Mic, title: "Real Talk", text: "Honest conversations on the issues facing Prince George's County and Black America." },
];

export default function RadioPage() {
  return (
    <>
      <PageHero
        eyebrow="Muzik Xpose' Radio"
        title={
          <>
            The Voice of <span className="italic text-gold-300">Prince George&apos;s County.</span>
          </>
        }
        intro="The Nation's premier Black Muzik streaming network, highlighting our culture, concerns and the issues affecting not only Prince George's County but Black America as well."
        image={radioStudio}
        alt="A studio microphone at a radio broadcast desk"
        crumbs={[{ label: "Signature Programs", href: "/programs" }]}
      >
        <ButtonLink href={org.listenLive} external variant="gold">
          Listen live
        </ButtonLink>
      </PageHero>

      {/* Manifesto */}
      <section aria-labelledby="manifesto-title" className="on-dark section-y relative overflow-hidden bg-plum-800 text-white">
        <div aria-hidden className="absolute -left-24 top-0 size-96 rounded-full bg-plum-600/60 blur-[100px]" />
        <div className="container-site relative grid items-center gap-12 lg:grid-cols-2">
          <div data-reveal>
            <p className="eyebrow text-gold-300">Black Muzik Xposé</p>
            <h2 id="manifesto-title" className="text-h1 mt-5 font-medium">
              What the headlines won&apos;t say.
              <br />
              <span className="italic text-gold-300">What the sucka DJs won&apos;t play.</span>
            </h2>
          </div>
          <div data-reveal style={{ "--reveal-delay": "120ms" } as React.CSSProperties}>
            <Image src={muzikLogo} alt="Mu-Zik Xposé logo: The MX, Feel On This" placeholder="blur" sizes="(min-width:1024px) 40vw, 100vw" className="w-full rounded-[var(--radius-lg)] shadow-[var(--shadow-lift)]" />
          </div>
        </div>
      </section>

      {/* Formats */}
      <section aria-labelledby="formats-title" className="section-y bg-white">
        <div className="container-site">
          <div className="max-w-3xl" data-reveal>
            <Eyebrow>On the air</Eyebrow>
            <h2 id="formats-title" className="text-h2 mt-4 font-medium text-navy-900">
              Satire. Live music. Real talk.
            </h2>
          </div>
          <ul className="mt-12 grid gap-5 md:grid-cols-3">
            {formats.map((f, i) => (
              <li key={f.title} data-reveal style={{ "--reveal-delay": `${i * 90}ms` } as React.CSSProperties} className="group rounded-[var(--radius-lg)] border border-line p-8 transition duration-500 hover:border-plum-600 hover:shadow-[var(--shadow-lift)]">
                <span className="flex size-14 items-center justify-center rounded-2xl bg-plum-800 text-gold-300">
                  <f.icon aria-hidden className="size-6" />
                </span>
                <h3 className="text-h3 mt-6 font-medium text-navy-900">{f.title}</h3>
                <p className="mt-3 text-ink-soft">{f.text}</p>
              </li>
            ))}
          </ul>

          {/* Listen bar */}
          <div data-reveal className="on-dark mt-12 flex flex-col items-start justify-between gap-6 rounded-[var(--radius-xl)] bg-navy-900 p-8 text-white md:flex-row md:items-center md:p-10">
            <div className="flex items-center gap-5">
              <span className="relative flex size-16 shrink-0 items-center justify-center rounded-full bg-gold-500 text-navy-950">
                <Headphones aria-hidden className="size-7" />
                <span className="absolute inset-0 animate-ping rounded-full bg-gold-500/40 motion-reduce:hidden" />
              </span>
              <div>
                <p className="eyebrow text-gold-300">Live radio</p>
                <p className="font-display text-2xl">Tune in to Muzik Xpose&apos; Radio now</p>
              </div>
            </div>
            <div className="flex flex-wrap items-center gap-3">
              <ButtonLink href={org.listenLive} external variant="gold">
                Listen live
              </ButtonLink>
              <ul className="flex gap-2" aria-label="Follow Muzik Xpose' Radio">
                {org.social.map((s) => (
                  <li key={s.label}>
                    <a href={s.href} target="_blank" rel="noopener noreferrer" className="inline-flex size-12 items-center justify-center rounded-full border border-white/25 hover:border-gold-300 hover:text-gold-300">
                      <SocialIcon name={s.label} className="size-5" />
                      <span className="sr-only">{s.label} (opens in a new tab)</span>
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Health Notes */}
      <section id="health-notes" aria-labelledby="hn-title" className="section-y scroll-mt-24 bg-blue-50">
        <div className="container-site grid items-center gap-12 lg:grid-cols-2 lg:gap-20">
          <div data-reveal>
            <Image src={healthNotes} alt="Health Notes logo: to keep you dancing to the music of life, on Muzik Xpose Radio" placeholder="blur" sizes="(min-width:1024px) 45vw, 100vw" className="w-full rounded-[var(--radius-xl)] shadow-[var(--shadow-lift)]" />
          </div>
          <div data-reveal style={{ "--reveal-delay": "120ms" } as React.CSSProperties}>
            <p className="eyebrow inline-flex rounded-full bg-leaf-100 px-3 py-1.5 text-leaf-700">Coming soon</p>
            <h2 id="hn-title" className="text-h2 mt-5 font-medium text-navy-900">
              Health Notes: <span className="italic text-blue-600">to keep you dancing to the music of life.</span>
            </h2>
            <p className="text-lead mt-5 text-ink-soft">
              Be on the lookout for the debut of the Health Notes podcast, streaming on Muzik Xpose&apos; Radio. Health
              experts share practical advice on heart health, diabetes, brain health and nutrition, all part of our
              Health, Wellness &amp; Fitness program.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <ButtonLink href="/contact">Get notified at launch</ButtonLink>
              <ButtonLink href="/programs/health-wellness-fitness" variant="outline">
                Health &amp; wellness program
              </ButtonLink>
            </div>
          </div>
        </div>
      </section>

      <CtaBand title="Sponsor the Voice of the County." text="Reach engaged listeners across Prince George's County and beyond. Talk with us about sponsorship and partnership." />
    </>
  );
}
