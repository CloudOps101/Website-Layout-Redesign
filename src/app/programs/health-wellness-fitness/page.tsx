import type { Metadata } from "next";
import Image from "next/image";
import { Apple, Brain, CalendarDays, HeartPulse, MapPin, Mic, Sprout, Stethoscope, Tractor } from "lucide-react";

import { ArrowLink, ButtonLink, CtaBand, Eyebrow, PageHero, SectionHeader } from "@/components/ui";

import fitnessClass from "@/assets/img/fitness-class.webp";
import seniorsWalking from "@/assets/img/seniors-walking.webp";
import doctorChild from "@/assets/img/doctor-child.webp";
import farmersMarket from "@/assets/img/farmers-market.webp";
import marketVegetables from "@/assets/img/market-vegetables.webp";
import produceBasket from "@/assets/img/produce-basket.webp";
import deepRootsLogo from "@/assets/img/deep-roots-logo.webp";

export const metadata: Metadata = {
  alternates: { canonical: "/programs/health-wellness-fitness" },
  title: "Health, Wellness & Fitness",
  description:
    "Health education on cardiovascular health, diabetes and brain health, fitness programming and locally sourced, organic food through our partner Deep Roots Farm.",
};

const focus = [
  { icon: HeartPulse, title: "Cardiovascular health", text: "Education on heart health and staying active, led by health experts." },
  { icon: Apple, title: "Diabetes prevention", text: "Education on diabetes prevention, nutrition and healthy food access." },
  { icon: Brain, title: "Brain health", text: "Education on brain health and healthy aging for every generation." },
  { icon: Stethoscope, title: "Linked to local care", text: "Residents are connected to local resources and services that improve health outcomes." },
];

