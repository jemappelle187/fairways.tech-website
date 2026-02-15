import React from "react";

type Sdg = { id: number; label: string; file: string; short?: string };

export default function SdgGridAlt({ list }: { list: Sdg[] }) {
  return (
    <section aria-labelledby="sdg-alt-heading" className="mt-12">
      <h2 id="sdg-alt-heading" className="text-2xl font-semibold text-center">
        Alternate SDG view — icons + captions
      </h2>
      <p className="text-sm text-center text-gray-600 mt-2">
        Icon-first layout for compact/visual comparison.
      </p>

      <div className="mt-6 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-6">
        {list.map((s) => (
          <div
            key={s.id}
            className="sdg-glass p-4 flex flex-col items-center text-center"
            role="group"
            aria-label={`SDG ${s.id} — ${s.label}`}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={s.file}
              alt={`SDG ${s.id} icon`}
              className="w-20 h-20 object-contain mb-3"
            />
            <div className="font-semibold text-sm">SDG {s.id}</div>
            <div className="text-sm mt-1">{s.label}</div>
            {s.short ? (
              <div className="text-xs text-gray-600 mt-2 max-w-[12rem]">{s.short}</div>
            ) : null}
          </div>
        ))}
      </div>
    </section>
  );
}
