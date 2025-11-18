"use client";

import { useState } from "react";

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
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-5 sm:px-6 lg:px-8">
        <div className="text-xl font-bold tracking-tight text-forest sm:text-2xl">
          Fairways.Tech
        </div>
        <nav className="hidden md:flex gap-5 text-sm font-medium text-stone">
          {navItems.map((item) => (
            <a
              key={item.id}
              href={`#${item.id}`}
              className="rounded-full px-3 py-1 text-stone/90 transition hover:bg-forest/10 hover:text-forest"
            >
              {item.label}
            </a>
          ))}
        </nav>
        <a
          href="#call-to-action"
          className="hidden md:block rounded-full border border-forest/30 px-3 py-1 text-sm font-semibold text-forest transition hover:bg-forest hover:text-sand"
        >
          Partner With Us
        </a>
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
        <nav className="md:hidden fixed inset-x-0 top-[64px] z-40 bg-sand/95 backdrop-blur-sm border-t border-stone-200">
          <div className="flex min-h-[calc(100vh-64px)] flex-col px-4 pb-6 pt-2">
            <nav className="flex-1 space-y-4 overflow-y-auto pt-2">
              {navItems.map((item) => (
                <a
                  key={item.id}
                  href={`#${item.id}`}
                  onClick={(e) => handleNavClick(e, item.id)}
                  className="block rounded-full px-4 py-2 text-sm font-medium text-stone/90 transition hover:bg-forest/10 hover:text-forest"
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

export default function HomePage() {
  return (
    <>
      <Header />
      <main className="mx-auto flex max-w-5xl flex-col gap-20 px-4 pb-20 sm:px-6 lg:px-8">
        <section
          id="hero"
          className="py-10 sm:py-16 lg:py-20"
        >
          <div className="rounded-3xl bg-white p-4 shadow-xl border border-stone-200 sm:p-6 lg:p-8">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-leaf">
            Community-Driven Agri–Fintech
          </p>
          <h1 className="mt-4 text-3xl font-semibold leading-tight text-stone sm:text-4xl">
            Digital infrastructure empowering farmers to scale.
          </h1>
          <p className="mt-6 text-base sm:text-lg text-stone/80 max-w-xl">
            Fairways.Tech is a community-driven agri-fintech ecosystem helping
            smallholder farmers and horticultural producers grow beyond survival
            by unlocking fair, compliant, and scalable access to finance,
            markets, and data.
          </p>
          <div className="mt-6 flex flex-wrap gap-3 text-sm font-medium text-stone">
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
          <div className="mt-8 flex flex-wrap gap-4">
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
        </section>

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

        <section id="our-solution" className="py-10 space-y-6 sm:py-16">
          <div>
            <p className="text-sm font-semibold text-leaf">A Trusted Ecosystem</p>
            <h2 className="mt-2 text-xl font-semibold text-stone sm:text-2xl">
              Our Solution
            </h2>
          </div>
          <p className="text-stone/80">
            A community-driven digital ecosystem for scalable agriculture.
          </p>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 sm:gap-6">
            {solutionFeatures.map((feature) => (
              <div
                key={feature.title}
                className="rounded-2xl bg-white/80 p-4 shadow ring-1 ring-forest/5 sm:p-6"
              >
                <h3 className="text-lg font-semibold text-stone">
                  {feature.title}
                </h3>
                <p className="mt-3 text-sm text-stone/80">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
          <p className="text-stone font-semibold">
            We don’t replace local relationships — we strengthen them with
            trusted data and compliant rails.
          </p>
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

        <section id="partnerships" className="block py-12 space-y-6 sm:py-16">
          <div>
            <p className="text-sm font-semibold text-leaf">
              Partnerships & ecosystem
            </p>
            <h2 className="mt-2 text-xl font-semibold text-stone sm:text-2xl">
              Built with local partners, for local communities.
            </h2>
          </div>
          <p className="text-stone/80">
            We collaborate with the partners who make agricultural systems work on
            the ground.
          </p>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 sm:gap-6">
            {partnershipCards.map((card) => (
              <div
                key={card.title}
                className="rounded-2xl bg-white/80 p-4 shadow ring-1 ring-forest/5 sm:p-6"
              >
                <h3 className="text-lg font-semibold text-stone">
                  {card.title}
                </h3>
                <p className="mt-3 text-sm text-stone/80">
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
      </main>
    </>
  );
}

