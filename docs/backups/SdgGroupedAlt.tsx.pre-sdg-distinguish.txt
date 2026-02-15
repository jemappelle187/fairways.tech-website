import React from "react";

type Sdg = { id: number; label: string; file: string; short?: string };

/**
 * SdgGroupedAlt (logos-only)
 * - Plain grid of logos (large), caption below each logo.
 * - No single glass container, no surrounding heavy card.
 * - Hover effect applies to logos only (scale + subtle shadow).
 */
export default function SdgGroupedAlt({ list }: { list: Sdg[] }) {
  return (
    <section aria-labelledby="sdg-logos-only-heading" className="mt-12">
      <h2 id="sdg-logos-only-heading" className="text-2xl font-semibold text-center">
        Alternate SDG view — logos only
      </h2>
      <p className="text-sm text-center text-gray-600 mt-2">
        Compact icon-first layout (logos prominent; captions below).
      </p>

      <div className="mt-8">
        <div className="w-full px-4">
          <div className="grid gap-6 grid-cols-2 sm:grid-cols-3 md:grid-cols-6 items-start">
            {list.map((s) => (
              <div key={s.id} className="flex flex-col items-center text-center p-2">
                <button
                  type="button"
                  className="sdg-logo-btn p-2 rounded-md bg-transparent border-0 cursor-pointer"
                  aria-label={`SDG ${s.id}: ${s.label}`}
                >
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={s.file}
                    alt={`SDG ${s.id} icon`}
                    className="sdg-logo-only-img"
                    width={112}
                    height={112}
                  />
                </button>

                <div className="font-semibold mt-3">SDG {s.id}</div>
                <div className="text-sm mt-1">{s.label}</div>
                {s.short ? (
                  <div className="text-xs text-gray-600 mt-2 max-w-[10rem]">{s.short}</div>
                ) : null}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
