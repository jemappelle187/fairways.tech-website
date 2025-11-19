"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { ContactCta } from "./components/ContactCta";
import { Leaf, Landmark, Users2, Store, GraduationCap, Globe2, ShieldCheck } from "lucide-react";

const navItems = [
  { id: "hero", label: "Home" },
  { id: "solution", label: "Solution" },
  { id: "approach", label: "Approach" },
  { id: "compliance", label: "At a glance" },
  { id: "partnerships", label: "Partnerships" },
  { id: "mission", label: "Mission" }
];

const solutionVisualItems = [
  {
    src: "/images/digital_farmer2.jpg",
    alt: "Local farmer using a digital device in the field",
    lines: ["DIGITAL FARM", "PROFILES"],
    sizeClass: "h-44 w-44"
  },
  {
    src: "/images/value_chain_qr2.jpg",
    alt: "Fresh produce with QR code for traceability",
    lines: ["VALUE-CHAIN", "TRACEABILITY"],
    sizeClass: "h-40 w-40"
  },
  {
    src: "/images/compliance_first2.jpg",
    alt: "Handshake symbolising compliant finance",
    lines: ["COMPLIANCE-FIRST", "FINANCE"],
    sizeClass: "h-36 w-36"
  }
];

// Simple animated counter for “3+ / 250+ / 30+”
function Counter({ target, suffix = "+" }: { target: number; suffix?: string }) {
  const [value, setValue] = useState(0);

  useEffect(() => {
    // If target is 0 (not yet in view), reset and skip animation
    if (target === 0) {
      setValue(0);
      return;
    }

    let start = 0;
    const duration = 2000; // ms – slower, more premium
    const frames = 80;
    const increment = target / frames;

    let frame = 0;
    const interval = setInterval(() => {
      frame += 1;
      start += increment;
      if (frame >= frames) {
        setValue(target);
        clearInterval(interval);
      } else {
        setValue(Math.round(start));
      }
    }, duration / frames);

    return () => clearInterval(interval);
  }, [target]);

  return (
    <>
      {value}
      {suffix}
    </>
  );
}

function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault();
    setIsMenuOpen(false);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <header className="sticky top-0 z-40 border-b border-stone-200 bg-sand/95 backdrop-blur-sm">
      <div className="mx-auto flex h-20 max-w-6xl items-center gap-8 px-4 sm:px-6 lg:px-8">
        <div className="text-xl font-bold tracking-tight text-forest sm:text-2xl">
          Fairways.Tech
        </div>
        <nav className="hidden items-center gap-8 text-sm font-medium md:flex">
          {navItems.map((item) => (
            <a
              key={item.id}
              href={`#${item.id}`}
              className="text-stone-800 transition-colors hover:text-stone-900 hover:underline underline-offset-4"
            >
              {item.label}
            </a>
          ))}
          <a
            href="/team"
            className="text-stone-800 transition-colors hover:text-stone-900 hover:underline underline-offset-4"
          >
            Team
          </a>
        </nav>
        <button
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          className="p-2 text-stone transition hover:text-forest md:hidden"
          aria-label="Toggle menu"
        >
          <div className="flex h-6 w-6 flex-col justify-center gap-1.5">
            <span
              className={`block h-0.5 w-full bg-current transition-all ${
                isMenuOpen ? "translate-y-2 rotate-45" : ""
              }`}
            />
            <span
              className={`block h-0.5 w-full bg-current transition-all ${
                isMenuOpen ? "opacity-0" : ""
              }`}
            />
            <span
              className={`block h-0.5 w-full bg-current transition-all ${
                isMenuOpen ? "-translate-y-2 -rotate-45" : ""
              }`}
            />
          </div>
        </button>
      </div>
      {isMenuOpen && (
        <nav className="fixed inset-x-0 top-[80px] z-40 border-t border-stone-200 bg-sand/95 backdrop-blur-sm md:hidden">
          <div className="flex min-h-[calc(100vh-80px)] flex-col px-4 pb-6 pt-2">
            <nav className="flex-1 space-y-4 overflow-y-auto pt-2">
              {navItems.map((item) => (
                <a
                  key={item.id}
                  href={`#${item.id}`}
                  onClick={(e) => handleNavClick(e, item.id)}
                  className="block px-4 py-2 text-sm font-medium text-stone-800 transition-colors hover:text-stone-900"
                >
                  {item.label}
                </a>
              ))}
              <a
                href="/team"
                onClick={() => setIsMenuOpen(false)}
                className="block px-4 py-2 text-sm font-medium text-stone-800 transition-colors hover:text-stone-900"
              >
                Team
              </a>
            </nav>
            <div className="pt-4">
              <a
                href="#cta"
                onClick={(e) => handleNavClick(e, "cta")}
                className="block w-full rounded-full border border-forest/30 px-4 py-2 text-center text-sm font-semibold text-forest transition hover:bg-forest hover:text-sand"
              >
                Partner With Us
              </a>
            </div>
          </div>
        </nav>
      )}
    </header>
  );
}

