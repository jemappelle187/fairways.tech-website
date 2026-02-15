import React from "react";

type Sdg = { id: number; label: string; file: string; short?: string };

/**
 * SdgGroupedAlt - single glass container that groups SDG icons and captions inside one panel.
 * Good for a compact, single-card presentation (icon + caption per SDG, all inside one container).
 */
export default function SdgGroupedAlt({ list }: { list: Sdg[] }) {
  return (
    <section aria-labelledby="sdg-grouped-heading" className="mt-12">
      <h2 id="sdg-grouped-heading" className="text-2xl font-semibold text-center">
        Grouped SDG view — single container
      </h2>
      <p className="text-sm text-center text-gray-600 mt-2">
        Compact single-panel layout: icons + captions inside one glass card.
      </p>

      <div className="mt-8">
        <div className="sdg-glass p-6">
          <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-6">
            <div className="md:w-1/4">
              <h3 className="text-lg font-semibold">Our SDG focus</h3>
              <p className="text-sm text-gray-700 mt-2">
                We align our pilot activities with these Sustainable Development Goals. Hover any icon for emphasis.
              </p>
            </div>

            <div className="md:w-3/4">
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-6 items-start">
                {list.map((s) => (
                  <div key={s.id} className="flex flex-col items-center text-center p-2">
                    <div className="sdg-logo-wrap p-2 rounded-md">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={s.file}
                        alt={`SDG ${s.id} icon`}
                        className="sdg-grouped-logo"
                        width={96}
                        height={96}
                      />
                    </div>
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
        </div>
      </div>
    </section>
  );
}
