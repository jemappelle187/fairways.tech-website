import React from "react";
import Image from "next/image";
import type { Metadata } from "next";
import { Linkedin } from "lucide-react";
import { Header, Footer } from "../components/SiteChrome";

export const metadata: Metadata = {
  title: "Meet the Team | Fairways.Tech",
  description:
    "Meet the team building Fairways.Tech—turning farm activity into trusted, finance-ready data to enable inclusive agricultural finance at scale.",
  openGraph: {
    title: "Meet the Team | Fairways.Tech",
    description:
      "Meet the team building Fairways.Tech—turning farm activity into trusted, finance-ready data to enable inclusive agricultural finance at scale.",
    url: "https://fairways.tech/team",
  },
};

export default function TeamPage() {
  return (
    <>
      <Header />
      <main id="main-content" className="min-h-screen bg-sand">
        <section className="relative overflow-hidden bg-sand pt-28 pb-24">
          {/* Leaf background */}
          <div className="pointer-events-none absolute inset-0 -z-20 bg-[url('/images/leaf_background.webp')] bg-cover bg-center opacity-30" />
          {/* Light overlay for subtle texture */}
          <div className="pointer-events-none absolute inset-0 -z-10 bg-sand/60" />
          <div className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-20 bg-gradient-to-b from-sand via-sand/40 to-transparent" />
          <div className="pointer-events-none absolute inset-x-0 bottom-0 -z-10 h-24 bg-gradient-to-b from-transparent via-sand/30 to-sand" />

          <div className="relative mx-auto max-w-6xl px-6 lg:px-8">
          {/* Page heading */}
          <header className="relative z-10 mx-auto max-w-3xl text-center">
            <p className="mb-3 text-xs font-semibold uppercase tracking-[0.28em] text-forest">
              Our team
            </p>
            <h1 className="mb-4 text-3xl font-semibold text-[#2E3A39] md:text-4xl">
              The people behind Fairways.Tech
            </h1>
            <p className="mx-auto max-w-3xl text-sm text-[#2E3A39] md:text-base leading-relaxed">
              We combine expertise across agriculture, compliance, digital identity,
              product and emerging-markets finance to build trusted rails for farmers,
              cooperatives and financial institutions.
            </p>
            <p className="mt-3 text-xs font-medium uppercase tracking-[0.2em] text-[#2E3A39]/70">
              Based across Africa, Asia, Europe &amp; Latin America
            </p>
          </header>

          {/* Founders */}
          <div className="relative z-10 mx-auto mt-12 max-w-5xl">
            <header className="mb-8 text-center">
              <h2 className="text-lg font-semibold tracking-tight text-[#2E3A39] uppercase">
                Founders
              </h2>
            </header>
            <div className="grid gap-6 md:grid-cols-2">
            {/* Emmanuel */}
            <article
              id="emmanuel-yeboah-martina"
              className="group relative flex flex-col items-center text-center rounded-3xl border border-forest/20 bg-gradient-to-b from-forest via-forest to-[#1a3326] px-6 py-8 shadow-[0_18px_45px_rgba(31,59,44,0.3)] transition-all duration-300 ease-out hover:-translate-y-1.5 hover:shadow-[0_24px_60px_rgba(31,59,44,0.4)] hover:border-forest/40 overflow-hidden"
            >
              {/* Leaf background */}
              <div className="pointer-events-none absolute inset-0 bg-[url('/images/leaf_background.webp')] bg-cover bg-center opacity-20 mix-blend-overlay" />
              {/* Prominent Avatar */}
              <div className="relative z-10 mb-5 flex-shrink-0">
                <div className="relative h-32 w-32 overflow-hidden rounded-full bg-sand shadow-lg shadow-black/30 ring-4 ring-white/40 transition-transform duration-300 group-hover:scale-105">
                  <div className="absolute inset-1 rounded-full bg-sand" />
                  <Image
                    src="/images/team/EYM.jpeg"
                    alt="Portrait of Emmanuel Yeboah Martina"
                    width={128}
                    height={128}
                    className="relative h-full w-full object-cover rounded-full"
                    priority
                  />
                </div>
              </div>

              {/* Text */}
              <div className="relative z-10 flex flex-col items-center">
                <h2 className="text-lg font-semibold tracking-tight text-white uppercase">
                  Emmanuel Yeboah Martina
                </h2>
                <p className="mt-1.5 text-xs font-semibold uppercase tracking-[0.2em] text-white/80">
                  Co-founder &amp; CEO
                </p>
                <p className="mt-4 text-sm text-white/85 leading-relaxed">
                  Financial expert with experience across AML, CTF, KYC, GDPR and
                  digital‑asset operations, shaping EU‑aligned governance and compliant
                  financial architectures for scalable fintech in frontier markets.
                </p>
                <div className="mt-5">
                  <a
                    href="https://www.linkedin.com/in/eymartina/"
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center justify-center rounded-lg bg-[#0077B5] px-4 py-2.5 text-sm font-medium text-white shadow-md shadow-[#0077B5]/20 transition-all hover:bg-[#005885] hover:shadow-lg hover:shadow-[#0077B5]/30 hover:-translate-y-0.5"
                    aria-label="View Emmanuel's LinkedIn profile"
                  >
                    <Linkedin className="h-4 w-4" strokeWidth={2} />
                  </a>
                </div>
              </div>
            </article>

            {/* Kwan */}
            <article
              id="kwan-yuk-li"
              className="group relative flex flex-col items-center text-center rounded-3xl border border-forest/20 bg-gradient-to-b from-forest via-forest to-[#1a3326] px-6 py-8 shadow-[0_18px_45px_rgba(31,59,44,0.3)] transition-all duration-300 ease-out hover:-translate-y-1.5 hover:shadow-[0_24px_60px_rgba(31,59,44,0.4)] hover:border-forest/40 overflow-hidden"
            >
              {/* Leaf background */}
              <div className="pointer-events-none absolute inset-0 bg-[url('/images/leaf_background.webp')] bg-cover bg-center opacity-20 mix-blend-overlay" />
              {/* Prominent Avatar */}
              <div className="relative z-10 mb-5 flex-shrink-0">
                <div className="relative h-32 w-32 overflow-hidden rounded-full bg-sand shadow-lg shadow-black/30 ring-4 ring-white/40 transition-transform duration-300 group-hover:scale-105">
                  <div className="absolute inset-1 rounded-full bg-sand" />
                  <Image
                    src="/images/team/KYL.jpeg"
                    alt="Portrait of Kwan Yuk Li"
                    width={128}
                    height={128}
                    className="relative h-full w-full object-cover rounded-full"
                    priority
                  />
                </div>
              </div>

              {/* Text */}
              <div className="relative z-10 flex flex-col items-center">
                <h2 className="text-lg font-semibold tracking-tight text-white uppercase">
                  Kwan Yuk Li
                </h2>
                <p className="mt-1.5 text-xs font-semibold uppercase tracking-[0.2em] text-white/80">
                  Co-founder &amp; COO
                </p>
                <p className="mt-4 text-sm text-white/85 leading-relaxed">
                  Specialist across finance and IT regulation and risk — DORA, GDPR,
                  IFRS 9 &amp; 17, Solvency II, Basel III, SOX — and European IT
                  infrastructure, designing secure digital architectures and
                  regulatory‑framework strategies for resilient financial services.
                </p>
                <div className="mt-5">
                  <a
                    href="https://nl.linkedin.com/in/kwan-yuk-li-bb040b4"
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center justify-center rounded-lg bg-[#0077B5] px-4 py-2.5 text-sm font-medium text-white shadow-md shadow-[#0077B5]/20 transition-all hover:bg-[#005885] hover:shadow-lg hover:shadow-[#0077B5]/30 hover:-translate-y-0.5"
                    aria-label="View Kwan's LinkedIn profile"
                  >
                    <Linkedin className="h-4 w-4" strokeWidth={2} />
                  </a>
                </div>
              </div>
            </article>
          </div>
          </div>

          {/* Local team */}
          <div className="relative z-10 mx-auto mt-16 max-w-5xl">
            <header className="mb-8 text-center">
              <h2 className="text-lg font-semibold tracking-tight text-[#2E3A39] uppercase">
                Local team
              </h2>
              <p className="mt-2 text-xs font-semibold uppercase tracking-[0.2em] text-[#2E3A39]/70">
                Ghana
              </p>
            </header>

            <div className="flex justify-center">
              {/* Country CEO */}
              <article
                id="vinanda-addo"
                className="group relative flex flex-col items-center text-center rounded-3xl border border-forest/20 bg-gradient-to-b from-forest via-forest to-[#1a3326] px-6 py-8 shadow-[0_18px_45px_rgba(31,59,44,0.3)] transition-all duration-300 ease-out hover:-translate-y-1.5 hover:shadow-[0_24px_60px_rgba(31,59,44,0.4)] hover:border-forest/40 overflow-hidden max-w-sm w-full"
              >
              {/* Leaf background */}
              <div className="pointer-events-none absolute inset-0 bg-[url('/images/leaf_background.webp')] bg-cover bg-center opacity-20 mix-blend-overlay" />
                {/* Prominent Avatar */}
                <div className="relative z-10 mb-5 flex-shrink-0">
                  <div className="relative h-32 w-32 overflow-hidden rounded-full bg-sand shadow-lg shadow-black/30 ring-4 ring-white/40 transition-transform duration-300 group-hover:scale-105">
                    <div className="absolute inset-1 rounded-full bg-sand" />
                    <Image
                      src="/images/team/CEO-GH (VA).jpg"
                      alt="Portrait of Vinanda Addo"
                      width={128}
                      height={128}
                      className="relative h-full w-full object-cover rounded-full"
                    />
                  </div>
                </div>

                {/* Text */}
                <div className="relative z-10 flex flex-col items-center">
                  <h3 className="text-lg font-semibold tracking-tight text-white uppercase">
                    Vinanda Addo
                  </h3>
                  <p className="mt-1.5 text-xs font-semibold uppercase tracking-[0.2em] text-white/80">
                    Country CEO, Ghana
                  </p>
                  <p className="mt-4 text-sm text-white/85 leading-relaxed">
                    Leading Fairways.Tech operations in Ghana, building strategic
                    partnerships with local farmers, cooperatives, and financial
                    institutions to enable inclusive agricultural finance and digital
                    infrastructure across the region.
                  </p>
                  <div className="mt-5">
                    <a
                      href="https://www.linkedin.com/in/vinanda-addo-2774a1b1/"
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center justify-center rounded-lg bg-[#0077B5] px-4 py-2.5 text-sm font-medium text-white shadow-md shadow-[#0077B5]/20 transition-all hover:bg-[#005885] hover:shadow-lg hover:shadow-[#0077B5]/30 hover:-translate-y-0.5"
                      aria-label="View Vinanda Addo's LinkedIn profile"
                    >
                      <Linkedin className="h-4 w-4" strokeWidth={2} />
                    </a>
                  </div>
                </div>
              </article>
            </div>
              </div>

          {/* Advisors */}
          <div className="relative z-10 mx-auto mt-16 max-w-5xl">
            <header className="mb-8 text-center">
              <h2 className="text-lg font-semibold tracking-tight text-[#2E3A39] uppercase">
                Advisors
              </h2>
              <p className="mt-2 text-xs font-semibold uppercase tracking-[0.2em] text-[#2E3A39]/70">
                Banking · Technology · Impact
              </p>
            </header>

            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {/* Aad van Gent */}
              <article
                id="aad-van-gent"
                className="group relative flex flex-col items-center text-center rounded-3xl border border-forest/20 bg-gradient-to-b from-forest via-forest to-[#1a3326] px-6 py-8 shadow-[0_18px_45px_rgba(31,59,44,0.3)] transition-all duration-300 ease-out hover:-translate-y-1.5 hover:shadow-[0_24px_60px_rgba(31,59,44,0.4)] hover:border-forest/40 overflow-hidden"
              >
                {/* Leaf background */}
                <div className="pointer-events-none absolute inset-0 bg-[url('/images/leaf_background.webp')] bg-cover bg-center opacity-20 mix-blend-overlay" />
                {/* Prominent Avatar */}
                <div className="relative z-10 mb-5 flex-shrink-0">
                  <div className="relative h-32 w-32 overflow-hidden rounded-full bg-sand shadow-lg shadow-black/30 ring-4 ring-white/40 transition-transform duration-300 group-hover:scale-105">
                    <div className="absolute inset-1 rounded-full bg-sand" />
                    <Image
                      src="/images/team/aad-van-gent.jpeg.png"
                      alt="Portrait of Aad van Gent"
                      width={128}
                      height={128}
                      className="relative h-full w-full object-cover rounded-full"
                    />
                  </div>
                </div>

                {/* Text */}
                <div className="relative z-10 flex flex-col items-center">
                  <h3 className="text-lg font-semibold tracking-tight text-white uppercase">
                    Aad van Gent
                  </h3>
                  <p className="mt-1.5 text-xs font-semibold uppercase tracking-[0.2em] text-white/80">
                    Retired Enterprise Architecture for BI and Application Architecture
                  </p>
                  <p className="mt-4 text-sm text-white/85 leading-relaxed">
                    Enterprise architecture expert with 38 years in finance and 35 years
                    in architecture, driving cloud-native transformations at major
                    financial institutions including ING and NN Group.
                  </p>
                  <div className="mt-5">
                    <a
                      href="https://www.linkedin.com/in/aadvangent/"
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center justify-center rounded-lg bg-[#0077B5] px-4 py-2.5 text-sm font-medium text-white shadow-md shadow-[#0077B5]/20 transition-all hover:bg-[#005885] hover:shadow-lg hover:shadow-[#0077B5]/30 hover:-translate-y-0.5"
                      aria-label="View Aad van Gent's LinkedIn profile"
                    >
                      <Linkedin className="h-4 w-4" strokeWidth={2} />
                    </a>
                  </div>
                </div>
              </article>

              {/* Gerard Bergsma */}
              <article
                id="gerard-bergsma"
                className="group relative flex flex-col items-center text-center rounded-3xl border border-forest/20 bg-gradient-to-b from-forest via-forest to-[#1a3326] px-6 py-8 shadow-[0_18px_45px_rgba(31,59,44,0.3)] transition-all duration-300 ease-out hover:-translate-y-1.5 hover:shadow-[0_24px_60px_rgba(31,59,44,0.4)] hover:border-forest/40 overflow-hidden"
              >
                {/* Leaf background */}
                <div className="pointer-events-none absolute inset-0 bg-[url('/images/leaf_background.webp')] bg-cover bg-center opacity-20 mix-blend-overlay" />
                {/* Prominent Avatar */}
                <div className="relative z-10 mb-5 flex-shrink-0">
                  <div className="relative h-32 w-32 overflow-hidden rounded-full bg-sand shadow-lg shadow-black/30 ring-4 ring-white/40 transition-transform duration-300 group-hover:scale-105">
                    <div className="absolute inset-1 rounded-full bg-sand" />
                    <Image
                      src="/images/team/gerard-bergsma.jpeg.png"
                      alt="Portrait of Gerard Bergsma"
                      width={128}
                      height={128}
                      className="relative h-full w-full object-cover rounded-full"
                    />
                  </div>
                </div>

                {/* Text */}
                <div className="relative z-10 flex flex-col items-center">
                  <h3 className="text-lg font-semibold tracking-tight text-white uppercase">
                    Gerard Bergsma
                  </h3>
                  <p className="mt-1.5 text-xs font-semibold uppercase tracking-[0.2em] text-white/80">
                    Advisor to the board of People&apos;s Pension Ghana
                  </p>
                  <p className="mt-4 text-sm text-white/85 leading-relaxed">
                    Financial services executive with 47 years of experience, including
                    senior leadership roles as CEO, CFO, and COO. Former ING executive
                    with 30 years of service, and co-founder of People&apos;s Pension Fund
                    Ghana, bringing deep expertise in pension systems and emerging-market
                    finance.
                  </p>
                  <div className="mt-5">
                    <a
                      href="https://www.linkedin.com/in/gerard-bergsma-7387473/"
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center justify-center rounded-lg bg-[#0077B5] px-4 py-2.5 text-sm font-medium text-white shadow-md shadow-[#0077B5]/20 transition-all hover:bg-[#005885] hover:shadow-lg hover:shadow-[#0077B5]/30 hover:-translate-y-0.5"
                      aria-label="View Gerard Bergsma's LinkedIn profile"
                    >
                      <Linkedin className="h-4 w-4" strokeWidth={2} />
                    </a>
                  </div>
                </div>
              </article>

              {/* Michel van der Kleij */}
              <article
                id="michel-van-der-kleij"
                className="group relative flex flex-col items-center text-center rounded-3xl border border-forest/20 bg-gradient-to-b from-forest via-forest to-[#1a3326] px-6 py-8 shadow-[0_18px_45px_rgba(31,59,44,0.3)] transition-all duration-300 ease-out hover:-translate-y-1.5 hover:shadow-[0_24px_60px_rgba(31,59,44,0.4)] hover:border-forest/40 overflow-hidden"
              >
                {/* Leaf background */}
                <div className="pointer-events-none absolute inset-0 bg-[url('/images/leaf_background.webp')] bg-cover bg-center opacity-20 mix-blend-overlay" />
                {/* Prominent Avatar */}
                <div className="relative z-10 mb-5 flex-shrink-0">
                  <div className="relative h-32 w-32 overflow-hidden rounded-full bg-sand shadow-lg shadow-black/30 ring-4 ring-white/40 transition-transform duration-300 group-hover:scale-105">
                    <div className="absolute inset-1 rounded-full bg-sand" />
                    <Image
                      src="/images/team/michel-van-der-kleij.png"
                      alt="Portrait of Michel van der Kleij"
                      width={128}
                      height={128}
                      className="relative h-full w-full object-cover rounded-full"
                    />
                  </div>
                </div>

                {/* Text */}
                <div className="relative z-10 flex flex-col items-center">
                  <h3 className="text-lg font-semibold tracking-tight text-white uppercase">
                    Michel van der Kleij
                  </h3>
                  <p className="mt-1.5 text-xs font-semibold uppercase tracking-[0.2em] text-white/80">
                    Chief Information Security/Risk Officer (CISSP, CISA, CEH)
                  </p>
                  <p className="mt-4 text-sm text-white/85 leading-relaxed">
                    Information security and risk management specialist with 31 years of
                    experience, including 20+ years in financial services. Certified
                    security professional and technology leader, serving as CTO and
                    founder of purpose-driven organisations focused on secure digital
                    infrastructure.
                  </p>
                  <div className="mt-5">
                    <a
                      href="https://www.linkedin.com/in/michel-v-d-kleij/"
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center justify-center rounded-lg bg-[#0077B5] px-4 py-2.5 text-sm font-medium text-white shadow-md shadow-[#0077B5]/20 transition-all hover:bg-[#005885] hover:shadow-lg hover:shadow-[#0077B5]/30 hover:-translate-y-0.5"
                      aria-label="View Michel van der Kleij's LinkedIn profile"
                    >
                      <Linkedin className="h-4 w-4" strokeWidth={2} />
                    </a>
                  </div>
                </div>
              </article>

              {/* Rene Smit */}
              <article
                id="rene-smit"
                className="group relative flex flex-col items-center text-center rounded-3xl border border-forest/20 bg-gradient-to-b from-forest via-forest to-[#1a3326] px-6 py-8 shadow-[0_18px_45px_rgba(31,59,44,0.3)] transition-all duration-300 ease-out hover:-translate-y-1.5 hover:shadow-[0_24px_60px_rgba(31,59,44,0.4)] hover:border-forest/40 overflow-hidden"
              >
                {/* Leaf background */}
                <div className="pointer-events-none absolute inset-0 bg-[url('/images/leaf_background.webp')] bg-cover bg-center opacity-20 mix-blend-overlay" />
                {/* Prominent Avatar */}
                <div className="relative z-10 mb-5 flex-shrink-0">
                  <div className="relative h-32 w-32 overflow-hidden rounded-full bg-sand shadow-lg shadow-black/30 ring-4 ring-white/40 transition-transform duration-300 group-hover:scale-105">
                    <div className="absolute inset-1 rounded-full bg-sand" />
                    <Image
                      src="/images/team/rene-smit.png"
                      alt="Portrait of Rene Smit"
                      width={128}
                      height={128}
                      className="relative h-full w-full object-cover rounded-full"
                    />
                  </div>
                </div>

                {/* Text */}
                <div className="relative z-10 flex flex-col items-center">
                  <h3 className="text-lg font-semibold tracking-tight text-white uppercase">
                    Rene Smit
                  </h3>
                  <p className="mt-1.5 text-xs font-semibold uppercase tracking-[0.2em] text-white/80">
                    Retired Managing Director at NN Group
                  </p>
                  <p className="mt-4 text-sm text-white/85 leading-relaxed">
                    Strategic and commercial finance executive with 35+ years of
                    experience, including 20+ years in financial services. Former
                    Managing Director at NN Group, leading multiple mergers and
                    acquisitions and establishing venture partnerships to drive
                    innovation in financial services.
                  </p>
                  <div className="mt-5">
                    <a
                      href="https://www.linkedin.com/in/renehsmit/"
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center justify-center rounded-lg bg-[#0077B5] px-4 py-2.5 text-sm font-medium text-white shadow-md shadow-[#0077B5]/20 transition-all hover:bg-[#005885] hover:shadow-lg hover:shadow-[#0077B5]/30 hover:-translate-y-0.5"
                      aria-label="View Rene Smit's LinkedIn profile"
                    >
                      <Linkedin className="h-4 w-4" strokeWidth={2} />
                    </a>
                  </div>
                </div>
              </article>

              {/* Thea Fierens */}
              <article
                id="thea-fierens"
                className="group relative flex flex-col items-center text-center rounded-3xl border border-forest/20 bg-gradient-to-b from-forest via-forest to-[#1a3326] px-6 py-8 shadow-[0_18px_45px_rgba(31,59,44,0.3)] transition-all duration-300 ease-out hover:-translate-y-1.5 hover:shadow-[0_24px_60px_rgba(31,59,44,0.4)] hover:border-forest/40 overflow-hidden"
              >
                {/* Leaf background */}
                <div className="pointer-events-none absolute inset-0 bg-[url('/images/leaf_background.webp')] bg-cover bg-center opacity-20 mix-blend-overlay" />
                {/* Prominent Avatar */}
                <div className="relative z-10 mb-5 flex-shrink-0">
                  <div className="relative h-32 w-32 overflow-hidden rounded-full bg-sand shadow-lg shadow-black/30 ring-4 ring-white/40 transition-transform duration-300 group-hover:scale-105">
                    <div className="absolute inset-1 rounded-full bg-sand" />
                    <Image
                      src="/images/team/thea-fierens.png"
                      alt="Portrait of Thea Fierens"
                      width={128}
                      height={128}
                      className="relative h-full w-full object-cover rounded-full"
                    />
                  </div>
                </div>

                {/* Text */}
                <div className="relative z-10 flex flex-col items-center">
                  <h3 className="text-lg font-semibold tracking-tight text-white uppercase">
                    Thea Fierens
                  </h3>
                  <p className="mt-1.5 text-xs font-semibold uppercase tracking-[0.2em] text-white/80">
                    Development &amp; Impact Advisor
                  </p>
                  <p className="mt-4 text-sm text-white/85 leading-relaxed">
                    Development and impact specialist with 48 years of experience in
                    Global South NGOs and government. Former Executive Director of UNFPA,
                    Dutch Member of Parliament, and Executive Director of the Dutch
                    Development Fund, bringing deep expertise in international development
                    and policy frameworks.
                  </p>
                  <div className="mt-5">
                    <a
                      href="https://www.linkedin.com/in/thea-fierens-b79a104/"
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center justify-center rounded-lg bg-[#0077B5] px-4 py-2.5 text-sm font-medium text-white shadow-md shadow-[#0077B5]/20 transition-all hover:bg-[#005885] hover:shadow-lg hover:shadow-[#0077B5]/30 hover:-translate-y-0.5"
                      aria-label="View Thea Fierens's LinkedIn profile"
                    >
                      <Linkedin className="h-4 w-4" strokeWidth={2} />
                    </a>
                  </div>
                </div>
            </article>
            </div>
          </div>

          <p className="relative z-10 mt-8 text-center text-xs text-slate-600">
            More profiles will be added as the team grows.
          </p>
        </div>
      </section>
      </main>
      <Footer />
    </>
  );
}