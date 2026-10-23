"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useCallback, useEffect, useId, useRef, useState } from "react";
import { ArrowRight, ChevronDown, Heart, Mail, Menu, Phone, Radio, X } from "lucide-react";

import { mainNav, org, programs } from "@/content/site";

function isActive(pathname: string, href: string) {
  return href === "/" ? pathname === "/" : pathname === href || pathname.startsWith(`${href}/`);
}

export function SiteHeader() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [programsOpen, setProgramsOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Close menus whenever the route changes
  const [lastPath, setLastPath] = useState(pathname);
  if (pathname !== lastPath) {
    setLastPath(pathname);
    setMenuOpen(false);
    setProgramsOpen(false);
  }

  return (
    <>
      {/* Utility bar: quick contact + radio, desktop only */}
      <div className="hidden bg-navy-950 text-white/85 lg:block on-dark">
        <div className="container-site flex h-10 items-center justify-between text-[0.8125rem]">
          <a
            href={org.listenLive}
            target="_blank"
            rel="noopener noreferrer"
            className="group inline-flex items-center gap-2 font-medium hover:text-white"
          >
            <span className="relative flex size-2">
              <span className="absolute inline-flex size-full animate-ping rounded-full bg-red-400 opacity-75 motion-reduce:hidden" />
              <span className="relative inline-flex size-2 rounded-full bg-red-500" />
            </span>
            <Radio aria-hidden className="size-4" />
            Muzik Xpose&apos; Radio: the Voice of the County
            <span className="text-gold-300 underline-offset-4 group-hover:underline">Listen live</span>
            <span className="sr-only">(opens in a new tab)</span>
          </a>
          <div className="flex items-center gap-6">
            <a href={org.phoneHref} className="inline-flex items-center gap-2 hover:text-white">
              <Phone aria-hidden className="size-3.5" />
              {org.phone}
            </a>
            <a href={`mailto:${org.email}`} className="inline-flex items-center gap-2 hover:text-white">
              <Mail aria-hidden className="size-3.5" />
              Email us
            </a>
          </div>
        </div>
      </div>

      <header
        className={`sticky top-0 z-50 transition-[background-color,box-shadow,border-color] duration-300 ${
          scrolled
            ? "border-b border-line/80 bg-white/90 shadow-[0_8px_30px_-12px_rgb(0_20_46/0.18)] backdrop-blur-xl"
            : "border-b border-transparent bg-white"
        }`}
      >
        <div className="container-site flex h-[4.5rem] items-center justify-between gap-6 lg:h-20">
          <Link href="/" className="shrink-0" aria-label={`${org.short} home`}>
            <Image
              src="/logo-pgccdc.png"
              alt=""
              width={314}
              height={105}
              priority
              className="h-11 w-auto lg:h-[3.25rem]"
            />
          </Link>

          <nav aria-label="Main" className="hidden lg:block">
            <ul className="flex items-center gap-1">
              {mainNav.map((item) =>
                item.href === "/programs" ? (
                  <li key={item.href}>
                    <ProgramsMenu
                      open={programsOpen}
                      setOpen={setProgramsOpen}
                      active={isActive(pathname, item.href)}
                    />
                  </li>
                ) : (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      aria-current={isActive(pathname, item.href) ? "page" : undefined}
                      className="relative inline-flex min-h-11 items-center rounded-full px-4 text-[0.9375rem] font-semibold text-navy-900 transition-colors hover:bg-blue-50 aria-[current=page]:text-blue-600 aria-[current=page]:after:absolute aria-[current=page]:after:inset-x-4 aria-[current=page]:after:bottom-1.5 aria-[current=page]:after:h-0.5 aria-[current=page]:after:rounded-full aria-[current=page]:after:bg-gold-500"
                    >
                      {item.label}
                    </Link>
                  </li>
                ),
              )}
            </ul>
          </nav>

          <div className="flex items-center gap-2">
            <Link
              href="/donate"
              className="inline-flex min-h-11 items-center gap-2 rounded-full bg-gold-500 px-5 text-[0.9375rem] font-bold text-navy-950 shadow-[0_6px_16px_-6px_rgb(201_138_18/0.7)] transition hover:-translate-y-px hover:bg-gold-300"
            >
              <Heart aria-hidden className="size-4 fill-navy-950/15" />
              Donate
            </Link>
            <button
              type="button"
              onClick={() => setMenuOpen(true)}
              className="inline-flex size-11 items-center justify-center rounded-full text-navy-900 hover:bg-blue-50 lg:hidden"
              aria-label="Open menu"
              aria-haspopup="dialog"
              aria-expanded={menuOpen}
            >
              <Menu aria-hidden className="size-6" />
            </button>
          </div>
        </div>
      </header>

      <MobileMenu open={menuOpen} onClose={() => setMenuOpen(false)} pathname={pathname} />
    </>
  );
}