const partnershipCards = [
  {
    title: "Local financial institutions",
    description: "Scalable, risk-aware rural finance.",
    icon: Landmark
  },
  {
    title: "Farmer groups",
    description: "Community onboarding and structured workflows.",
    icon: Users2
  },
  {
    title: "Market partners",
    description: "Reliable volumes and transparent sourcing.",
    icon: Store
  },
  {
    title: "Knowledge partners",
    description: "Training, validation and field support.",
    icon: GraduationCap
  },
  {
    title: "Development partners",
    description: "Traceable impact data and aligned goals.",
    icon: Globe2
  },
  {
    title: "Government & regulators",
    description: "Food security, inclusion and resilient systems.",
    icon: ShieldCheck
  }
];

function Hero() {
  const [scrollY, setScrollY] = useState(0);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    setIsLoaded(true);
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const parallaxOffset = scrollY * 0.5;

  return (
    <section id="hero" className="relative overflow-hidden py-16 sm:py-20">
      {/* Background image with parallax */}
      <div
        className="absolute inset-0 bg-[url('/hero-fairways.jpg')] bg-cover bg-center"
        style={{ transform: `translateY(${parallaxOffset}px)` }}
      />
      {/* Dark overlay */}
      <div className="absolute inset-0 bg-black/30" />
      {/* Bottom fade into sand */}
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-24 bg-gradient-to-b from-transparent via-sand/10 to-sand" />

      <div className="relative mx-auto max-w-5xl px-4 pt-16 sm:px-6 sm:pt-24 lg:px-8">
        {/* Gradient border wrapper */}
        <div
          className={`relative mx-auto max-w-3xl rounded-[36px] bg-gradient-to-r from-forest/45 via-leaf/35 to-amber-300/35 p-[1px] shadow-xl shadow-black/10 transition-all duration-1000 md:-mt-6 lg:-mt-10 ${
            isLoaded ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"
          }`}
        >
          {/* Actual card */}
          <div className="rounded-[32px] border border-white/40 bg-white/80 px-6 py-10 backdrop-blur sm:px-10 sm:py-12">
            <div className="flex flex-col items-center gap-6 text-center lg:gap-8">
              <p
                className={`text-sm font-semibold uppercase tracking-[0.2em] text-leaf transition-all duration-700 delay-100 ${
                  isLoaded
                    ? "translate-y-0 opacity-100"
                    : "translate-y-2 opacity-0"
                }`}
              >
                Community-Driven Agri–Fintech
              </p>
              <h1
                className={`text-3xl font-semibold leading-tight text-stone transition-all duration-700 delay-200 sm:text-4xl ${
                  isLoaded
                    ? "translate-y-0 opacity-100"
                    : "translate-y-2 opacity-0"
                }`}
              >
                Digital infrastructure empowering farmers to scale.
              </h1>
              <p
                className={`mt-2 max-w-xl text-base text-stone/80 transition-all duration-700 delay-300 sm:text-lg ${
                  isLoaded
                    ? "translate-y-0 opacity-100"
                    : "translate-y-2 opacity-0"
                }`}
              >
                Fairways.Tech is a community-driven agri-fintech ecosystem helping
                smallholder farmers and horticultural producers grow beyond survival
                by unlocking fair, compliant, and scalable access to finance,
                markets, and data.
              </p>
              <div
                className={`mt-4 flex flex-wrap justify-center gap-3 text-sm font-medium text-stone transition-all duration-700 delay-400 ${
                  isLoaded
                    ? "translate-y-0 opacity-100"
                    : "translate-y-2 opacity-0"
                }`}
              >
                {[
                  "Community-first",
                  "Compliance-first",
                  "Built for agri & horticulture"
                ].map((quality) => (
                  <span
                    key={quality}
                    className="rounded-full border border-stone-200/70 bg-white/70 px-4 py-1 backdrop-blur-sm"
                  >
                    {quality}
                  </span>
                ))}
              </div>
              <div
                className={`mt-6 flex flex-wrap justify-center gap-3 transition-all duration-700 delay-500 ${
                  isLoaded
                    ? "translate-y-0 opacity-100"
                    : "translate-y-2 opacity-0"
                }`}
              >
                <a
                  href="#cta"
                  className="inline-flex items-center justify-center rounded-full bg-forest px-7 py-3.5 text-sm font-semibold text-sand shadow-md transition hover:bg-leaf"
                >
                  Partner With Us
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-stone-200 bg-sand/95">
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-2 px-6 py-4 text-xs text-slate-500 sm:flex-row">
        <span>© {year} Fairways.Tech. All rights reserved.</span>
        <div className="flex flex-wrap gap-4">
          <a
            href="/terms"
            className="hover:text-slate-700 hover:underline underline-offset-4"
          >
            Terms &amp; Conditions
          </a>
          <a
            href="/disclaimer"
            className="hover:text-slate-700 hover:underline underline-offset-4"
          >
            Disclaimer
          </a>
          <a
            href="/privacy"
            className="hover:text-slate-700 hover:underline underline-offset-4"
          >
            Privacy Policy
          </a>
          <a
            href="/cookies"
            className="hover:text-slate-700 hover:underline underline-offset-4"
          >
            Cookie Policy
          </a>
        </div>
      </div>
    </footer>
  );
}

