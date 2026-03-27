import React from "react";
import SdgBadges, { SdgItem } from "@/app/components/SdgBadges";

const supporting: SdgItem[] = [
  { id: 3, label: "Good Health and Well-being", file: "/images/sdg/sdg-3-good-health.svg", short: "Improve food safety and reduce foodborne illness" },
  { id: 5, label: "Gender Equality", file: "/images/sdg/sdg-5-gender-equality.svg", short: "Support women-led farm businesses to scale" },
  { id: 9, label: "Industry, Innovation & Infrastructure", file: "/images/sdg/sdg-9-industry-infrastructure.svg", short: "Finance cold-chain and processing infrastructure" },
];

export default function PoultryCaseStudy() {
  return (
    <section aria-labelledby="poultry-heading" className="py-6">
      <div className="max-w-4xl mx-auto px-4 bg-white p-4 rounded-lg shadow-sm">
        <h3 id="poultry-heading" className="text-lg font-semibold">Poultry Case Study — HACCP upgrade</h3>
        <p className="text-sm text-gray-700 mt-2">
          We are supporting a women-owned poultry farm to reach supermarket-grade processing by financing cold-chain and processing equipment,
          improving hygiene standards and preparing for HACCP readiness. This work aims to increase market access while maintaining neutral language
          about certification status.
        </p>

        <div className="mt-4">
          <SdgBadges list={supporting} compact={false} />
        </div>

        <div className="mt-4">
          <a href="/contact" className="inline-block px-4 py-2 bg-green-600 text-white rounded">Request support / Partner with us</a>
        </div>
      </div>
    </section>
  );
}
