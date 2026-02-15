import React from "react";
import SdgBadges, { SdgItem } from "./SdgBadges";

const supporting: SdgItem[] = [
  { id: 3, label: "Good Health and Well-being", file: "/images/sdg/sdg-3-good-health.svg", short: "Improve food safety and reduce foodborne illness" },
  { id: 5, label: "Gender Equality", file: "/images/sdg/sdg-5-gender-equality.svg", short: "Support women-led farm businesses to scale" },
  { id: 9, label: "Industry, Innovation & Infrastructure", file: "/images/sdg/sdg-9-industry-infrastructure.svg", short: "Finance cold-chain and processing infrastructure" },
];

export default function PoultryCaseStudy() {
  return (
    <section aria-labelledby="implementation-heading" className="py-8">
      <div className="max-w-6xl mx-auto px-4">
        <div className="bg-white p-6 rounded-xl shadow-md">
          <div className="flex items-start justify-between">
            <div>
              <h3 id="implementation-heading" className="text-2xl font-semibold">Implementation example — Poultry HACCP upgrade</h3>
              <p className="text-sm text-gray-700 mt-2">
                Evidence: supporting a women-owned poultry farm to reach supermarket-grade processing by financing cold-chain and processing equipment,
                improving hygiene standards, and preparing for HACCP readiness. This is a pilot-level intervention; certification and procurement outcomes
                depend on external auditors and buyer contracts.
              </p>
            </div>

            <div className="ml-6">
              <SdgBadges list={supporting} compact />
            </div>
          </div>

          <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="p-4 border rounded">
              <h4 className="font-semibold">Scope</h4>
              <p className="text-sm text-gray-600 mt-1">Cold chain + processing; hygiene upgrades; operator training.</p>
            </div>

            <div className="p-4 border rounded">
              <h4 className="font-semibold">Objective</h4>
              <p className="text-sm text-gray-600 mt-1">Prepare the site for buyer procurement and HACCP audit readiness.</p>
            </div>

            <div className="p-4 border rounded">
              <h4 className="font-semibold">Engagement</h4>
              <p className="text-sm text-gray-600 mt-1">Financing equipment and technical assistance; procurement introductions to buyers.</p>
            </div>
          </div>

          <div className="mt-6">
            <a href="/contact" className="inline-block px-5 py-2 bg-green-600 text-white rounded">Request support / Partner with us</a>
          </div>
        </div>
      </div>
    </section>
  );
}
