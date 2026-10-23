import Image, { type StaticImageData } from "next/image";
import Link from "next/link";
import { ArrowRight, ArrowUpRight } from "lucide-react";

type ButtonVariant = "primary" | "gold" | "outline" | "outline-light" | "ghost";

const variants: Record<ButtonVariant, string> = {
  primary: "bg-navy-900 text-white hover:bg-blue-600 shadow-[0_10px_24px_-12px_rgb(0_37_82/0.8)]",
  gold: "bg-gold-500 text-navy-950 hover:bg-gold-300 shadow-[0_10px_24px_-12px_rgb(201_138_18/0.9)]",
  outline: "border-2 border-navy-900 text-navy-900 hover:bg-navy-900 hover:text-white",
  "outline-light": "border-2 border-white/70 text-white hover:bg-white hover:text-navy-900",
  ghost: "text-navy-900 hover:text-blue-600 px-0!",
};

export function ButtonLink({
  href,
  children,
  variant = "primary",
  external,
  className = "",
}: {
  href: string;
  children: React.ReactNode;
  variant?: ButtonVariant;
  external?: boolean;
  className?: string;
}) {
  const cls = `group inline-flex min-h-12 items-center justify-center gap-2 rounded-full px-6 text-[0.9375rem] font-bold transition duration-300 hover:-translate-y-0.5 ${variants[variant]} ${className}`;
  const Icon = external ? ArrowUpRight : ArrowRight;
  const icon = (
    <Icon aria-hidden className="size-4 transition-transform duration-300 group-hover:translate-x-0.5" />
  );
  if (external || href.startsWith("mailto:") || href.startsWith("tel:")) {
    return (
      <a
        href={href}
        className={cls}
        {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
      >
        {children}
        {icon}
        {external && <span className="sr-only">(opens in a new tab)</span>}
      </a>
    );
  }
  return (
    <Link href={href} className={cls}>
      {children}
      {icon}
    </Link>
  );
}

export function Eyebrow({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return (
    <p className={`eyebrow inline-flex items-center gap-3 text-blue-700 ${className}`}>
      <span aria-hidden className="h-px w-8 bg-current" />
      {children}
    </p>
  );
}

export function SectionHeader({
  eyebrow,
  title,
  intro,
  align = "left",
  light,
  id,
}: {
  eyebrow?: string;
  title: React.ReactNode;
  intro?: React.ReactNode;
  align?: "left" | "center";
  light?: boolean;
  id?: string;
}) {
  return (
    <div data-reveal className={`max-w-3xl ${align === "center" ? "mx-auto text-center" : ""}`}>
      {eyebrow && (
        <Eyebrow className={`${light ? "text-gold-300" : ""} ${align === "center" ? "justify-center" : ""}`}>
          {eyebrow}
        </Eyebrow>
      )}
      <h2 id={id} className={`text-h2 mt-4 font-medium ${light ? "text-white" : "text-navy-900"}`}>
        {title}
      </h2>
      {intro && <div className={`text-lead mt-5 ${light ? "text-white/80" : "text-ink-soft"}`}>{intro}</div>}
    </div>
  );
}

/** Inner-page hero: image with navy gradient, breadcrumb and title. */
export function PageHero({
  eyebrow,
  title,
  intro,
  image,
  alt,
  crumbs = [],
  children,
  position = "center",
}: {
  eyebrow: string;
  title: React.ReactNode;
  intro?: React.ReactNode;
  image: StaticImageData;
  alt: string;
  crumbs?: { label: string; href: string }[];
  children?: React.ReactNode;
  position?: string;
}) {
  return (
    <section className="on-dark relative isolate overflow-hidden bg-navy-950 text-white">
      <Image
        src={image}
        alt={alt}
        fill
        priority
        placeholder="blur"
        sizes="100vw"
        className="-z-20 object-cover"
        style={{ objectPosition: position }}
      />
      <div
        aria-hidden
        className="absolute inset-0 -z-10 bg-[linear-gradient(100deg,rgb(0_20_46/0.95)_0%,rgb(0_37_82/0.86)_45%,rgb(0_37_82/0.35)_100%)]"
      />
      <div className="container-site flex min-h-[26rem] flex-col justify-end pb-14 pt-20 md:min-h-[32rem] md:pb-20">
        <nav aria-label="Breadcrumb" className="mb-8">
          <ol className="flex flex-wrap items-center gap-2 text-sm text-white/75">
            <li>
              <Link href="/" className="hover:text-white">
                Home
              </Link>
            </li>
            {crumbs.map((c) => (
              <li key={c.href} className="flex items-center gap-2">
                <span aria-hidden>/</span>
                <Link href={c.href} className="hover:text-white">
                  {c.label}
                </Link>
              </li>
            ))}
            <li className="flex items-center gap-2">
              <span aria-hidden>/</span>
              <span aria-current="page" className="text-white">
                {eyebrow}
              </span>
            </li>
          </ol>
        </nav>
        <p className="eyebrow text-gold-300">{eyebrow}</p>
        <h1 className="text-h1 mt-4 max-w-4xl font-medium">{title}</h1>
        {intro && <div className="text-lead mt-6 max-w-2xl text-white/85">{intro}</div>}
        {children && <div className="mt-8 flex flex-wrap gap-3">{children}</div>}
      </div>
    </section>
  );
}

/** Closing call-to-action band used at the bottom of most pages. */
export function CtaBand({
  title = "Join hands for a cause.",
  text = "Let's work together to formulate strategies that will yield and foster communal relationships between government, business, and community.",
}: {
  title?: string;
  text?: string;
}) {
  return (
    <section aria-labelledby="cta-title" className="section-y bg-white">
      <div className="container-site">
        <div
          data-reveal
          className="on-dark relative overflow-hidden rounded-[var(--radius-xl)] bg-navy-900 px-6 py-14 text-white sm:px-12 md:py-20 lg:px-20"
        >
          <div
            aria-hidden
            className="absolute -right-20 -top-28 size-80 rounded-full bg-blue-600/40 blur-3xl"
          />
          <div aria-hidden className="absolute -bottom-32 left-1/3 size-72 rounded-full bg-gold-500/25 blur-3xl" />
          <div className="relative grid items-end gap-10 lg:grid-cols-[1.4fr_1fr]">
            <div>
              <p className="eyebrow text-gold-300">Get involved</p>
              <h2 id="cta-title" className="text-h2 mt-4 font-medium">
                {title}
              </h2>
              <p className="text-lead mt-5 max-w-2xl text-white/80">{text}</p>
            </div>
            <div className="flex flex-wrap gap-3 lg:justify-end">
              <ButtonLink href="/contact" variant="gold">
                Partner with us
              </ButtonLink>
              <ButtonLink href="/donate" variant="outline-light">
                Donate
              </ButtonLink>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export function ArrowLink({ href, children, light }: { href: string; children: React.ReactNode; light?: boolean }) {
  return (
    <Link
      href={href}
      className={`group inline-flex min-h-11 items-center gap-2 font-bold underline-offset-[6px] hover:underline ${
        light ? "text-gold-300" : "text-blue-700"
      }`}
    >
      {children}
      <ArrowRight aria-hidden className="size-4 transition-transform duration-300 group-hover:translate-x-1" />
    </Link>
  );
}
