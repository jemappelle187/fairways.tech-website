"use client";

import { useState, useEffect } from "react";
import Image from "next/image";

const navItems = [
  { id: "hero", label: "Home" },
  { id: "the-problem", label: "Problem" },
  { id: "our-solution", label: "Solution" },
  { id: "how-it-works", label: "Approach" },
  { id: "compliance", label: "Compliance" },
  { id: "partnerships", label: "Partnerships" },
  { id: "impact", label: "Impact" },
  { id: "mission", label: "Mission" }
];

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
    <header className="sticky top-0 z-40 bg-sand/95 backdrop-blur-sm border-b border-stone-200">
      <div className="mx-auto flex h-20 max-w-6xl items-center gap-8 px-4 sm:px-6 lg:px-8">
        <div className="text-xl font-bold tracking-tight text-forest sm:text-2xl">
          Fairways.Tech
        </div>
        <nav className="hidden md:flex gap-8 text-sm font-medium items-center">
          {navItems.map((item) => (
            <a
              key={item.id}
              href={`#${item.id}`}
              className="text-stone-800 hover:text-stone-900 hover:underline underline-offset-4 transition-colors"
            >
              {item.label}
            </a>
          ))}
        </nav>
        <button
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          className="md:hidden p-2 text-stone hover:text-forest transition"
          aria-label="Toggle menu"
        >
          <div className="w-6 h-6 flex flex-col justify-center gap-1.5">
            <span
              className={`block h-0.5 w-full bg-current transition-all ${
                isMenuOpen ? "rotate-45 translate-y-2" : ""
              }`}
            />
            <span
              className={`block h-0.5 w-full bg-current transition-all ${
                isMenuOpen ? "opacity-0" : ""
              }`}
            />
            <span
              className={`block h-0.5 w-full bg-current transition-all ${
                isMenuOpen ? "-rotate-45 -translate-y-2" : ""
              }`}
            />
          </div>
        </button>
      </div>
      {isMenuOpen && (
        <nav className="md:hidden fixed inset-x-0 top-[80px] z-40 bg-sand/95 backdrop-blur-sm border-t border-stone-200">
          <div className="flex min-h-[calc(100vh-80px)] flex-col px-4 pb-6 pt-2">
            <nav className="flex-1 space-y-4 overflow-y-auto pt-2">
              {navItems.map((item) => (
                <a
                  key={item.id}
                  href={`#${item.id}`}
                  onClick={(e) => handleNavClick(e, item.id)}
                  className="block px-4 py-2 text-sm font-medium text-stone-800 hover:text-stone-900 transition-colors"
                >
                  {item.label}
                </a>
              ))}
            </nav>
            <div className="pt-4">
              <a
                href="#call-to-action"
                onClick={(e) => handleNavClick(e, "call-to-action")}
                className="block w-full rounded-full border border-forest/30 px-4 py-2 text-sm font-semibold text-center text-forest transition hover:bg-forest hover:text-sand"
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

const problemPoints = [
  "No digital records of fields, inputs, crop cycles, or yields",
  "Banks charge 30–35% interest due to high perceived risk",
  "Lack of transparent value chains",
  "No consistent access to market prices",
  "Financing is not designed for farming realities"
];

const solutionFeatures = [
  {
    title: "Digital Farm Profiles",
    description:
      "Accurate, verified farm data: acreage, crops, inputs, performance."
  },
  {
    title: "Transparent Value Chains & Market Access",
    description:
      "Traceability from farm to buyer with verified quality and delivery insights."
  },
  {
    title: "Lower-Risk, Responsible Financing",
    description:
      "Data-backed risk insights enabling banks and development partners to safely support farmers."
  }
];


const complianceFrameworks = [
  "EU AML/CFT",
  "Wwft / AMLD / AMLR",
  "FATF digital ID & financial inclusion",
  "EU DORA & GDPR",
  "Ghanaian supervisory expectations"
];

const complianceBenefits = [
  "Verified identities & community onboarding",
  "Clear, audit-ready transaction flows",
  "Risk-reduced lending",
  "Secure, resilient infrastructure",
  "Full traceability for banks and development partners"
];

const partnershipCards = [
  {
    title: "Local financial institutions",
    description: "Scalable, risk-aware rural finance."
  },
  {
    title: "Farmer groups",
    description: "Community onboarding and structured workflows."
  },
  {
    title: "Market partners",
    description: "Reliable volumes and transparent sourcing."
  },
  {
    title: "Knowledge partners",
    description: "Training, validation and field support."
  },
  {
    title: "Development partners",
    description: "Traceable impact data and aligned goals."
  },
  {
    title: "Government & regulators",
    description: "Food security, inclusion and resilient systems."
  }
];

const impactAreas = [
  {
    title: "For Farmers",
    benefits: [
      "Fair, scalable finance",
      "Better season planning",
      "Stronger negotiation power",
      "A digital track record for growth"
    ]
  },
  {
    title: "For Buyers",
    benefits: [
      "Reliable, transparent supply",
      "Quality-linked sourcing",
      "Easier export traceability"
    ]
  },
  {
    title: "For Banks",
    benefits: [
      "Clear agricultural risk visibility",
      "Audit-ready compliance",
      "New, data-backed lending opportunities"
    ]
  },
  {
    title: "For Development Partners",
    benefits: [
      "Measurable, data-driven impact",
      "Transparent flow-of-funds",
      "Strong alignment with sustainability goals"
    ]
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
    <section
      id="hero"
      className="relative overflow-hidden py-16 sm:py-20"
    >
      <div
        className="absolute inset-0 bg-[url('/hero-fairways.jpg')] bg-cover bg-center"
        style={{ transform: `translateY(${parallaxOffset}px)` }}
      />
      <div className="absolute inset-0 bg-black/30" />
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-24 bg-gradient-to-b from-transparent via-sand/10 to-sand" />
      <div className="relative mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 pt-16 sm:pt-24">
        <div
          className={`relative max-w-4xl mx-auto rounded-3xl bg-white/85 shadow-xl shadow-black/10 border border-white/40 backdrop-blur-sm px-6 py-10 sm:px-10 sm:py-12 md:-mt-6 lg:-mt-10 transition-all duration-1000 ${
            isLoaded
              ? "opacity-100 translate-y-0"
              : "opacity-0 translate-y-4"
          }`}
        >
          <p
            className={`text-sm font-semibold uppercase tracking-[0.2em] text-leaf transition-all duration-700 delay-100 ${
              isLoaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-2"
            }`}
          >
            Community-Driven Agri–Fintech
          </p>
          <h1
            className={`mt-4 text-3xl font-semibold leading-tight text-stone sm:text-4xl transition-all duration-700 delay-200 ${
              isLoaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-2"
            }`}
          >
            Digital infrastructure empowering farmers to scale.
          </h1>
          <p
            className={`mt-6 text-base sm:text-lg text-stone/80 max-w-xl transition-all duration-700 delay-300 ${
              isLoaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-2"
            }`}
          >
            Fairways.Tech is a community-driven agri-fintech ecosystem helping
            smallholder farmers and horticultural producers grow beyond survival
            by unlocking fair, compliant, and scalable access to finance,
            markets, and data.
          </p>
          <div
            className={`mt-6 flex flex-wrap gap-3 text-sm font-medium text-stone transition-all duration-700 delay-400 ${
              isLoaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-2"
            }`}
          >
            {["Community-first", "Compliance-first", "Built for agri & horticulture"].map(
              (quality) => (
                <span
                  key={quality}
                  className="rounded-full bg-white/70 border border-stone-200/70 backdrop-blur-sm px-4 py-1"
                >
                  {quality}
                </span>
              )
            )}
          </div>
          <div
            className={`mt-8 flex flex-wrap gap-4 transition-all duration-700 delay-500 ${
              isLoaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-2"
            }`}
          >
            <a
              href="#call-to-action"
              className="rounded-full bg-forest px-7 py-3.5 text-sm font-semibold text-sand transition hover:bg-leaf"
            >
              Partner With Us
            </a>
            <a
              href="#how-it-works"
              className="rounded-full border-2 border-stone-300 bg-transparent px-6 py-3 text-sm font-semibold text-stone transition hover:bg-stone-50 hover:border-stone-400"
            >
              Learn How It Works
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

export default function HomePage() {
  return (
    <>
      <Header />
      <main className="flex flex-col gap-20 pb-20">
        <Hero />

        <div className="mx-auto flex max-w-5xl flex-col gap-20 px-4 sm:px-6 lg:px-8">
        <section id="the-problem" className="py-10 space-y-6 sm:py-16">
          <div>
            <p className="text-sm font-semibold text-leaf">The Challenge</p>
            <h2 className="mt-2 text-xl font-semibold text-stone sm:text-2xl">
              The Problem
            </h2>
          </div>
          <p className="text-stone/80">
            Farming has the potential to scale — but farmers lack the tools and
            trust systems that financial institutions require.
          </p>
          <ul className="space-y-3 rounded-2xl bg-white/80 p-4 text-stone/90 shadow ring-1 ring-forest/5 sm:p-6">
            {problemPoints.map((point) => (
              <li key={point} className="flex items-start gap-3">
                <span className="mt-1 h-2 w-2 rounded-full bg-clay" />
                <span>{point}</span>
              </li>
            ))}
          </ul>
          <p className="text-lg font-semibold text-stone">
            Result: Farmers can produce more, but cannot grow beyond survival
            levels.
          </p>
        </section>

        <section id="our-solution" className="py-10 sm:py-16">
          <div className="mx-auto flex max-w-6xl flex-col gap-10 lg:gap-16 px-4 sm:px-6 lg:px-8 md:flex-row md:items-center">
            <div className="flex-1 max-w-xl">
              <p className="text-sm font-semibold tracking-[0.2em] uppercase text-emerald-700">
                Our solution
              </p>
              <h2 className="mt-2 text-2xl font-semibold tracking-tight text-stone-900 sm:text-3xl">
                A shared digital infrastructure for scalable farming.
              </h2>
              <p className="mt-4 text-sm leading-relaxed text-stone-700 sm:text-base">
                Fairways.Tech turns fragmented farm activity into structured data that banks and partners can trust. We capture field, crop and transaction flows through local agents so farmers can access finance and markets at scale.
              </p>
              <ul className="mt-5 space-y-2 text-sm text-stone-700">
                <li>• <strong>Digital farm profiles</strong> linking fields, seasons, crops and performance.</li>
                <li>• <strong>Transparent value-chain flows</strong> from input provision to harvest and sale.</li>
                <li>• <strong>Compliance-first rails</strong> that make risk visible for local financial institutions.</li>
              </ul>
            </div>
            <div className="mt-12 flex flex-1 flex-col items-center md:mt-0 md:items-end">
              {/* Cluster wrapper */}
              <div className="relative min-h-[380px] flex flex-col justify-center items-end mb-4">
                {/* Top circle */}
                <div className="absolute top-0 right-8 h-56 w-56 rounded-full overflow-hidden border border-white/40 shadow-lg shadow-black/10">
                  <Image
                    src="/hero-fairways.jpg"
                    alt="Digital farm profiles"
                    width={224}
                    height={224}
                    className="h-full w-full object-cover rounded-full"
                  />
                </div>

                {/* Middle circle — largest */}
                <div className="absolute top-[140px] right-8 h-64 w-64 rounded-full overflow-hidden border border-white/40 shadow-lg shadow-black/10">
                  <Image
                    src="/hero-fairways.jpg"
                    alt="Value-chain transparency"
                    width={256}
                    height={256}
                    className="h-full w-full object-cover rounded-full"
                  />
                </div>

                {/* Bottom circle */}
                <div className="absolute top-[300px] right-8 h-48 w-48 rounded-full overflow-hidden border border-white/40 shadow-lg shadow-black/10">
                  <Image
                    src="/hero-fairways.jpg"
                    alt="Compliance-first finance"
                    width={192}
                    height={192}
                    className="h-full w-full object-cover rounded-full"
                  />
                </div>
              </div>
            </div>
          </div>
        </section>

        <section id="how-it-works" className="py-10 space-y-6 sm:py-16">
          <div>
            <p className="text-sm font-semibold text-leaf">Our approach</p>
            <h2 className="mt-2 text-xl font-semibold text-stone sm:text-2xl">
              Clear. Compliant. Community-driven.
            </h2>
          </div>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 sm:gap-6">
            <div className="rounded-2xl bg-white/80 p-4 shadow ring-1 ring-forest/5 sm:p-6">
              <h3 className="text-lg font-semibold text-stone">
                Data you can trust
              </h3>
              <p className="mt-3 text-sm text-stone/80">
                Real farm and value-chain data that makes production and risk
                visible.
              </p>
            </div>
            <div className="rounded-2xl bg-white/80 p-4 shadow ring-1 ring-forest/5 sm:p-6">
              <h3 className="text-lg font-semibold text-stone">
                Compliance-first rails
              </h3>
              <p className="mt-3 text-sm text-stone/80">
                Transparent, audit-ready flows that meet AML/CFT and
                data-protection expectations.
              </p>
            </div>
            <div className="rounded-2xl bg-white/80 p-4 shadow ring-1 ring-forest/5 sm:p-6">
              <h3 className="text-lg font-semibold text-stone">
                Local delivery
              </h3>
              <p className="mt-3 text-sm text-stone/80">
                Community agents and cooperatives who keep data tied to real
                farmers and real fields.
              </p>
            </div>
          </div>
        </section>

        <section id="compliance" className="py-10 space-y-6 sm:py-16">
          <div>
            <p className="text-sm font-semibold text-leaf">Integrity First</p>
            <h2 className="mt-2 text-xl font-semibold text-stone sm:text-2xl">
              Compliance-First by Design
            </h2>
          </div>
          <p className="text-stone/80">
            Regulatory integrity is a precondition for farmer scalability.
          </p>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-6">
            <div className="rounded-2xl bg-white/80 p-4 shadow ring-1 ring-forest/5 sm:p-6">
              <h3 className="text-lg font-semibold text-stone">
                Fairways.Tech aligns with:
              </h3>
              <ul className="mt-4 space-y-2 text-sm text-stone/80">
                {complianceFrameworks.map((item) => (
                  <li key={item} className="flex items-center gap-2">
                    <span className="h-1.5 w-1.5 rounded-full bg-leaf" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
            <div className="rounded-2xl bg-white/80 p-4 shadow ring-1 ring-forest/5 sm:p-6">
              <h3 className="text-lg font-semibold text-stone">
                Our compliance-first design ensures:
              </h3>
              <ul className="mt-4 space-y-2 text-sm text-stone/80">
                {complianceBenefits.map((item) => (
                  <li key={item} className="flex items-center gap-2">
                    <span className="h-1.5 w-1.5 rounded-full bg-leaf" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
          <p className="text-lg font-semibold text-stone">
            When compliance risk goes down, the cost of capital goes down —
            enabling farmers to scale.
          </p>
        </section>

        <section id="partnerships" className="block py-12 space-y-8 sm:py-16 sm:space-y-6">
          <div>
            <p className="text-sm font-semibold text-leaf">
              Partnerships & ecosystem
            </p>
            <h2 className="mt-2 text-xl font-semibold text-stone sm:text-2xl">
              Built with local partners, for local communities.
            </h2>
          </div>
          <p className="text-stone/80 leading-relaxed">
            We collaborate with the partners who make agricultural systems work on
            the ground.
          </p>
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 sm:gap-6">
            {partnershipCards.map((card) => (
              <div
                key={card.title}
                className="rounded-2xl bg-white/80 p-4 shadow ring-1 ring-forest/5 sm:p-6"
              >
                <h3 className="text-lg font-semibold text-stone">
                  {card.title}
                </h3>
                <p className="mt-3 text-sm text-stone/80 leading-relaxed">
                  {card.description}
                </p>
              </div>
            ))}
          </div>
        </section>

        <section id="impact" className="py-10 space-y-6 sm:py-16">
          <div>
            <p className="text-sm font-semibold text-leaf">Shared Value</p>
            <h2 className="mt-2 text-xl font-semibold text-stone sm:text-2xl">
              Impact & Benefits
            </h2>
          </div>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-6">
            {impactAreas.map((area) => (
              <div
                key={area.title}
                className="rounded-2xl bg-white/80 p-4 shadow ring-1 ring-forest/5 sm:p-6"
              >
                <h3 className="text-lg font-semibold text-stone">
                  {area.title}
                </h3>
                <ul className="mt-4 space-y-2 text-sm text-stone/80">
                  {area.benefits.map((benefit) => (
                    <li key={benefit} className="flex items-center gap-2">
                      <span className="h-1.5 w-1.5 rounded-full bg-clay" />
                      {benefit}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </section>

        <section id="mission" className="py-10 space-y-6 sm:py-16">
          <div>
            <p className="text-sm font-semibold text-leaf">Community Philosophy</p>
            <h2 className="mt-2 text-xl font-semibold text-stone sm:text-2xl">
              Mission & Philosophy
            </h2>
          </div>
          <div className="space-y-4 rounded-3xl bg-forest/90 p-4 text-sand shadow-lg sm:p-6 lg:p-8">
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
        </section>

        <section id="design-test-circles" className="bg-sand py-12 sm:py-16 border-t border-stone-200/60">
          <div className="mx-auto flex max-w-6xl flex-col gap-10 px-4 sm:px-6 lg:px-8 md:flex-row md:items-stretch">
            <div className="flex-1">
              <p className="text-sm font-semibold tracking-[0.2em] uppercase text-emerald-700">
                Design test
              </p>
              <h2 className="mt-2 text-2xl font-semibold tracking-tight sm:text-3xl text-stone-900">
                Exploring circular image crops.
              </h2>
              <p className="mt-4 text-sm text-stone-700">
                This section is a design sandbox for circular imagery and layout. In production we'll use real farm, value-chain and community photos here.
              </p>
              <ul className="mt-4 space-y-2 text-sm text-stone-700">
                <li>• Visual exploration of circular image formats</li>
                <li>• Testing layout balance between text and imagery</li>
                <li>• Preparing for real agricultural photography integration</li>
              </ul>
            </div>
            <div className="mt-10 flex flex-1 flex-col items-center gap-8 md:mt-0 md:items-stretch pr-6 lg:pr-10">
              <div className="flex flex-col items-center gap-3 md:items-start md:self-end">
                <div className="h-32 w-32 sm:h-40 sm:w-40 overflow-hidden rounded-full shadow-lg shadow-black/10 border border-white/40 bg-stone-100">
                  <Image
                    src="/hero-fairways.jpg"
                    alt="Design test crop"
                    width={160}
                    height={160}
                    className="h-full w-full object-cover"
                  />
                </div>
                <p className="text-xs font-medium uppercase tracking-wide text-stone-600">
                  Field data
                </p>
              </div>
              <div className="flex flex-col items-center gap-3 md:items-start md:self-center">
                <div className="h-32 w-32 sm:h-40 sm:w-40 overflow-hidden rounded-full shadow-lg shadow-black/10 border border-white/40 bg-stone-100">
                  <Image
                    src="/hero-fairways.jpg"
                    alt="Design test crop"
                    width={160}
                    height={160}
                    className="h-full w-full object-cover"
                  />
                </div>
                <p className="text-xs font-medium uppercase tracking-wide text-stone-600">
                  Community agents
                </p>
              </div>
              <div className="flex flex-col items-center gap-3 md:items-start md:self-start">
                <div className="h-32 w-32 sm:h-40 sm:w-40 overflow-hidden rounded-full shadow-lg shadow-black/10 border border-white/40 bg-stone-100">
                  <Image
                    src="/hero-fairways.jpg"
                    alt="Design test crop"
                    width={160}
                    height={160}
                    className="h-full w-full object-cover"
                  />
                </div>
                <p className="text-xs font-medium uppercase tracking-wide text-stone-600">
                  Harvest & quality
                </p>
              </div>
            </div>
          </div>
        </section>

        <section id="call-to-action" className="py-10 sm:py-16">
          <div className="rounded-3xl border border-forest/20 bg-white/90 p-4 text-center shadow-lg sm:p-6 lg:p-8">
            <p className="text-sm font-semibold uppercase tracking-[0.3em] text-leaf">
              Let's scale farming communities together.
            </p>
            <h2 className="mt-4 text-2xl font-semibold text-stone sm:text-3xl">
              Call to Action
            </h2>
            <p className="mt-4 text-stone/80">
              Whether you're a bank, buyer, regulator, cooperative, or development
              partner — Fairways.Tech is ready to collaborate.
            </p>
            <p className="mt-6 text-lg font-semibold text-forest">
              Contact: info@fairways.tech
            </p>
          </div>
        </section>
        </div>
      </main>
    </>
  );
}

