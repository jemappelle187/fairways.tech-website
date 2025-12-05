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
    title: "Banks & lenders",
    description: "Lend to rural customers with real data instead of guesswork.",
    icon: Landmark,
    bullets: [
      "See verified farmer profiles, crops, and repayment history",
      "Use data that aligns with AML/CFT and local regulations",
      "Your capital finances inputs and services through controlled disbursement channels — with a clear audit trail instead of informal cash flows"
    ]
  },
  {
    title: "Farmer groups & cooperatives",
    description: "Help your members access finance and markets as a group.",
    icon: Users2,
    bullets: [
      "Register members digitally with agent support",
      "Track loans and repayments at member and group level",
      "Members access finance as inputs, services, and group purchases delivered through trusted partners — strengthening production without requiring cash disbursements"
    ]
  },
  {
    title: "Buyers & off-takers",
    description: "Secure reliable, traceable volumes from verified farms.",
    icon: Store,
    bullets: [
      "See who grows your produce and where",
      "Use planting and harvest data to plan sourcing",
      "Meet traceability and quality requirements more easily"
    ]
  },
  {
    title: "Development & impact partners",
    description: "Turn funding into measurable, farmer-level outcomes.",
    icon: Globe2,
    bullets: [
      "Track funds from disbursement to on-farm results",
      "Monitor financial inclusion and livelihood improvements",
      "Access dashboards and exportable data for SDG reporting"
    ]
  },
  {
    title: "Governments & regulators",
    description: "Gain visibility into rural finance and food security.",
    icon: ShieldCheck,
    bullets: [
      "See anonymized trends in rural lending and repayment",
      "Monitor inclusion and early stress signals in the system",
      "Ensure rural finance follows AML/CFT and data rules"
    ]
  },
  {
    title: "Knowledge partners",
    description: "Track training impact with measurable field-level data.",
    icon: GraduationCap,
    bullets: [
      "See behavior change and yield improvements after training",
      "Link training programs to farmer outcomes and practices",
      "Validate program effectiveness with real farm data"
    ]
  }
];

function VideoHero() {
  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

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
      
      {/* Hero Text Overlay */}
      <div className="relative z-20 flex min-h-[500px] md:min-h-[700px] items-center justify-center px-6 py-20">
        <div className="mx-auto max-w-4xl text-center">
          {/* Dark background for better text contrast */}
          <div className="rounded-3xl bg-black/40 backdrop-blur-sm px-8 py-12 sm:px-12 sm:py-16">
            <h1 className="text-4xl font-bold text-white sm:text-5xl lg:text-6xl">
              Finance that reaches real farmers.
            </h1>
            <p className="mt-6 text-lg leading-relaxed text-white/95 sm:text-xl">
              Fairways.Tech connects smallholder farmers, local agents, and banks so rural communities can access fair, compliant finance in the form of inputs and services.
            </p>
            <div className="mt-8 flex flex-col gap-4 sm:flex-row sm:justify-center">
              <button
                onClick={() => scrollToSection('cta')}
                className="inline-flex items-center justify-center rounded-full bg-forest px-8 py-4 text-base font-semibold text-white shadow-lg transition hover:bg-forest/90 focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-black/50"
              >
                Partner with us
              </button>
              <button
                onClick={() => scrollToSection('solution')}
                className="inline-flex items-center justify-center rounded-full border-2 border-white bg-transparent px-8 py-4 text-base font-semibold text-white shadow-lg transition hover:bg-white/10 focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-black/50"
              >
                See how it works
              </button>
            </div>
          </div>
        </div>
      </div>

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

// Custom hook for fade-in animations on scroll
function useFadeInOnScroll() {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!ref.current) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1, rootMargin: "0px 0px -50px 0px" }
    );

    observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return { ref, isVisible };
}

