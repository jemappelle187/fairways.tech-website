"use client";

import { useState, useEffect, useRef, Suspense } from "react";
import Image from "next/image";
import { useSearchParams } from "next/navigation";
import { track } from "@/lib/umami";
import { ContactCta } from "./components/ContactCta";
import { CookieBanner } from "./components/CookieBanner";
import { Leaf, Landmark, Users2, Store, GraduationCap, Globe2, ShieldCheck } from "lucide-react";
import { Header, Footer } from "./components/SiteChrome";

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

const partnershipCards = [
  {
    title: "Local financial institutions",
    description: "Unlock scalable, risk-aware rural finance with trusted data.",
    icon: Landmark
  },
  {
    title: "Farmer groups",
    description: "Enable community onboarding and structured workflows that scale.",
    icon: Users2
  },
  {
    title: "Market partners",
    description: "Access reliable volumes and transparent sourcing from verified farms.",
    icon: Store
  },
  {
    title: "Knowledge partners",
    description: "Deliver training, validation and field support that builds capacity.",
    icon: GraduationCap
  },
  {
    title: "Development partners",
    description: "Generate traceable impact data and achieve aligned goals.",
    icon: Globe2
  },
  {
    title: "Government & regulators",
    description: "Enable food security, inclusion and resilient systems at scale.",
    icon: ShieldCheck
  }
];

function VideoHero() {
  return (
    <section id="video-hero" className="relative overflow-hidden md:py-20 md:min-h-[700px]">
      {/* Video background */}
      <video
        autoPlay
        loop
        muted
        playsInline
        aria-label="Hero video showcasing Fairways.Tech digital infrastructure for smallholder farmers"
        className="relative z-0 w-full h-auto object-contain md:absolute md:inset-0 md:h-full md:object-cover"
      >
        <source src="/videos/FAIRWAYS.TECH _Hero.mp4" type="video/mp4" />
        <p>Video showing Fairways.Tech&apos;s mission to build digital infrastructure for African smallholder farmers.</p>
      </video>
      {/* Dark overlay - hidden on mobile/tablet, visible on desktop */}
      <div className="absolute inset-0 z-0 bg-black/30 hidden md:block" />
      {/* Top gradient fade */}
      <div className="pointer-events-none absolute inset-x-0 top-0 z-10 h-24 bg-gradient-to-b from-sand via-sand/40 to-transparent" />
      {/* Bottom gradient fade */}
      <div className="pointer-events-none absolute inset-x-0 bottom-0 z-10 h-24 bg-gradient-to-b from-transparent via-sand/10 to-sand" />
    </section>
  );
}

