import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

import { programs } from "@/content/site";
import { CtaBand, PageHero } from "@/components/ui";

import gardenPlanting from "@/assets/img/garden-planting.webp";

export const metadata: Metadata = {
  title: "Signature Programs",
  description:
    "PGCCDC's signature programs: Medical Innovation Districts, Health, Wellness & Fitness, Muzik Xpose' Radio and Artist in Residence.",
};

const highlights: Record<string, string[]> = {
  "medical-innovation-districts": ["2,430+ direct local jobs", "200-bed healthcare hub", "Free workforce training"],
  "health-wellness-fitness": ["Cardiovascular, diabetes & brain health", "Deep Roots Farm nutrition", "Links to local services"],
  "muzik-xpose-radio": ["Live online radio", "Satire, live music, real talk", "Health Notes podcast"],
  "artist-in-residence": ["Filmmaker Monty Ross", "Peterbug documentary", "Community storytelling"],
};

export default function ProgramsPage() {
  return (
    <>
      <PageHero
        eyebrow="Signature Programs"
        title={
          <>
            Health, opportunity and culture, <span className="italic text-gold-300">built with residents.</span>
          </>
        }
        intro="Four programs that put Prince George's County residents at the center: healthier bodies, stronger local economies and stories told by our own community."
        image={gardenPlanting}
        alt="Neighbors planting crops together"
      />

      <section aria-label="All programs" className="section-y bg-white">
        <div className="container-site space-y-8 md:space-y-24">
          {programs.map((p, i) => (
            <article
              key={p.slug}
              data-reveal
              className="group grid items-center gap-8 md:grid-cols-2 md:gap-14 lg:gap-20"
            >
              <Link
                href={p.href}
                tabIndex={-1}
                aria-hidden
                className={`relative block aspect-[4/3] overflow-hidden rounded-[var(--radius-xl)] shadow-[var(--shadow-soft)] ${i % 2 ? "md:order-2" : ""}`}
              >
                <Image src={p.image} alt="" fill placeholder="blur" sizes="(min-width: 768px) 50vw, 100vw" className="object-cover transition duration-[1.2s] group-hover:scale-105" />
                <span className="absolute left-5 top-5 rounded-full bg-white/90 px-3 py-1 font-display text-sm font-semibold text-navy-900 backdrop-blur">
                  0{i + 1}
                </span>
              </Link>
              <div>
                <p className="eyebrow text-blue-700">{p.tag}</p>
                <h2 className="text-h2 mt-4 font-medium text-navy-900">
                  <Link href={p.href} className="hover:text-blue-700">
                    {p.title}
                  </Link>
                </h2>
                <p className="text-lead mt-5 text-ink-soft">{p.summary}</p>
                <ul className="mt-7 space-y-3">
                  {highlights[p.slug].map((h) => (
                    <li key={h} className="flex items-center gap-3 font-medium text-navy-900">
                      <span aria-hidden className="size-2 rounded-full bg-gold-500" />
                      {h}
                    </li>
                  ))}
                </ul>
                <Link
                  href={p.href}
                  className="mt-9 inline-flex min-h-12 items-center gap-2 rounded-full bg-navy-900 px-6 font-bold text-white transition hover:-translate-y-0.5 hover:bg-blue-600"
                >
                  Explore {p.short}
                  <ArrowRight aria-hidden className="size-4" />
                </Link>
              </div>
            </article>
          ))}
        </div>
      </section>

      <CtaBand title="Bring a program to your neighborhood." />
    </>
  );
}