export default function HomePage() {
  const [statsInView, setStatsInView] = useState(false);
  const statsRef = useRef<HTMLDivElement | null>(null);
  
  // Fade-in hooks for each section
  const reachCardsFade = useFadeInOnScroll();
  const partnershipCardsFade = useFadeInOnScroll();
  const approachCardsFade = useFadeInOnScroll();

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
        
        {/* WHY WE EXIST */}
        <section id="why" className="bg-sand px-6 py-16 sm:py-20">
          <div className="mx-auto max-w-4xl">
            <div className="text-center">
              <p className="text-sm font-semibold uppercase tracking-[0.2em] text-forest">
                Why we exist
              </p>
              <h2 className="mt-2 text-2xl font-semibold text-stone sm:text-3xl">
                The gap between farmers and finance
              </h2>
            </div>
            <div className="mt-8 space-y-6 text-base leading-relaxed text-slate-800 sm:text-lg">
              <p>
                Smallholder farmers grow much of Africa&apos;s food, but most can&apos;t access affordable loans. Banks want to serve rural communities, but don&apos;t have reliable data about farms, production, or repayment behaviour.
              </p>
              <p>
                Fairways.Tech bridges this gap. Working with local agents and cooperatives, we turn real farm activity into verified digital records that licensed banks can trust. Farmers receive seeds, fertilizer, labour, and other essential services through our partner network, while banks provide the underlying liquidity through controlled, compliant fund flows.
              </p>
            </div>
          </div>
        </section>

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
                    Fairways.Tech is a digital platform that helps smallholder farmers access finance from licensed banks and financial institutions.
                  </p>
                  <p className="mt-3 max-w-2xl text-sm leading-relaxed text-stone-700 sm:text-[15px]">
                    We capture simple but powerful information — fields, crops, seasons, transactions, and repayments — through local agents and cooperatives. Licensed banks provide the liquidity, while our rails route funds directly to input suppliers and service providers. Farmers receive the support they need at the right moment, and banks see a clear, compliant flow of funds instead of cash leaking into the informal economy.
                  </p>
                  <ul className="mt-6 space-y-3 text-[15px] leading-relaxed text-slate-800">
                    <li className="flex items-start gap-3">
                      <Leaf
                        className="mt-0.5 h-5 w-5 shrink-0 text-forest"
                        strokeWidth={2.4}
                      />
                      <span>
                        <strong>Verified farmer profiles</strong> — Digital profiles that show who the farmer is, where they farm, what they grow, and how they perform over time.
                      </span>
                    </li>
                    <li className="flex items-start gap-3">
                      <Leaf
                        className="mt-0.5 h-5 w-5 shrink-0 text-forest"
                        strokeWidth={2.4}
                      />
                      <span>
                        <strong>Farm-to-market tracking</strong> — A clear record of inputs, harvests, and sales so partners can see how crops move through the value chain.
                      </span>
                    </li>
                    <li className="flex items-start gap-3">
                      <Leaf
                        className="mt-0.5 h-5 w-5 shrink-0 text-forest"
                        strokeWidth={2.4}
                      />
                      <span>
                        <strong>Bank-ready data</strong> — Data that is structured, traceable, and aligned with AML/CFT and KYC standards, so institutions can plug it into their existing risk processes.
                      </span>
                    </li>
                  </ul>
                </div>
                <div className="mt-10 flex items-center justify-center lg:mt-0 lg:justify-end">
                  {/* Mobile: Full-width with taller aspect ratio */}
                  <div className="relative w-full overflow-hidden rounded-2xl sm:rounded-3xl lg:hidden">
                    <div className="relative w-full" style={{ paddingBottom: '56.25%' }}>
                      <video
                        autoPlay
                        loop
                        muted
                        playsInline
                        aria-label="Video demonstrating digital farm profiles, value chain tracking, and bank-ready finance infrastructure"
                        className="absolute inset-0 h-full w-full object-cover rounded-2xl sm:rounded-3xl"
                        style={{ backgroundColor: 'transparent' }}
                      >
                        <source src="/videos/section2.mp4?v=3" type="video/mp4" />
                        <p>Video showing how Fairways.Tech creates digital farm profiles, tracks value chains, and provides bank-ready financial infrastructure for smallholder farmers.</p>
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

          {/* WHO WE SERVE */}
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
        Who we serve
      </p>
      <h2 className="mt-2 text-xl font-semibold text-white sm:text-2xl">
        Built for partners across the value chain
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

    <div className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-3" ref={partnershipCardsFade.ref}>
      {partnershipCards.map((card, index) => {
        const Icon = card.icon;
        return (
          <div
            key={card.title}
            className={`flex h-full flex-col items-start justify-start rounded-3xl border border-white/40 bg-white/80 p-6 shadow-lg shadow-black/10 backdrop-blur-sm transition-all duration-700 ease-out ${
              partnershipCardsFade.isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`}
            style={{ transitionDelay: partnershipCardsFade.isVisible ? `${index * 100}ms` : '0ms' }}
          >
            <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-full bg-forest/10">
              <Icon className="h-5 w-5 text-forest" strokeWidth={2.2} />
            </div>
            <h3 className="text-base font-semibold text-slate-900">
              {card.title}
            </h3>
            <p className="mt-2 text-sm leading-relaxed text-slate-700">
              {card.description}
            </p>
            <ul className="mt-3 space-y-2 text-sm text-slate-700">
              {card.bullets.map((bullet, i) => (
                <li key={i} className="flex items-start gap-2">
                  <span className="text-forest mt-0.5">✓</span>
                  <span>{bullet}</span>
                </li>
              ))}
            </ul>
          </div>
        );
      })}
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

    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3" ref={approachCardsFade.ref}>
      <div className={`flex h-full flex-col items-center justify-start rounded-3xl border border-white/40 bg-white/80 p-6 text-center shadow-lg shadow-black/10 backdrop-blur-sm transition-all duration-700 ease-out ${
        approachCardsFade.isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
      }`}>
        <h3 className="text-base font-semibold text-slate-900">
          Data that unlocks finance
        </h3>
        <p className="mx-auto mt-2 max-w-xs text-[15px] leading-relaxed text-slate-700">
          Trusted farm and value-chain data that makes production and risk
          visible, enabling banks to serve rural communities with confidence.
        </p>
      </div>
      <div className={`flex h-full flex-col items-center justify-start rounded-3xl border border-white/40 bg-white/80 p-6 text-center shadow-lg shadow-black/10 backdrop-blur-sm transition-all duration-700 ease-out ${
        approachCardsFade.isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
      }`} style={{ transitionDelay: approachCardsFade.isVisible ? '150ms' : '0ms' }}>
        <h3 className="text-base font-semibold text-slate-900">
          Systems banks can trust
        </h3>
        <p className="mx-auto mt-2 max-w-xs text-[15px] leading-relaxed text-slate-700">
          Clear records of farm activity that banks and regulators can verify, transforming how institutions assess and serve rural markets.
        </p>
      </div>
      <div className={`flex h-full flex-col items-center justify-start rounded-3xl border border-white/40 bg-white/80 p-6 text-center shadow-lg shadow-black/10 backdrop-blur-sm transition-all duration-700 ease-out ${
        approachCardsFade.isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
      }`} style={{ transitionDelay: approachCardsFade.isVisible ? '300ms' : '0ms' }}>
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
                  We&apos;re building a network of verified farmers, local agents, and financial institutions across Africa, Asia, and Europe. Our platform makes rural lending safer and more affordable.
                </p>
              </div>

              <div className="grid gap-6 sm:grid-cols-3" ref={reachCardsFade.ref}>
                {/* COUNTRIES */}
                <div className={`group relative overflow-hidden rounded-[32px] border border-white/45 bg-white/5 backdrop-blur-xl shadow-[0_18px_45px_rgba(15,23,42,0.18)] transition-all duration-700 ease-out will-change-transform hover:-translate-y-1 hover:shadow-[0_26px_60px_rgba(15,23,42,0.28)] ${
                  reachCardsFade.isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
                }`}>
                  {/* Background video */}
                  <div className="pointer-events-none absolute inset-0 overflow-hidden rounded-[32px] will-change-transform transition-transform duration-300 ease-out group-hover:scale-110 group-hover:brightness-110">
                    <video
                      autoPlay
                      loop
                      muted
                      playsInline
                      aria-hidden="true"
                      className="h-full w-full object-cover opacity-90"
                    >
                      <source src="/videos/globe_video (400 x 400 px)2.mp4" type="video/mp4" />
                    </video>
                  </div>
                  {/* Single glass gradient overlay */}
                  <div className="pointer-events-none absolute inset-0 rounded-[32px] bg-gradient-to-b from-white/20 via-white/30 to-white/50 opacity-85 transition-opacity duration-200 ease-out group-hover:opacity-60" />
                  {/* Content */}
                  <div className="relative z-10 flex h-full flex-col items-center justify-center px-8 py-10 text-center transition-transform duration-200 ease-out group-hover:-translate-y-0.5">
                    <p className="mb-4 text-sm font-bold tracking-[0.28em] text-black" style={{ textShadow: "0 1px 3px rgba(0, 0, 0, 0.3)" }}>
                      COUNTRIES
                    </p>
                    <p className="mb-5 text-6xl sm:text-7xl font-bold tracking-tight text-black" style={{ textShadow: "0 2px 6px rgba(0, 0, 0, 0.4)" }}>
                      <Counter target={statsInView ? 3 : 0} suffix="+" />
                    </p>
                    <p className="text-base font-semibold leading-relaxed text-black" style={{ textShadow: "0 1px 2px rgba(0, 0, 0, 0.2)" }}>
                      Growing network across Africa, Asia and Europe, expanding
                      trusted systems for rural finance – so farmers can access finance regardless of location.
                    </p>
                  </div>
                </div>

                {/* FARMERS */}
                <div className={`group relative overflow-hidden rounded-[32px] border border-white/45 bg-white/5 backdrop-blur-xl shadow-[0_18px_45px_rgba(15,23,42,0.18)] transition-all duration-700 ease-out will-change-transform hover:-translate-y-1 hover:shadow-[0_26px_60px_rgba(15,23,42,0.28)] ${
                  reachCardsFade.isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
                }`} style={{ transitionDelay: reachCardsFade.isVisible ? '150ms' : '0ms' }}>
                  {/* Background image */}
                  <div className="pointer-events-none absolute inset-0 overflow-hidden rounded-[32px] will-change-transform transition-transform duration-300 ease-out group-hover:scale-110 group-hover:brightness-110">
                    <Image
                      src="/images/farmers_card.png"
                      alt="Smallholder and horticultural farmers"
                      fill
                      className="h-full w-full object-cover opacity-90"
                      sizes="(min-width: 1024px) 33vw, 100vw"
                    />
                  </div>
                  {/* Single glass gradient overlay */}
                  <div className="pointer-events-none absolute inset-0 rounded-[32px] bg-gradient-to-b from-white/20 via-white/30 to-white/50 opacity-85 transition-opacity duration-200 ease-out group-hover:opacity-60" />
                  {/* Content */}
                  <div className="relative z-10 flex h-full flex-col items-center justify-center px-8 py-10 text-center transition-transform duration-200 ease-out group-hover:-translate-y-0.5">
                    <p className="mb-4 text-sm font-bold tracking-[0.28em] text-black" style={{ textShadow: "0 1px 3px rgba(0, 0, 0, 0.3)" }}>
                      FARMERS
                    </p>
                    <p className="mb-5 text-6xl sm:text-7xl font-bold tracking-tight text-black" style={{ textShadow: "0 2px 6px rgba(0, 0, 0, 0.4)" }}>
                      <Counter target={statsInView ? 250 : 0} suffix="+" />
                    </p>
                    <p className="text-base font-semibold leading-relaxed text-black" style={{ textShadow: "0 1px 2px rgba(0, 0, 0, 0.2)" }}>
                      Smallholder and horticultural farmers unlocking fair, scalable
                      finance through verified profiles – each with verified profiles and transaction history.
                    </p>
                  </div>
                </div>

                {/* COMMUNITY AGENTS */}
                <div className={`group relative overflow-hidden rounded-[32px] border border-white/45 bg-white/5 backdrop-blur-xl shadow-[0_18px_45px_rgba(15,23,42,0.18)] transition-all duration-700 ease-out will-change-transform hover:-translate-y-1 hover:shadow-[0_26px_60px_rgba(15,23,42,0.28)] ${
                  reachCardsFade.isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
                }`} style={{ transitionDelay: reachCardsFade.isVisible ? '300ms' : '0ms' }}>
                  {/* Background video */}
                  <div className="pointer-events-none absolute inset-0 overflow-hidden rounded-[32px] will-change-transform transition-transform duration-300 ease-out group-hover:scale-110 group-hover:brightness-110">
                    <video
                      autoPlay
                      loop
                      muted
                      playsInline
                      aria-hidden="true"
                      className="h-full w-full object-cover opacity-90"
                    >
                      <source src="/videos/farmer_agent_video.mp4" type="video/mp4" />
                    </video>
                  </div>
                  {/* Glass overlay */}
                  <div className="pointer-events-none absolute inset-0 rounded-[32px] bg-gradient-to-b from-white/20 via-white/30 to-white/50 opacity-85 transition-opacity duration-200 ease-out group-hover:opacity-60" />
                  {/* Content */}
                  <div className="relative z-10 flex h-full flex-col items-center justify-center px-8 py-10 text-center transition-transform duration-200 ease-out group-hover:-translate-y-0.5">
                    <p className="mb-4 text-sm font-bold tracking-[0.28em] text-black" style={{ textShadow: "0 1px 3px rgba(0, 0, 0, 0.3)" }}>
                      COMMUNITY AGENTS
                    </p>
                    <p className="mb-5 text-6xl sm:text-7xl font-bold tracking-tight text-black" style={{ textShadow: "0 2px 6px rgba(0, 0, 0, 0.4)" }}>
                      <Counter target={statsInView ? 30 : 0} suffix="+" />
                    </p>
                    <p className="text-base font-semibold leading-relaxed text-black" style={{ textShadow: "0 1px 2px rgba(0, 0, 0, 0.2)" }}>
                      Local field agents and cooperatives connecting real farms to
                      our digital platform – ensuring every farmer profile is real and up-to-date.
                    </p>
                  </div>
                </div>
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