function ViaTracker() {
  const searchParams = useSearchParams();
  const via = searchParams.get("via");

  useEffect(() => {
    if (via) {
      track(`via_${via}`);
    }
  }, [via]);

  return null;
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
      { threshold: 0.1, rootMargin: "0px 0px -100px 0px" }
    );

    observer.observe(statsRef.current);

    return () => observer.disconnect();
  }, []);

  return (
    <>
      <Suspense fallback={null}>
        <ViaTracker />
      </Suspense>
      <Header />
      <main id="main-content" className="flex flex-col gap-20 pb-20">
        <VideoHero />
        <div className="flex flex-col gap-20">
          {/* SOLUTION - ORIGINAL WITH CIRCLES (BACKUP - COMMENTED OUT)
          <section id="solution-circles-backup" className="bg-sand px-6 py-24 sm:py-28 lg:px-24">
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
                    Fairways.Tech is a community-driven agri-fintech ecosystem that
                    transforms fragmented farm activity into trusted, structured data.
                    We capture field, crop, and transaction flows to unlock finance
                    and markets for smallholder farmers, enabling banks and partners
                    to serve rural communities with confidence.
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
          END BACKUP */}

          {/* SOLUTION - VIDEO VERSION (ACTIVE) */}
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
                    Fairways.Tech is a community-driven agri-fintech ecosystem that
                    transforms fragmented farm activity into trusted, structured data.
                    We capture field, crop, and transaction flows to unlock finance
                    and markets for smallholder farmers, enabling banks and partners
                    to serve rural communities with confidence.
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
                <div className="mt-10 flex items-center justify-center lg:mt-0 lg:justify-end">
                  {/* Mobile: Responsive with aspect ratio */}
                  <div className="relative w-full overflow-hidden rounded-2xl sm:rounded-3xl lg:hidden">
                    <div className="relative w-full" style={{ paddingBottom: '41.5%' }}>
                      <video
                        autoPlay
                        loop
                        muted
                        playsInline
                        aria-label="Video demonstrating digital farm profiles, value chain tracking, and compliance-first finance infrastructure"
                        className="absolute inset-0 h-full w-full object-cover rounded-2xl sm:rounded-3xl"
                        style={{ backgroundColor: 'transparent' }}
                      >
                        <source src="/videos/section2.mp4?v=3" type="video/mp4" />
                        <p>Video showing how Fairways.Tech creates digital farm profiles, tracks value chains, and provides compliance-first financial infrastructure for smallholder farmers.</p>
                      </video>
                    </div>
                  </div>
                  {/* Desktop: Fixed 800x332px */}
                  <div className="relative hidden overflow-hidden rounded-3xl lg:block" style={{ width: '800px', height: '332px' }}>
                    <video
                      autoPlay
                      loop
                      muted
                      playsInline
                      aria-label="Video demonstrating digital farm profiles, value chain tracking, and compliance-first finance infrastructure"
                      className="h-full w-full object-cover rounded-3xl"
                      style={{ backgroundColor: 'transparent' }}
                    >
                      <source src="/videos/section2.mp4?v=3" type="video/mp4" />
                      <p>Video showing how Fairways.Tech creates digital farm profiles, tracks value chains, and provides compliance-first financial infrastructure for smallholder farmers.</p>
                    </video>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* OUR APPROACH */}
        <section
  id="approach"
  className="relative scroll-mt-24 overflow-hidden bg-[#f4efe5] py-20"
