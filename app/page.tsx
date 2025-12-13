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
    description: "Stop losing to rural risk. Verified records, AML/CFT-ready data, and controlled disbursements you can trust.",
    link: "/about",
    linkText: "See our compliance framework",
    icon: Landmark,
    emoji: "🏦"
  },
  {
    title: "Farmer groups & cooperatives",
    description: "Unlock group power. Digital records, tracked repayments, and fair finance as inputs, not cash.",
    link: "/impact",
    linkText: "See farmer impact",
    icon: Users2,
    emoji: "🤝"
  },
  {
    title: "Buyers & off-takers",
    description: "Reliable supply, guaranteed traceability. Know your farms, plan sourcing, meet standards effortlessly.",
    link: "/about",
    linkText: "Explore supply transparency",
    icon: Store,
    emoji: "🧺"
  },
  {
    title: "Development & impact partners",
    description: "Prove your impact. Real-time farmer outcomes, financial inclusion tracking, and ready-to-use SDG evidence.",
    link: "/impact",
    linkText: "See measurable outcomes",
    icon: Globe2,
    emoji: "🌍"
  },
  {
    title: "Governments & regulators",
    description: "See what's really happening. Anonymised flows, inclusion trends, and enforceable AML/CFT compliance.",
    link: "/about",
    linkText: "Explore governance tools",
    icon: ShieldCheck,
    emoji: "🏛️"
  },
  {
    title: "Knowledge partners",
    description: "Prove training works. Real farmer behaviour, yield data, and validated outcomes, not surveys.",
    link: "/impact",
    linkText: "See training impact",
    icon: GraduationCap,
    emoji: "🎓"
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
    if (typeof window === "undefined") return;
    if (!ref.current) return;

    // Check if element is already in view on mount (for SSR/hydration)
    const checkInitialVisibility = () => {
      if (ref.current) {
        const rect = ref.current.getBoundingClientRect();
        const viewportHeight = window.innerHeight || 0;
        const isInView = rect.top < viewportHeight * 0.9 && rect.bottom > -50;
        if (isInView) {
          // Small delay to ensure smooth animation even for in-view elements
          setTimeout(() => setIsVisible(true), 100);
          return true;
        }
      }
      return false;
    };

    // Immediate check for elements already in view
    if (checkInitialVisibility()) {
      return;
    }

    const element = ref.current;
    if (!element) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1, rootMargin: "0px 0px -100px 0px" }
    );

    observer.observe(element);
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
  const whyWeExistFade = useFadeInOnScroll();
  const ourSolutionFade = useFadeInOnScroll();
  const ourMissionFade = useFadeInOnScroll();

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
          <div className="mx-auto max-w-4xl" ref={whyWeExistFade.ref}>
            <div className={`text-center ${
              whyWeExistFade.isVisible ? 'fade-in-up' : 'fade-in-hidden'
            }`}>
              <p className="text-sm font-semibold uppercase tracking-[0.2em] text-forest">
                Why we exist
              </p>
              <h2 className="mt-2 text-2xl font-semibold text-stone sm:text-3xl">
                The gap between farmers and finance isn&apos;t ability, it&apos;s visibility.
              </h2>
            </div>
            <div className={`mt-8 space-y-6 text-base leading-relaxed text-slate-800 sm:text-lg ${
              whyWeExistFade.isVisible ? 'fade-in-up-delay-1' : 'fade-in-hidden'
            }`}>
              <p className="mb-4">
                Millions of smallholder farmers produce real value but remain invisible to formal finance. Banks and buyers often can&apos;t see who is reliable, which fields are productive, or where money actually goes.
              </p>
              <ul className="space-y-3 text-base leading-relaxed text-slate-800 sm:text-lg">
                <li className={`flex items-start gap-3 ${
                  whyWeExistFade.isVisible ? 'fade-in-up-delay-2' : 'fade-in-hidden'
                }`}>
                  <Leaf
                    className="mt-1 h-5 w-5 shrink-0 text-forest"
                    strokeWidth={2.4}
                  />
                  <span>
                    <strong>Farmers struggle</strong> to secure inputs and services on fair terms, especially at the moments they need them most.
                  </span>
                </li>
                <li className={`flex items-start gap-3 ${
                  whyWeExistFade.isVisible ? 'fade-in-up-delay-3' : 'fade-in-hidden'
                }`}>
                  <Leaf
                    className="mt-1 h-5 w-5 shrink-0 text-forest"
                    strokeWidth={2.4}
                  />
                  <span>
                    <strong>Banks see rural lending</strong> as too risky and too expensive, because they lack clear, trusted records of performance.
                  </span>
                </li>
                <li className={`flex items-start gap-3 ${
                  whyWeExistFade.isVisible ? 'fade-in-up-delay-4' : 'fade-in-hidden'
                }`}>
                  <Leaf
                    className="mt-1 h-5 w-5 shrink-0 text-forest"
                    strokeWidth={2.4}
                  />
                  <span>
                    <strong>Value chains stay informal</strong>, with no shared record of who produced what, when, and under which conditions.
                  </span>
                </li>
              </ul>
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
            <div className="mx-auto max-w-6xl" ref={ourSolutionFade.ref}>
              <div className="flex flex-col gap-y-12 lg:grid lg:grid-cols-[minmax(0,1.35fr)_minmax(0,0.9fr)] lg:items-center lg:gap-16">
                <div className="max-w-xl lg:max-w-2xl">
                  <div className={`text-center lg:text-left ${
                    ourSolutionFade.isVisible ? 'fade-in-up' : 'fade-in-hidden'
                  }`}>
                    <p className="text-sm font-semibold uppercase tracking-[0.2em] text-forest">
                      Our solution
                    </p>
                    <h2 className="mt-3 text-2xl font-semibold text-stone sm:text-3xl">
                      From farm activity to trusted finance.
                    </h2>
                    <p className="mt-4 max-w-2xl text-base leading-relaxed text-slate-800 sm:text-lg">
                      Digital infrastructure that turns farm activity into trusted records, so banks and partners can confidently finance inputs and services.
                    </p>
                  </div>
                  <ul className={`mt-6 space-y-3 text-base leading-relaxed text-slate-800 sm:text-lg ${
                    ourSolutionFade.isVisible ? 'fade-in-up-delay-1' : 'fade-in-hidden'
                  }`}>
                    <li className="flex items-start gap-3">
                      <Leaf
                        className="mt-1 h-5 w-5 shrink-0 text-forest"
                        strokeWidth={2.4}
                      />
                      <span>
                        <strong>Verified farmer profiles</strong> — Digital profiles that show who the farmer is, where they farm, what they grow, and how they perform over time.
                      </span>
                    </li>
                    <li className="flex items-start gap-3">
                      <Leaf
                        className="mt-1 h-5 w-5 shrink-0 text-forest"
                        strokeWidth={2.4}
                      />
                      <span>
                        <strong>Farm-to-market tracking</strong> — A clear record of inputs, harvests, and sales so partners can see how crops move through the value chain.
                      </span>
                    </li>
                    <li className="flex items-start gap-3">
                      <Leaf
                        className="mt-1 h-5 w-5 shrink-0 text-forest"
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
  <div className="pointer-events-none absolute inset-0 z-0 bg-[url('/images/farmer_holds_vegetables.webp')] bg-cover bg-center" />

  {/* Dark overlay so text + cards stand out, similar to CTA */}
  <div className="pointer-events-none absolute inset-0 z-0 bg-black/25" />

  {/* Top sand fade – smooth transition from page background */}
  <div className="pointer-events-none absolute inset-x-0 top-0 h-16 bg-gradient-to-b from-[#f4efe5] via-[#f4efe5]/40 to-transparent" />

  {/* Bottom fade into sand, like hero/approach/CTA */}
  <div className="pointer-events-none absolute inset-x-0 bottom-0 h-24 bg-gradient-to-b from-transparent via-[#f4efe5]/35 to-[#f4efe5]" />

  <div className="relative z-10 mx-auto flex max-w-6xl flex-col gap-10 px-6 md:px-8">
    <div className="mx-auto max-w-3xl text-center text-white">
      <p className="text-sm font-semibold uppercase tracking-[0.2em] text-white">
        Partners across the food system
      </p>
      <h2 className="mt-2 text-xl font-semibold text-white sm:text-2xl">
        Who we serve
      </h2>
      <p className="mt-3 max-w-2xl mx-auto text-sm sm:text-base text-white/85 leading-relaxed">
        These partnerships strengthen our governance and data model, so every farmer connects into a system institutions can trust.
      </p>
    </div>

    <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3" ref={partnershipCardsFade.ref}>
      {partnershipCards.map((card, index) => {
        return (
          <div
            key={card.title}
            className={`group flex h-full flex-col items-center text-center rounded-3xl border border-white/20 bg-white/5 bg-gradient-to-b from-white/10 via-white/5 to-white/15 px-5 py-5 sm:px-6 sm:py-6 backdrop-blur-xl shadow-[0_18px_45px_rgba(15,23,42,0.45)] transition-all duration-300 ease-out hover:-translate-y-1.5 hover:shadow-[0_24px_60px_rgba(15,23,42,0.65)] hover:border-white/40 ${
              partnershipCardsFade.isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`}
            style={{ transitionDelay: partnershipCardsFade.isVisible ? `${index * 100}ms` : '0ms' }}
          >
            <h3 className="text-lg sm:text-xl font-semibold tracking-tight text-white uppercase">
              {card.title}
            </h3>
            <p className="mt-2 text-sm text-white/85 leading-relaxed">
              {card.description}
            </p>
            <a
              href={card.link}
              className="mt-3 inline-flex items-center gap-1 text-sm font-medium text-forest hover:text-forest/80 hover:underline underline-offset-4 transition-colors focus:outline-none focus:ring-2 focus:ring-forest/60 focus:ring-offset-2"
            >
              {card.linkText}
              <span aria-hidden="true">→</span>
            </a>
          </div>
        );
      })}
    </div>

    <div className="mt-8 text-center text-sm text-white/80">
      <p className="mb-2">
        See how this connects into our governance and data model.
      </p>
      <a
        href="/about"
        className="inline-flex items-center gap-1 font-medium text-white hover:underline underline-offset-4 focus:outline-none focus:ring-2 focus:ring-forest/60 focus:ring-offset-2"
      >
        Learn more about Fairways.Tech
        <span aria-hidden="true">↗</span>
      </a>
    </div>
  </div>
