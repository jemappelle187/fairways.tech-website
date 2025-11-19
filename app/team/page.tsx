import React from "react";
import Image from "next/image";
import { Linkedin } from "lucide-react";

export default function TeamPage() {
  return (
    <main className="min-h-screen bg-sand">
      <section className="relative overflow-hidden pt-28 pb-24">
        {/* Leaf background */}
        <div className="pointer-events-none absolute inset-0 -z-20 bg-[url('/images/leaf_background.png')] bg-cover bg-center" />
        {/* Darken + sand fade so text stays readable */}
        <div className="pointer-events-none absolute inset-0 -z-10 bg-black/25" />
        <div className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-20 bg-gradient-to-b from-sand via-sand/40 to-transparent" />
        <div className="pointer-events-none absolute inset-x-0 bottom-0 -z-10 h-24 bg-gradient-to-b from-transparent via-sand/30 to-sand" />

        <div className="relative mx-auto max-w-6xl px-6 lg:px-8">
          {/* Page heading */}
          <header className="mx-auto max-w-3xl text-center">
            <p className="mb-3 text-xs font-semibold uppercase tracking-[0.28em] text-forest">
              Our team
            </p>
            <h1 className="mb-4 text-3xl font-semibold text-slate-900 md:text-4xl">
              The people behind Fairways.Tech
            </h1>
            <p className="mx-auto max-w-3xl text-sm text-slate-700 md:text-base">
              We combine expertise across agriculture, compliance, digital identity,
              product and emerging-markets finance to build trusted rails for farmers,
              cooperatives and financial institutions.
            </p>
            <p className="mt-3 text-xs font-medium uppercase tracking-[0.2em] text-slate-500">
              Based across Africa, Asia &amp; Europe
            </p>
          </header>

          {/* Founders */}
          <div className="mx-auto mt-12 grid max-w-4xl gap-8 md:grid-cols-2">
            {/* Emmanuel */}
            <article className="flex flex-col gap-4 rounded-3xl border border-white/60 bg-white/90 p-6 text-left shadow-md shadow-black/5 backdrop-blur-sm md:flex-row md:items-center">
              {/* Avatar slot */}
              <div className="mx-auto flex-shrink-0 md:mx-0">
                <div className="relative h-20 w-20 overflow-hidden rounded-full bg-sand shadow-sm shadow-black/10 ring-1 ring-white/60">
                  <Image
                    src="https://ui-avatars.com/api/?name=Emmanuel+Martina&background=16a34a&color=fff&size=80&bold=true"
                    alt="Portrait of Emmanuel Martina"
                    fill
                    className="object-cover"
                  />
                </div>
              </div>

              {/* Text */}
              <div className="flex-1">
                <h2 className="text-sm font-semibold text-slate-900">
                  Emmanuel Yeboah Martina
                </h2>
                <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-forest">
                  Co-founder
                </p>
                <p className="mt-2 text-sm text-slate-700">
                Expert in AML/CTF, digital-asset compliance and financial-services regulation, shaping EU-aligned governance for scalable fintech in frontier markets.
                </p>
                <div className="mt-3">
                  <a
                    href="https://www.linkedin.com/in/eymartina/"
                    // TODO: replace "#" with Emmanuel's real LinkedIn URL
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center justify-center rounded-lg bg-[#0077B5] p-2.5 text-white shadow-md shadow-[#0077B5]/20 transition-all hover:bg-[#005885] hover:shadow-lg hover:shadow-[#0077B5]/30 hover:-translate-y-0.5"
                    aria-label="View Emmanuel's LinkedIn profile"
                  >
                    <Linkedin className="h-4 w-4" />
                  </a>
                </div>
              </div>
            </article>

            {/* Kwan */}
            <article className="flex flex-col gap-4 rounded-3xl border border-white/60 bg-white/90 p-6 text-left shadow-md shadow-black/5 backdrop-blur-sm md:flex-row md:items-center">
              {/* Avatar slot */}
              <div className="mx-auto flex-shrink-0 md:mx-0">
                <div className="relative h-20 w-20 overflow-hidden rounded-full bg-sand shadow-sm shadow-black/10 ring-1 ring-white/60">
                  <Image
                    src="https://ui-avatars.com/api/?name=Kwan+Yuk+Li&background=16a34a&color=fff&size=80&bold=true"
                    alt="Portrait of Kwan Yuk Li"
                    fill
                    className="object-cover"
                  />
                </div>
              </div>

              {/* Text */}
              <div className="flex-1">
                <h2 className="text-sm font-semibold text-slate-900">
                  Kwan Yuk Li
                </h2>
                <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-forest">
                  Co-founder
                </p>
                <p className="mt-2 text-sm text-slate-700">
                Specialist in EU DORA, GDPR and European IT infrastructure, designing secure digital architectures and regulatory-framework strategies for resilient financial services.
                </p>
                <div className="mt-3">
                  <a
                    href="https://nl.linkedin.com/in/kwan-yuk-li-bb040b4"
                    // TODO: replace "#" with Kwan's real LinkedIn URL
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center justify-center rounded-lg bg-[#0077B5] p-2.5 text-white shadow-md shadow-[#0077B5]/20 transition-all hover:bg-[#005885] hover:shadow-lg hover:shadow-[#0077B5]/30 hover:-translate-y-0.5"
                    aria-label="View Kwan's LinkedIn profile"
                  >
                    <Linkedin className="h-4 w-4" />
                  </a>
                </div>
              </div>
            </article>
          </div>

          {/* Advisors & partners */}
          <div className="mx-auto mt-10 max-w-4xl">
            <article className="rounded-3xl border border-white/60 bg-white/92 p-6 text-left text-slate-800 shadow-md shadow-black/5 backdrop-blur-sm sm:p-8">
              <h2 className="text-sm font-semibold text-slate-900">
                Advisors &amp; Partners
              </h2>
              <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-forest">
                Banking · Horticulture · Impact
              </p>
              <p className="mt-3 text-sm text-slate-700">
                A collective of specialists supporting compliance, horticulture,
                banking strategy and impact measurement. Profiles will be added as
                formal partnerships are announced.
              </p>
            </article>
          </div>

          <p className="mt-8 text-center text-xs text-slate-500">
            More profiles will be added as the team grows.
          </p>
        </div>
      </section>
    </main>
  );
}