export default function HealthPage() {
  return (
    <>
      <PageHero
        eyebrow="Health, Wellness & Fitness"
        title={
          <>
            Healthier neighbors make <span className="italic text-gold-300">stronger neighborhoods.</span>
          </>
        }
        intro="Programming that promotes health, nutrition and exercise for local residents, developed through strategic partnerships with local organizations and Prince George's County recreational facilities."
        image={fitnessClass}
        alt="Participants in a group fitness class"
        crumbs={[{ label: "Signature Programs", href: "/programs" }]}
        position="center 30%"
      />

      {/* Overview */}
      <section aria-labelledby="overview-title" className="section-y bg-white">
        <div className="container-site grid items-center gap-12 lg:grid-cols-2 lg:gap-20">
          <div data-reveal>
            <Eyebrow>The program</Eyebrow>
            <h2 id="overview-title" className="text-h2 mt-5 font-medium text-navy-900">
              Health education, fitness and real connections to care.
            </h2>
            <p className="text-lead mt-5 text-ink-soft">
              Our health, wellness and fitness programs include health education on cardiovascular health, diabetes and
              brain health, delivered by health experts at recreation centers across the county.
            </p>
            <p className="mt-4 text-ink-soft">
              Residents will have the opportunity to be linked to local resources and services to assist in their
              improved health outcomes.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <ButtonLink href="/contact">Join a program</ButtonLink>
              <ButtonLink href="/contact" variant="outline">
                Host a workshop
              </ButtonLink>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4" data-reveal style={{ "--reveal-delay": "120ms" } as React.CSSProperties}>
            <div className="relative aspect-[3/4] overflow-hidden rounded-[var(--radius-lg)]">
              <Image src={seniorsWalking} alt="Older adults walking together for exercise" fill placeholder="blur" sizes="(min-width:1024px) 22vw, 50vw" className="object-cover" />
            </div>
            <div className="relative mt-12 aspect-[3/4] overflow-hidden rounded-[var(--radius-lg)]">
              <Image src={doctorChild} alt="A doctor with a young patient" fill placeholder="blur" sizes="(min-width:1024px) 22vw, 50vw" className="object-cover object-[30%_center]" />
            </div>
          </div>
        </div>
      </section>

      {/* Focus areas */}
      <section aria-labelledby="focus-title" className="section-y bg-blue-50">
        <div className="container-site">
          <SectionHeader id="focus-title" eyebrow="Focus areas" title="Where we focus our health work." />
          <ul className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {focus.map((f, i) => (
              <li key={f.title} data-reveal style={{ "--reveal-delay": `${i * 90}ms` } as React.CSSProperties} className="rounded-[var(--radius-lg)] bg-white p-7 shadow-[var(--shadow-soft)]">
                <span className="flex size-14 items-center justify-center rounded-2xl bg-blue-600 text-white">
                  <f.icon aria-hidden className="size-6" />
                </span>
                <h3 className="mt-6 font-display text-xl font-medium text-navy-900">{f.title}</h3>
                <p className="mt-2 text-[0.9375rem] text-ink-soft">{f.text}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Deep Roots Farm */}
      <section id="nutrition" aria-labelledby="farm-title" className="section-y grain bg-cream">
        <div className="container-site">
          <div className="grid items-end gap-10 lg:grid-cols-12">
            <div className="lg:col-span-7">
              <SectionHeader
                id="farm-title"
                eyebrow="Food as medicine"
                title={
                  <>
                    Organic, sustainable, <span className="italic text-leaf-700">locally sourced.</span>
                  </>
                }
                intro="Better nutrition starts with better food. Through our farm-to-table initiative with Deep Roots Farm, we work to address food deserts in Prince George's County."
              />
            </div>
            <div className="flex items-center gap-4 lg:col-span-5 lg:justify-end" data-reveal>
              <Image src={deepRootsLogo} alt="Deep Roots Farm logo" placeholder="blur" sizes="96px" className="size-24 rounded-full object-cover" />
              <div>
                <p className="font-display text-xl font-medium text-navy-900">Deep Roots Farm</p>
                <p className="text-sm text-ink-soft">Upper Marlboro, MD · Partner</p>
              </div>
            </div>
          </div>

          <div className="mt-12 grid gap-5 lg:grid-cols-12">
            <div data-reveal className="relative min-h-[22rem] overflow-hidden rounded-[var(--radius-xl)] lg:col-span-7">
              <Image src={farmersMarket} alt="Shoppers buying fresh produce at an outdoor farmers market" fill placeholder="blur" sizes="(min-width:1024px) 58vw, 100vw" className="object-cover" />
              <div className="absolute inset-x-4 bottom-4 rounded-2xl bg-white/95 p-6 backdrop-blur md:inset-x-6 md:bottom-6 md:max-w-md">
                <p className="eyebrow text-leaf-700">Regeneratively grown</p>
                <p className="mt-2 text-navy-900">
                  Deep Roots Farm is a regenerative, Black woman-owned farm in Upper Marlboro growing vegetables, herbs,
                  fruit and flowers, and raising chickens, on 53 acres for our community.
                </p>
              </div>
            </div>
            <div className="grid gap-5 lg:col-span-5">
              <div data-reveal className="on-dark rounded-[var(--radius-xl)] bg-leaf-700 p-8 text-white">
                <span className="block font-display text-5xl font-semibold text-gold-300">1.4%</span>
                <p className="mt-2 text-white/90">
                  Deep Roots Farm proudly stands among the 1.4% of farms that are Black-owned, and manages 0.6% of
                  organically managed farmland.
                </p>
              </div>
              <div data-reveal className="relative min-h-[12rem] overflow-hidden rounded-[var(--radius-xl)]">
                <Image src={produceBasket} alt="A basket of fresh, colorful vegetables and fruit" fill placeholder="blur" sizes="(min-width:1024px) 40vw, 100vw" className="object-cover" />
              </div>
            </div>
          </div>

          <ul className="mt-12 grid gap-5 md:grid-cols-3">
            {[
              { icon: Sprout, t: "Regenerative", d: "Topsoil regeneration enhances biodiversity, conserves water and strengthens the resilience of local food systems to climate change." },
              { icon: Tractor, t: "Holistic", d: "Practices rooted in the link between soil health and the well-being of our food system, restoring land and livelihoods." },
              { icon: HeartPulse, t: "Humane", d: "High standards for animal welfare and worker fairness, with farm systems that coexist harmoniously with nature." },
            ].map((v, i) => (
              <li key={v.t} data-reveal style={{ "--reveal-delay": `${i * 90}ms` } as React.CSSProperties} className="rounded-[var(--radius-lg)] border border-line bg-white p-7">
                <v.icon aria-hidden className="size-7 text-leaf-600" />
                <h3 className="mt-4 font-display text-xl font-medium text-navy-900">{v.t}</h3>
                <p className="mt-2 text-[0.9375rem] text-ink-soft">{v.d}</p>
              </li>
            ))}
          </ul>

          {/* Where to find fresh food */}
          <div data-reveal className="mt-12 grid overflow-hidden rounded-[var(--radius-xl)] bg-white shadow-[var(--shadow-soft)] lg:grid-cols-[1fr_1.3fr]">
            <div className="relative min-h-[16rem]">
              <Image src={marketVegetables} alt="Fresh cauliflower, broccoli, radishes and onions at a market stall" fill placeholder="blur" sizes="(min-width:1024px) 40vw, 100vw" className="object-cover" />
            </div>
            <div className="p-8 md:p-10">
              <h3 className="text-h3 font-medium text-navy-900">Find fresh, local produce</h3>
              <p className="mt-2 text-ink-soft">Deep Roots Farm harvests to order for markets, CSA members and online pre-orders.</p>
              <ul className="mt-6 space-y-4">
                {[
                  ["LoveMyLargo market", "9401 Grand Boulevard, Upper Marlboro", "2nd Thursdays & 2nd Saturdays, June to December"],
                  ["Dupont Circle Farmers Market", "1624 20th St NW, Washington, DC", "Sundays, year-round"],
                  ["H St NE Market", "13th & H St NE, Washington, DC", "Saturdays, April to December"],
                ].map(([n, a, w]) => (
                  <li key={n} className="flex gap-4">
                    <MapPin aria-hidden className="mt-1 size-5 shrink-0 text-leaf-600" />
                    <div>
                      <p className="font-semibold text-navy-900">{n}</p>
                      <p className="text-sm text-ink-soft">{a}</p>
                      <p className="mt-0.5 flex items-center gap-1.5 text-sm text-ink-soft">
                        <CalendarDays aria-hidden className="size-3.5" /> {w}
                      </p>
                    </div>
                  </li>
                ))}
              </ul>
              <div className="mt-8">
                <ButtonLink href="https://www.deeprootsfarm.us/" external variant="outline">
                  Visit Deep Roots Farm
                </ButtonLink>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Health Notes cross-link */}
      <section aria-labelledby="notes-title" className="bg-white pt-16 md:pt-20">
        <div className="container-site">
          <div data-reveal className="flex flex-col items-start gap-6 rounded-[var(--radius-xl)] border border-blue-200 bg-blue-50 p-8 md:flex-row md:items-center md:justify-between md:p-10">
            <div className="flex items-start gap-5">
              <span className="flex size-14 shrink-0 items-center justify-center rounded-2xl bg-navy-900 text-gold-300">
                <Mic aria-hidden className="size-6" />
              </span>
              <div>
                <h2 id="notes-title" className="text-h3 font-medium text-navy-900">Listen for the Health Notes podcast</h2>
                <p className="mt-1 text-ink-soft">Health tips and expert voices, debuting on Muzik Xpose&apos; Radio.</p>
              </div>
            </div>
            <ArrowLink href="/programs/muzik-xpose-radio#health-notes">About Health Notes</ArrowLink>
          </div>
        </div>
      </section>

      <CtaBand title="Bring health programming to your rec center." text="Recreation centers, clinics and healthcare organizations: partner with us to bring health education to residents." />
    </>
  );
}