</section>

          {/* OUR APPROACH */}
        <section
  id="approach"
  className="relative scroll-mt-24 overflow-hidden bg-[#f4efe5] py-16 sm:py-20"
>
  {/* Wet leaf background video */}
  <div className="pointer-events-none absolute inset-0 z-0">
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
  <div className="pointer-events-none absolute inset-0 z-0 bg-gradient-to-b from-black/35 via-black/10 to-transparent" />

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
      <div className={`group flex h-full flex-col items-center text-center rounded-3xl border border-white/20 bg-white/5 bg-gradient-to-b from-white/10 via-white/5 to-white/15 px-5 py-5 sm:px-6 sm:py-6 backdrop-blur-xl shadow-[0_18px_45px_rgba(15,23,42,0.45)] transition-all duration-300 ease-out hover:-translate-y-1.5 hover:shadow-[0_24px_60px_rgba(15,23,42,0.65)] hover:border-white/40 ${
        approachCardsFade.isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
      }`}>
        <h3 className="text-lg sm:text-xl font-semibold tracking-tight text-white uppercase">
          Real activity, captured once
        </h3>
        <p className="mt-2 text-sm leading-relaxed text-white/85">
          Field agents capture farm activity in simple mobile workflows, creating one trusted history.
        </p>
      </div>
      <div className={`group flex h-full flex-col items-center text-center rounded-3xl border border-white/20 bg-white/5 bg-gradient-to-b from-white/10 via-white/5 to-white/15 px-5 py-5 sm:px-6 sm:py-6 backdrop-blur-xl shadow-[0_18px_45px_rgba(15,23,42,0.45)] transition-all duration-300 ease-out hover:-translate-y-1.5 hover:shadow-[0_24px_60px_rgba(15,23,42,0.65)] hover:border-white/40 ${
        approachCardsFade.isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
      }`} style={{ transitionDelay: approachCardsFade.isVisible ? '150ms' : '0ms' }}>
        <h3 className="text-lg sm:text-xl font-semibold tracking-tight text-white uppercase">
          Infrastructure banks plug into
        </h3>
        <p className="mt-2 text-sm leading-relaxed text-white/85">
          Structured, time-stamped records that banks and regulators review using their standard processes.
        </p>
      </div>
      <div className={`group flex h-full flex-col items-center text-center rounded-3xl border border-white/20 bg-white/5 bg-gradient-to-b from-white/10 via-white/5 to-white/15 px-5 py-5 sm:px-6 sm:py-6 backdrop-blur-xl shadow-[0_18px_45px_rgba(15,23,42,0.45)] transition-all duration-300 ease-out hover:-translate-y-1.5 hover:shadow-[0_24px_60px_rgba(15,23,42,0.65)] hover:border-white/40 ${
        approachCardsFade.isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
      }`} style={{ transitionDelay: approachCardsFade.isVisible ? '300ms' : '0ms' }}>
        <h3 className="text-lg sm:text-xl font-semibold tracking-tight text-white uppercase">
          Local partners, trusted agents
        </h3>
        <p className="mt-2 text-sm leading-relaxed text-white/85">
          Community agents bridge paper-based farms to digital rails, helping farmers stay on track.
        </p>
      </div>
    </div>
    <div className="mt-8 text-center text-sm text-white/80">
      <p className="mb-2">
        See how this transforms governance, risk and data flows for rural finance.
      </p>
      <a
        href="/impact"
        className="inline-flex items-center gap-1 font-medium text-white hover:underline underline-offset-4 focus:outline-none focus:ring-2 focus:ring-forest/60 focus:ring-offset-2"
      >
        Explore our impact &amp; vision
        <span aria-hidden="true">↗</span>
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
                  We&apos;re building a network of verified farmers, local agents, and financial institutions across Africa, Asia, Europe and Latin America. Our platform makes rural lending safer and more affordable.
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
                    <p className="mb-4 text-lg sm:text-xl font-semibold tracking-tight text-black uppercase" style={{ textShadow: "0 1px 3px rgba(0, 0, 0, 0.3)" }}>
                      COUNTRIES
                    </p>
                    <p className="mb-5 text-6xl sm:text-7xl font-bold tracking-tight text-black" style={{ textShadow: "0 2px 6px rgba(0, 0, 0, 0.4)" }}>
                      <Counter target={statsInView ? 2 : 0} suffix="+" />
                    </p>
                    <p className="text-base font-semibold leading-relaxed text-black" style={{ textShadow: "0 1px 2px rgba(0, 0, 0, 0.2)" }}>
                      Growing network across Africa, Asia, Europe and Latin America, expanding
                      trusted systems for rural finance, so farmers can access finance regardless of location.
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
                    <p className="mb-4 text-lg sm:text-xl font-semibold tracking-tight text-black uppercase" style={{ textShadow: "0 1px 3px rgba(0, 0, 0, 0.3)" }}>
                      FARMERS
                    </p>
                    <p className="mb-5 text-6xl sm:text-7xl font-bold tracking-tight text-black" style={{ textShadow: "0 2px 6px rgba(0, 0, 0, 0.4)" }}>
                      <Counter target={statsInView ? 250 : 0} suffix="+" />
                    </p>
                    <p className="text-base font-semibold leading-relaxed text-black" style={{ textShadow: "0 1px 2px rgba(0, 0, 0, 0.2)" }}>
                      Smallholder and horticultural farmers accessing fair, scalable finance through verified track records and transparent repayment history.
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
                    <p className="mb-4 text-lg sm:text-xl font-semibold tracking-tight text-black uppercase" style={{ textShadow: "0 1px 3px rgba(0, 0, 0, 0.3)" }}>
                      COMMUNITY AGENTS
                    </p>
                    <p className="mb-5 text-6xl sm:text-7xl font-bold tracking-tight text-black" style={{ textShadow: "0 2px 6px rgba(0, 0, 0, 0.4)" }}>
                      <Counter target={statsInView ? 30 : 0} suffix="+" />
                    </p>
                    <p className="text-base font-semibold leading-relaxed text-black" style={{ textShadow: "0 1px 2px rgba(0, 0, 0, 0.2)" }}>
                      Local field agents and cooperatives connecting real farms to our digital platform, ensuring every farmer record is real, active and up to date.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* MISSION */}
          <section id="mission" className="bg-sand py-16 sm:py-20">
            <div className="mx-auto max-w-4xl px-6 lg:px-8" ref={ourMissionFade.ref}>
              <div className={`text-center ${
                ourMissionFade.isVisible ? 'fade-in-up' : 'fade-in-hidden'
              }`}>
                <p className="text-sm font-semibold uppercase tracking-[0.2em] text-forest">
                  Our mission
                </p>
                <h2 className="mt-2 text-2xl font-semibold text-stone sm:text-3xl">
                  Building trust between farms and finance.
                </h2>
              </div>
              <div className={`mx-auto mt-8 max-w-2xl space-y-6 text-center text-base leading-relaxed text-slate-800 sm:text-lg ${
                ourMissionFade.isVisible ? 'fade-in-up-delay-1' : 'fade-in-hidden'
              }`}>
                <p>
                  We believe farmers deserve finance that respects their work, and institutions deserve data they can trust.
                </p>
                <p>
                  By connecting verified farm activity to compliant rails, we&apos;re building a transparent system where rural communities access fair finance, and partners serve them with confidence.
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