>
  {/* Wet leaf background video */}
  <div className="pointer-events-none absolute inset-0">
    <video
      autoPlay
      loop
      muted
      playsInline
      aria-hidden="true"
      className="h-full w-full object-cover"
    >
      <source src="/videos/wetleaf_backgroundvideo.mp4" type="video/mp4" />
    </video>
  </div>

  {/* Dark overlay similar to hero/CTA so text reads well */}
  <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-black/35 via-black/10 to-transparent" />

  {/* Top sand fade – soft roll-in from sand, like hero/CTA */}
  <div className="pointer-events-none absolute inset-x-0 top-0 h-16 bg-gradient-to-b from-[#f4efe5] via-[#f4efe5]/40 to-transparent" />

  {/* Bottom fade to blend into sand, like hero/CTA */}
  <div className="pointer-events-none absolute inset-x-0 bottom-0 h-24 bg-gradient-to-b from-transparent via-[#f4efe5]/35 to-[#f4efe5]" />

  <div className="relative z-10 mx-auto flex max-w-5xl flex-col gap-10 px-6 md:px-8">
    {/* centered heading */}
    <div className="mx-auto max-w-3xl text-center text-white">
      <p className="text-sm font-semibold uppercase tracking-[0.2em] text-white">
        Our approach
      </p>
      <h2 className="mt-2 text-xl font-semibold text-white sm:text-2xl">
        Clear. Compliant. Community-driven.
      </h2>
    </div>

    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
      <div className="flex h-full flex-col items-center justify-start rounded-3xl border border-white/40 bg-white/80 p-6 text-center shadow-lg shadow-black/10 backdrop-blur-sm">
        <h3 className="text-base font-semibold text-slate-900">
          Data that unlocks finance
        </h3>
        <p className="mx-auto mt-2 max-w-xs text-[15px] leading-relaxed text-slate-700">
          Trusted farm and value-chain data that makes production and risk
          visible, enabling banks to serve rural communities with confidence.
        </p>
      </div>
      <div className="flex h-full flex-col items-center justify-start rounded-3xl border border-white/40 bg-white/80 p-6 text-center shadow-lg shadow-black/10 backdrop-blur-sm">
        <h3 className="text-base font-semibold text-slate-900">
          Rails that reduce risk
        </h3>
        <p className="mx-auto mt-2 max-w-xs text-[15px] leading-relaxed text-slate-700">
          Transparent, audit-ready flows that meet international standards,
          transforming how institutions assess and serve rural markets.
        </p>
      </div>
      <div className="flex h-full flex-col items-center justify-start rounded-3xl border border-white/40 bg-white/80 p-6 text-center shadow-lg shadow-black/10 backdrop-blur-sm">
        <h3 className="text-base font-semibold text-slate-900">
          Agents who connect real farms
        </h3>
        <p className="mx-auto mt-2 max-w-xs text-[15px] leading-relaxed text-slate-700">
          Community agents and cooperatives ensuring data stays tied to real
          farmers and real fields, building trust from the ground up.
        </p>
      </div>
    </div>
    <div className="mt-6 text-center text-xs text-white/80">
      <p>
        See how this transforms governance, risk and data flows for rural finance.
      </p>
      <a
        href="/impact"
        className="mt-1 inline-block font-semibold text-white underline underline-offset-4"
      >
        Explore our impact &amp; vision
      </a>
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
                  Reach
                </p>
                <h2 className="mt-2 text-xl font-semibold text-stone sm:text-2xl">
                  Where Fairways.Tech is active
                </h2>
                <p className="mx-auto mt-3 max-w-2xl text-sm text-slate-700 sm:text-[15px]">
                  We partner with farming communities, financial institutions and
                  market actors to transform trusted data into scalable finance and
                  market access.
                </p>
              </div>

              <div className="grid gap-6 sm:grid-cols-3">
                <div className="flex h-full flex-col items-center justify-start rounded-3xl border border-white/40 bg-white/80 p-6 text-center shadow-lg shadow-black/10 backdrop-blur-sm">
                  <p className="text-xs font-semibold uppercase tracking-[0.2em] text-forest">
                    Countries
                  </p>
                  <p className="mt-3 text-3xl font-semibold text-slate-900 sm:text-4xl">
                    <Counter target={statsInView ? 3 : 0} suffix="+" />
                  </p>
                  <p className="mt-2 text-sm text-slate-700">
                    Growing network across Africa, Asia and Europe, expanding
                    trusted rails for rural finance.
                  </p>
                </div>

                <div className="flex h-full flex-col items-center justify-start rounded-3xl border border-white/40 bg-white/80 p-6 text-center shadow-lg shadow-black/10 backdrop-blur-sm">
                  <p className="text-xs font-semibold uppercase tracking-[0.2em] text-forest">
                    Farmers
                  </p>
                  <p className="mt-3 text-3xl font-semibold text-slate-900 sm:text-4xl">
                    <Counter target={statsInView ? 250 : 0} suffix="+" />
                  </p>
                  <p className="mt-2 text-sm text-slate-700">
                    Smallholder and horticultural farmers unlocking fair,
                    scalable finance through trusted data.
                  </p>
                </div>

                <div className="flex h-full flex-col items-center justify-start rounded-3xl border border-white/40 bg-white/80 p-6 text-center shadow-lg shadow-black/10 backdrop-blur-sm">
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
    <div className="mx-auto max-w-3xl text-center text-white">
      <p className="text-sm font-semibold uppercase tracking-[0.2em] text-white">
        Partnerships &amp; ecosystem
      </p>
      <h2 className="mt-2 text-xl font-semibold text-white sm:text-2xl">
        Partners who transform rural finance.
      </h2>
      <p className="mt-3 text-white/90 leading-relaxed">
        We collaborate with partners who enable agricultural systems to scale,
        turning local knowledge into trusted, compliant infrastructure.
      </p>
      <div className="mt-2 text-xs text-white/80">
        <p>
          See how these partnerships connect into our governance and data model.
        </p>
        <a
          href="/about"
          className="mt-1 inline-block font-semibold text-white underline underline-offset-4"
        >
          Learn more about Fairways.Tech
        </a>
      </div>
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
                  Fairways.Tech empowers farming communities with trusted digital
                  tools that unlock finance and markets, enabling responsible growth.
                </p>
                <p>
                  We bridge EU regulatory integrity with African agricultural
                  inclusion, creating a transparent, scalable, community-first
                  agri-fintech ecosystem.
                </p>
              </div>
            </div>
          </section>

          <Suspense fallback={<div className="h-64" />}>
            <ContactCta />
          </Suspense>
        </div>
      </main>
      <Footer />
      <CookieBanner />
    </>
  );
}