function ProgramsMenu({
  open,
  setOpen,
  active,
}: {
  open: boolean;
  setOpen: (v: boolean) => void;
  active: boolean;
}) {
  const panelId = useId();
  const wrapRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const hoverTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setOpen(false);
        buttonRef.current?.focus();
      }
    };
    const onPointer = (e: PointerEvent) => {
      if (!wrapRef.current?.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("keydown", onKey);
    document.addEventListener("pointerdown", onPointer);
    return () => {
      document.removeEventListener("keydown", onKey);
      document.removeEventListener("pointerdown", onPointer);
    };
  }, [open, setOpen]);

  const hover = (next: boolean) => {
    if (hoverTimer.current) clearTimeout(hoverTimer.current);
    hoverTimer.current = setTimeout(() => setOpen(next), next ? 60 : 180);
  };

  return (
    <div
      ref={wrapRef}
      className="relative"
      onPointerEnter={(e) => e.pointerType === "mouse" && hover(true)}
      onPointerLeave={(e) => e.pointerType === "mouse" && hover(false)}
      onBlur={(e) => {
        if (!wrapRef.current?.contains(e.relatedTarget as Node)) setOpen(false);
      }}
    >
      <button
        ref={buttonRef}
        type="button"
        aria-expanded={open}
        aria-controls={panelId}
        onClick={() => setOpen(!open)}
        className={`relative inline-flex min-h-11 items-center gap-1.5 rounded-full px-4 text-[0.9375rem] font-semibold transition-colors hover:bg-blue-50 ${
          active ? "text-blue-600 after:absolute after:inset-x-4 after:bottom-1.5 after:h-0.5 after:rounded-full after:bg-gold-500" : "text-navy-900"
        }`}
      >
        Signature Programs
        <ChevronDown aria-hidden className={`size-4 transition-transform duration-300 ${open ? "rotate-180" : ""}`} />
      </button>

      <div
        id={panelId}
        hidden={!open}
        className="absolute left-1/2 top-full w-[min(56rem,calc(100vw-4rem))] -translate-x-1/2 pt-3"
      >
        <div className="overflow-hidden rounded-[var(--radius-lg)] border border-line bg-white shadow-[var(--shadow-lift)]">
          <div className="grid grid-cols-[1fr_17rem]">
            <ul className="grid grid-cols-2 gap-1 p-3">
              {programs.map((p) => (
                <li key={p.slug}>
                  <Link
                    href={p.href}
                    className="group flex gap-4 rounded-[var(--radius-md)] p-3 transition-colors hover:bg-blue-50"
                  >
                    <Image
                      src={p.image}
                      alt=""
                      sizes="96px"
                      className="size-20 shrink-0 rounded-[0.625rem] object-cover"
                    />
                    <span>
                      <span className="eyebrow block text-[0.6875rem] text-blue-700">{p.tag}</span>
                      <span className="mt-1 block font-display text-lg font-semibold leading-tight text-navy-900 group-hover:text-blue-700">
                        {p.title}
                      </span>
                      <span className="mt-1 line-clamp-2 text-[0.8125rem] leading-snug text-ink-soft">
                        {p.summary}
                      </span>
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
            <div className="flex flex-col justify-between bg-navy-900 p-6 text-white on-dark">
              <div>
                <p className="eyebrow text-gold-300">Signature Programs</p>
                <p className="mt-3 font-display text-2xl leading-tight">
                  Health, opportunity and culture, built with residents.
                </p>
              </div>
              <Link
                href="/programs"
                className="mt-6 inline-flex min-h-11 items-center gap-2 font-semibold text-gold-300 hover:text-white"
              >
                View all programs <ArrowRight aria-hidden className="size-4" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function MobileMenu({ open, onClose, pathname }: { open: boolean; onClose: () => void; pathname: string }) {
  const dialogRef = useRef<HTMLDivElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);
  const titleId = useId();

  const trapFocus = useCallback((e: KeyboardEvent) => {
    if (e.key !== "Tab" || !dialogRef.current) return;
    const focusables = dialogRef.current.querySelectorAll<HTMLElement>("a[href], button:not([disabled])");
    const first = focusables[0];
    const last = focusables[focusables.length - 1];
    if (e.shiftKey && document.activeElement === first) {
      e.preventDefault();
      last.focus();
    } else if (!e.shiftKey && document.activeElement === last) {
      e.preventDefault();
      first.focus();
    }
  }, []);

  useEffect(() => {
    if (!open) return;
    const previouslyFocused = document.activeElement as HTMLElement | null;
    closeRef.current?.focus();
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      trapFocus(e);
    };
    document.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      document.removeEventListener("keydown", onKey);
      previouslyFocused?.focus();
    };
  }, [open, onClose, trapFocus]);

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-[60] lg:hidden">
      <div className="absolute inset-0 bg-navy-950/50 backdrop-blur-sm" onClick={onClose} aria-hidden />
      <div
        ref={dialogRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
        className="absolute inset-y-0 right-0 flex w-full max-w-sm flex-col overflow-y-auto bg-white shadow-2xl"
      >
        <div className="flex h-[4.5rem] items-center justify-between border-b border-line px-5">
          <p id={titleId} className="font-display text-xl font-semibold text-navy-900">
            Menu
          </p>
          <button
            ref={closeRef}
            type="button"
            onClick={onClose}
            className="inline-flex size-11 items-center justify-center rounded-full text-navy-900 hover:bg-blue-50"
            aria-label="Close menu"
          >
            <X aria-hidden className="size-6" />
          </button>
        </div>

        <nav aria-label="Mobile" className="flex-1 px-5 py-4">
          <ul className="divide-y divide-line">
            <li>
              <MobileLink href="/" pathname={pathname}>
                Home
              </MobileLink>
            </li>
            <li>
              <MobileLink href="/about" pathname={pathname}>
                About
              </MobileLink>
            </li>
            <li className="py-2">
              <MobileLink href="/programs" pathname={pathname}>
                Signature Programs
              </MobileLink>
              <ul className="mb-2 ml-1 border-l-2 border-gold-500 pl-4">
                {programs.map((p) => (
                  <li key={p.slug}>
                    <Link
                      href={p.href}
                      aria-current={pathname === p.href ? "page" : undefined}
                      className="flex min-h-11 items-center text-[0.9375rem] font-medium text-ink-soft hover:text-blue-700 aria-[current=page]:text-blue-700"
                    >
                      {p.title}
                    </Link>
                  </li>
                ))}
              </ul>
            </li>
            <li>
              <MobileLink href="/partnerships" pathname={pathname}>
                Strategic Partnerships
              </MobileLink>
            </li>
            <li>
              <MobileLink href="/donate" pathname={pathname}>
                Donate
              </MobileLink>
            </li>
            <li>
              <MobileLink href="/contact" pathname={pathname}>
                Contact
              </MobileLink>
            </li>
          </ul>
        </nav>

        <div className="space-y-3 border-t border-line bg-cream p-5">
          <Link
            href="/donate"
            className="flex min-h-12 w-full items-center justify-center gap-2 rounded-full bg-gold-500 font-bold text-navy-950"
          >
            <Heart aria-hidden className="size-4" /> Donate
          </Link>
          <a
            href={org.listenLive}
            target="_blank"
            rel="noopener noreferrer"
            className="flex min-h-12 w-full items-center justify-center gap-2 rounded-full border-2 border-navy-900 font-semibold text-navy-900"
          >
            <Radio aria-hidden className="size-4" /> Listen live
            <span className="sr-only">(opens in a new tab)</span>
          </a>
          <p className="pt-2 text-center text-sm text-ink-soft">
            <a href={org.phoneHref} className="font-semibold text-navy-900 underline-offset-4 hover:underline">
              {org.phone}
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}

function MobileLink({ href, pathname, children }: { href: string; pathname: string; children: React.ReactNode }) {
  return (
    <Link
      href={href}
      aria-current={pathname === href ? "page" : undefined}
      className="flex min-h-14 items-center font-display text-2xl font-medium text-navy-900 aria-[current=page]:text-blue-600"
    >
      {children}
    </Link>
  );
}
