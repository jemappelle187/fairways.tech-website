import React from "react";

type Sdg = { id: number; label: string; file: string; short?: string };

/**
 * SdgGroupedAlt — logos-only view with two groups:
 * - Primary row (first 3 items): larger logos, stronger captions.
 * - Supporting row (last 3 items): smaller logos, muted captions.
 *
 * Keep logos accessible (button with aria-label) and hover only affects logo.
 */
export default function SdgGroupedAlt({ list }: { list: Sdg[] }) {
  const primary = list.slice(0, 3);
  const supporting = list.slice(3);

  return (
    <section aria-labelledby="sdg-logos-groups-heading" className="mt-12">
      <h2 id="sdg-logos-groups-heading" className="text-2xl font-semibold text-center">
        Alternate SDG view — logos only
      </h2>
      <p className="text-sm text-center text-gray-600 mt-2">
        Compact icon-first layout. Primary goals emphasized; supporting goals muted.
      </p>

      <div className="mt-8 px-4">
        <div className="mb-8">
          <h3 className="text-lg font-semibold text-center mb-4">Primary SDGs</h3>
          <div className="grid gap-8 grid-cols-1 sm:grid-cols-3 items-start justify-items-center">
            {primary.map((s) => (
              <div key={s.id} className="flex flex-col items-center text-center p-2">
                <button
                  type="button"
                  className="sdg-logo-btn-primary p-2 rounded-full border-0 cursor-pointer"
                  aria-label={`Primary SDG ${s.id}: ${s.label}`}
                >
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={s.file}
                    alt={`SDG ${s.id} icon`}
                    className="sdg-logo-primary-img"
                    width={128}
                    height={128}
                  />
                </button>

                <div className="font-semibold mt-3 text-lg">SDG {s.id}</div>
                <div className="text-sm mt-1 font-medium">{s.label}</div>
                {s.short ? (
                  <div className="text-xs text-gray-700 mt-2 max-w-[12rem]">{s.short}</div>
                ) : null}
              </div>
            ))}
          </div>
        </div>

        <div>
          <h3 className="text-lg font-semibold text-center mb-4">Supporting SDGs</h3>
          <div className="grid gap-6 grid-cols-1 sm:grid-cols-3 items-start justify-items-center">
            {supporting.map((s) => (
              <div key={s.id} className="flex flex-col items-center text-center p-2 opacity-95">
                <button
                  type="button"
                  className="sdg-logo-btn-support p-1 rounded-md border-0 cursor-pointer"
                  aria-label={`Supporting SDG ${s.id}: ${s.label}`}
                >
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={s.file}
                    alt={`SDG ${s.id} icon`}
                    className="sdg-logo-support-img"
                    width={88}
                    height={88}
                  />
                </button>

                <div className="font-semibold mt-3 text-sm">SDG {s.id}</div>
                <div className="text-sm mt-1 text-gray-700">{s.label}</div>
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
