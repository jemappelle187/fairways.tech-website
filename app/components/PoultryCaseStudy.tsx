import React from "react";
import type { SdgItem } from "./SdgBadges";

/**
 * Premium implementation-first component for poultry HACCP upgrade.
 * Optional background: public/images/impact/poultry-bg.jpg
 */

const supporting: SdgItem[] = [
  { id: 3, label: "Good Health and Well-being", file: "/images/sdg/sdg-3-good-health.svg", short: "Improve food safety and reduce foodborne illness" },
  { id: 5, label: "Gender Equality", file: "/images/sdg/sdg-5-gender-equality.svg", short: "Support women-led farm businesses to scale" },
  { id: 9, label: "Industry, Innovation & Infrastructure", file: "/images/sdg/sdg-9-industry-infrastructure.svg", short: "Finance cold-chain and processing infrastructure" },
];

export default function PoultryCaseStudy() {
  return (
    <section aria-labelledby="implementation-heading" className="py-12 bg-transparent">
      <div className="max-w-6xl mx-auto px-4">
        <div className="relative bg-white rounded-2xl shadow-lg overflow-hidden">
          {/* optional background image with subtle overlay */}
          <div
            aria-hidden="true"
            className="absolute inset-0"
            style={{
              backgroundImage: "url('/images/impact/poultry-bg.jpg')",
              backgroundSize: "cover",
              backgroundPosition: "center",
              opacity: 0.08,
              filter: "grayscale(0.1) saturate(0.8)",
            }}
          />
          <div className="relative p-8 md:p-10 lg:p-12">
            <div className="flex flex-col lg:flex-row gap-8">
              <div className="flex-1">
                <h3 id="implementation-heading" className="text-2xl font-semibold leading-tight">
                  Implementation example — Poultry HACCP upgrade
                </h3>

                <p className="mt-4 text-base text-gray-700 max-w-3xl">
                  Supporting a women-owned poultry producer to meet HACCP-aligned standards and supermarket procurement requirements by financing cold-chain
                  infrastructure, improving processing hygiene, and scaling operator training. We design interventions to align with buyer and auditor expectations
                  while protecting food-safety outcomes and commercial viability.
                </p>

                <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="p-4 border rounded-lg bg-white">
                    <h4 className="font-semibold">Scope</h4>
                    <p className="mt-2 text-sm text-gray-600">Cold chain and processing equipment; hygiene upgrades; operator capacity building.</p>
                  </div>

                  <div className="p-4 border rounded-lg bg-white">
                    <h4 className="font-semibold">Objective</h4>
                    <p className="mt-2 text-sm text-gray-600">Prepare the facility to meet buyer requirements and improve supply reliability.</p>
                  </div>

                  <div className="p-4 border rounded-lg bg-white">
                    <h4 className="font-semibold">Engagement</h4>
                    <p className="mt-2 text-sm text-gray-600">Blended capital for equipment and technical assistance; procurement introductions for offtake.</p>
                  </div>
                </div>

                <div className="mt-6">
                  <a href="/contact" className="inline-block px-6 py-3 bg-green-600 text-white rounded-lg shadow">Request support / Partner with us</a>
                </div>
              </div>

              <aside className="w-full lg:w-72 flex-shrink-0">
                <div className="space-y-4">
                  {supporting.map((s) => (
                    <div key={s.id} className="flex items-start gap-3 p-3 rounded-lg border bg-white/60 shadow-sm">
                      <div className="w-12 h-12 flex-none">
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img src={s.file} alt={`SDG ${s.id} — ${s.label}`} width={48} height={48} role="img" />
                      </div>
                      <div>
                        <div className="text-sm font-semibold">SDG {s.id} — {s.label}</div>
                        <div className="text-xs text-gray-600 mt-1">{s.short}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </aside>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
