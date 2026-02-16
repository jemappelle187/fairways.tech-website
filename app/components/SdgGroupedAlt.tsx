import React from "react";

type Sdg = { id: number; label: string; file: string; short?: string };

/**
 * SdgGroupedAlt — logos-only view, 4 per row.
 */
type Props = { list: Sdg[] };

export default function SdgGroupedAlt({ list }: Props) {
  return (
    <section aria-label="Our focus SDGs" className="mt-12">
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 sm:gap-8 items-center justify-items-center px-4">
        {list.map((s) => (
          <div
            key={s.id}
            className="flex flex-col items-center p-2 transition-transform duration-200 ease-out hover:scale-110"
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={s.file}
              alt={`SDG ${s.id}: ${s.label}`}
              className="sdg-logo-uniform-img"
              width={128}
              height={128}
            />
          </div>
        ))}
      </div>
    </section>
  );
}
