import React from "react";

type Sdg = { id: number; label: string; file: string; short?: string };

/**
 * SdgGroupedAlt — logos-only view, 4 per row.
 */
type Props = { list: Sdg[]; title?: string; subtitle?: string; animateIn?: boolean };

export default function SdgGroupedAlt({ list, title, subtitle, animateIn = false }: Props) {
  return (
    <section aria-labelledby={title ? "sdg-section-heading" : undefined} aria-label={!title ? "Our focus SDGs" : undefined} className="mt-12">
      {(title || subtitle) && (
        <div className="text-center mb-8">
          {title && (
            <h2 id="sdg-section-heading" className="text-xl font-semibold text-stone sm:text-2xl">
              {title}
            </h2>
          )}
          {subtitle && (
            <p className="mt-2 text-sm text-gray-600 sm:text-base">
              {subtitle}
            </p>
          )}
        </div>
      )}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 sm:gap-8 items-center justify-items-center px-4">
        {list.map((s, index) => (
          <div
            key={s.id}
            className={`flex flex-col items-center p-2 transition-all duration-700 ease-out hover:scale-110 ${
              animateIn ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
            }`}
            style={{ transitionDelay: animateIn ? `${index * 110}ms` : "0ms" }}
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