function CookieBanner() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const accepted = window.localStorage.getItem("fairways_cookie_accepted");
    if (!accepted) {
      setVisible(true);
    }
  }, []);

  const accept = () => {
    if (typeof window !== "undefined") {
      window.localStorage.setItem("fairways_cookie_accepted", "true");
    }
    setVisible(false);
  };

  if (!visible) return null;

  return (
    <div className="fixed inset-x-0 bottom-0 z-50">
      <div className="mx-auto max-w-6xl px-4 pb-4">
        <div className="flex flex-col gap-3 rounded-2xl bg-slate-900/95 px-4 py-3 text-sand shadow-2xl sm:flex-row sm:items-center sm:justify-between sm:px-6 sm:py-4">
          <p className="text-xs leading-relaxed sm:text-sm">
            We use a small number of cookies to keep this site secure, reliable and
            to understand how Fairways.Tech is used.{" "}
            <span className="underline decoration-sand/60 decoration-dotted">
              Learn more
            </span>
            .
          </p>
          <div className="flex items-center justify-end gap-2">
            <button
              type="button"
              onClick={accept}
              className="rounded-full bg-sand px-4 py-2 text-xs font-semibold text-slate-900 shadow-sm hover:bg-white sm:text-sm"
            >
              Accept cookies
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function HomePage() {
  const [statsInView, setStatsInView] = useState(false);
  const statsRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!statsRef.current) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setStatsInView(true);
          observer.disconnect(); // animate once
        }
      },
      { threshold: 0.4 }
    );

    observer.observe(statsRef.current);

    return () => observer.disconnect();
  }, []);

  return (
    <>
      <Header />
      <main className="flex flex-col gap-20 pb-20">
        <Hero />
        <div className="flex flex-col gap-20">
          {/* SOLUTION */}
          <section id="solution" className="bg-sand px-6 py-24 sm:py-28 lg:px-24">
            <div className="mx-auto max-w-6xl">
              <div className="flex flex-col gap-y-12 lg:grid lg:grid-cols-[minmax(0,1.35fr)_minmax(0,0.9fr)] lg:items-center lg:gap-16">
                <div className="max-w-xl lg:max-w-2xl">
                  <p className="text-sm font-semibold uppercase tracking-[0.2em] text-forest">
                    Our solution
                  </p>
                  <h2 className="mt-3 text-3xl font-semibold tracking-tight text-slate-900 sm:text-4xl">
                    A shared digital infrastructure
                    <br />
                    for scalable farming.
                  </h2>
                  <p className="mt-4 max-w-2xl text-sm leading-relaxed text-stone-700 sm:text-[15px]">
                    Farming has the potential to scale — but farmers lack the tools
                    and trust systems that financial institutions require.
                  </p>
                  <p className="mt-3 max-w-2xl text-sm leading-relaxed text-stone-700 sm:text-[15px]">
                    Fairways.Tech turns fragmented farm activity into structured
                    data that banks and partners can trust. We capture field, crop
                    and transaction flows so farmers can access finance and markets
                    at scale.
                  </p>
                  <ul className="mt-6 space-y-3 text-[15px] leading-relaxed text-slate-800">
                    <li className="flex items-start gap-3">
                    <Leaf
  className="mt-0.5 h-5 w-5 shrink-0 text-forest"
  strokeWidth={2.4}
/>
                      <span>
                        <strong>Digital farm profiles</strong> linking fields,
                        seasons, crops and performance.
                      </span>
                    </li>
                    <li className="flex items-start gap-3">
                    <Leaf
  className="mt-0.5 h-5 w-5 shrink-0 text-forest"
  strokeWidth={2.4}
/>
                      <span>
                        <strong>Transparent value-chain flows</strong> from input
                        provision to harvest and sale.
                      </span>
                    </li>
                    <li className="flex items-start gap-3">
                    <Leaf
  className="mt-0.5 h-5 w-5 shrink-0 text-forest"
  strokeWidth={2.4}
/>
                      <span>
                        <strong>Compliance-first rails</strong> that make risk
                        visible for local financial institutions.
                      </span>
                    </li>
                  </ul>
                </div>
                <div className="mt-10 flex flex-col items-center gap-8 text-center lg:mt-0 lg:items-end lg:gap-10 lg:text-left">
                  {solutionVisualItems.map((item) => (
                    <div
                      key={item.alt}
                      className="flex flex-wrap items-center justify-center gap-4 text-center lg:flex-nowrap lg:justify-start lg:gap-6 lg:text-left"
                    >
                      <div
                        className={`relative ${item.sizeClass} overflow-hidden rounded-full shadow-xl ring-1 ring-black/5`}
                      >
                        <Image
                          src={item.src}
                          alt={item.alt}
                          fill
                          className="object-cover"
                        />
                      </div>
                      <p className="text-[11px] font-medium uppercase leading-tight tracking-[0.18em] text-slate-500">
                        {item.lines.map((line) => (
                          <span key={line} className="block">
                            {line}
                          </span>
                        ))}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </section>

          {/* OUR APPROACH */}
<section
  id="approach"
  className="relative scroll-mt-24 overflow-hidden bg-[#f4efe5] py-20"
>
  {/* Wet leaf background */}
  <div className="pointer-events-none absolute inset-0 bg-[url('/images/wet_leaf.png')] bg-cover bg-center" />

  {/* Dark overlay similar to hero/CTA so text reads well */}
  <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-black/35 via-black/10 to-transparent" />

  {/* Top sand fade – soft roll-in from sand, like hero/CTA */}
  <div className="pointer-events-none absolute inset-x-0 top-0 h-16 bg-gradient-to-b from-[#f4efe5] via-[#f4efe5]/40 to-transparent" />

  {/* Bottom fade to blend into sand, like hero/CTA */}
  <div className="pointer-events-none absolute inset-x-0 bottom-0 h-24 bg-gradient-to-b from-transparent via-[#f4efe5]/35 to-[#f4efe5]" />

  <div className="relative z-10 mx-auto flex max-w-5xl flex-col gap-10 px-6 md:px-8">
    {/* centered heading */}
    <div className="mx-auto max-w-3xl text-center">
      <p className="text-sm font-semibold uppercase tracking-[0.2em] text-forest">
        Our approach
      </p>
      <h2 className="mt-2 text-xl font-semibold text-stone sm:text-2xl">
        Clear. Compliant. Community-driven.
      </h2>
    </div>

    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
      <div className="flex h-full flex-col items-center justify-start rounded-3xl border border-white/40 bg-white/80 p-6 text-center shadow-lg shadow-black/10 backdrop-blur-sm">
        <h3 className="text-base font-semibold text-slate-900">
          Data you can trust
        </h3>
        <p className="mx-auto mt-2 max-w-xs text-[15px] leading-relaxed text-slate-700">
          Real farm and value-chain data that makes production and risk visible.
        </p>
      </div>
      <div className="flex h-full flex-col items-center justify-start rounded-3xl border border-white/40 bg-white/80 p-6 text-center shadow-lg shadow-black/10 backdrop-blur-sm">
        <h3 className="text-base font-semibold text-slate-900">
          Compliance-first rails
        </h3>
        <p className="mx-auto mt-2 max-w-xs text-[15px] leading-relaxed text-slate-700">
          Transparent, audit-ready flows that meet international regulatory
          standards.
        </p>
      </div>
      <div className="flex h-full flex-col items-center justify-start rounded-3xl border border-white/40 bg-white/80 p-6 text-center shadow-lg shadow-black/10 backdrop-blur-sm">
        <h3 className="text-base font-semibold text-slate-900">
          Local delivery
        </h3>
        <p className="mx-auto mt-2 max-w-xs text-[15px] leading-relaxed text-slate-700">
          Community agents and cooperatives who keep data tied to real farmers
          and real fields.
        </p>
      </div>
    </div>
  </div>
</section>

          {/* AT A GLANCE / NUMBERS */}
          <section
            id="compliance"
            className="bg-sand py-16 sm:py-20"
            ref={statsRef}
          >
            <div className="mx-auto max-w-6xl space-y-8 px-6 lg:px-8">
              <div className="text-center">
                <p className="text-sm font-semibold uppercase tracking-[0.2em] text-forest">
                  At a glance
                </p>
                <h2 className="mt-2 text-xl font-semibold text-stone sm:text-2xl">
                  Where Fairways.Tech is active
                </h2>
                <p className="mx-auto mt-3 max-w-2xl text-sm text-slate-700 sm:text-[15px]">
                  We partner with farming communities, local financial institutions
                  and market actors to turn trusted data into scalable
                  opportunities.
                </p>
              </div>

              <div className="grid gap-6 sm:grid-cols-3">
                <div className="rounded-3xl bg-white/90 p-6 text-center shadow-sm">
                  <p className="text-xs font-semibold uppercase tracking-[0.2em] text-forest">
                    Countries
                  </p>
                  <p className="mt-3 text-3xl font-semibold text-slate-900 sm:text-4xl">
                    <Counter target={statsInView ? 3 : 0} suffix="+" />
                  </p>
                  <p className="mt-2 text-sm text-slate-700">
                    Building rails across Ghana and the Netherlands, with room to
                    grow.
                  </p>
                </div>

                <div className="rounded-3xl bg-white/90 p-6 text-center shadow-sm">
                  <p className="text-xs font-semibold uppercase tracking-[0.2em] text-forest">
                    Farmers
                  </p>
                  <p className="mt-3 text-3xl font-semibold text-slate-900 sm:text-4xl">
                    <Counter target={statsInView ? 250 : 0} suffix="+" />
                  </p>
                  <p className="mt-2 text-sm text-slate-700">
                    Smallholder and horticultural farmers we aim to support with
                    fair, scalable finance.
                  </p>
                </div>

                <div className="rounded-3xl bg-white/90 p-6 text-center shadow-sm">
                  <p className="text-xs font-semibold uppercase tracking-[0.2em] text-forest">
                    Community agents
                  </p>
                  <p className="mt-3 text-3xl font-semibold text-slate-900 sm:text-4xl">
                    <Counter target={statsInView ? 30 : 0} suffix="+" />
                  </p>
                  <p className="mt-2 text-sm text-slate-700">
                    Local field agents and cooperatives connecting real farms to
                    digital rails.
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* PARTNERSHIPS & ECOSYSTEM */}
<section
  id="partnerships"
  className="relative scroll-mt-24 overflow-hidden bg-[#f4efe5] py-20"
>
  {/* Vegetables background */}
  <div className="pointer-events-none absolute inset-0 bg-[url('/images/farmer_holds_vegetables.png')] bg-cover bg-center" />

  {/* Dark overlay so text + cards stand out, similar to CTA */}
  <div className="pointer-events-none absolute inset-0 bg-black/25" />

  {/* Top sand fade – smooth transition from page background */}
  <div className="pointer-events-none absolute inset-x-0 top-0 h-16 bg-gradient-to-b from-[#f4efe5] via-[#f4efe5]/40 to-transparent" />

  {/* Bottom fade into sand, like hero/approach/CTA */}
  <div className="pointer-events-none absolute inset-x-0 bottom-0 h-24 bg-gradient-to-b from-transparent via-[#f4efe5]/35 to-[#f4efe5]" />

  <div className="relative z-10 mx-auto flex max-w-6xl flex-col gap-10 px-6 md:px-8">
    <div className="mx-auto max-w-3xl text-center">
      <p className="text-sm font-semibold uppercase tracking-[0.2em] text-forest">
        Partnerships &amp; ecosystem
      </p>
      <h2 className="mt-2 text-xl font-semibold text-stone sm:text-2xl">
        Built with local partners, for local communities.
      </h2>
      <p className="mt-3 text-slate-700 leading-relaxed">
        We collaborate with the partners who make agricultural systems work on
        the ground.
      </p>
    </div>

    <div className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {partnershipCards.map((card) => {
        const Icon = card.icon;
        return (
          <div
            key={card.title}
            className="flex h-full flex-col items-center justify-start rounded-3xl border border-white/40 bg-white/80 p-6 text-center shadow-lg shadow-black/10 backdrop-blur-sm"
          >
            <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-full bg-forest/10">
              <Icon className="h-5 w-5 text-forest" strokeWidth={2.2} />
            </div>
            <h3 className="text-base font-semibold text-slate-900">
              {card.title}
            </h3>
            <p className="mt-2 text-[15px] leading-relaxed text-slate-700">
              {card.description}
            </p>
          </div>
        );
      })}
    </div>
  </div>
</section>

          {/* MISSION */}
          <section id="mission" className="py-16 sm:py-20">
            <div className="mx-auto max-w-6xl space-y-6 px-6 lg:px-8">
            <div className="mx-auto max-w-2xl text-center">
  <p className="text-sm font-semibold uppercase tracking-[0.2em] text-forest">
    Community Philosophy
  </p>
  <h2 className="mt-2 text-xl font-semibold text-stone sm:text-2xl">
    Mission & Philosophy
  </h2>
</div>
              <div className="space-y-4 rounded-3xl bg-forest/90 p-6 text-center text-sand shadow-lg sm:p-8">
                <p>
                  Fairways.Tech is built with and for farming communities. We
                  empower them with trusted digital tools to grow responsibly.
                </p>
                <p>
                  We bridge global regulatory integrity with local agricultural
                  inclusion, enabling a transparent, scalable, community-first
                  agri-fintech ecosystem.
                </p>
              </div>
            </div>
          </section>

          <ContactCta />
        </div>
      </main>
      <Footer />
      <CookieBanner />
    </>
  );
}