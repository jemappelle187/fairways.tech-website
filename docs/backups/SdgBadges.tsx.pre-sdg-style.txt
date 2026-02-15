import React from "react";

export type SdgItem = { id: number; label: string; file: string; short: string; alt?: string };

export default function SdgBadges({ list, compact = false }: { list: SdgItem[]; compact?: boolean }) {
  return (
    <section aria-labelledby="sdg-heading" className="py-6">
      <div className="max-w-6xl mx-auto px-4">
        {!compact && <h2 id="sdg-heading" className="text-2xl font-semibold mb-4">Sustainable Development Goals</h2>}
        <div className={compact ? "flex items-center gap-4" : "grid gap-6 grid-cols-1 sm:grid-cols-3"}>
          {list.map((s) => (
            <article key={s.id} className={compact ? "flex items-center space-x-3" : "p-4 border rounded-lg shadow-sm bg-white"}>
              <div className="flex-none w-12 h-12">
                <img src={s.file} alt={s.alt ?? `SDG ${s.id} — ${s.label}`} width={48} height={48} role="img" />
              </div>
              <div className="min-w-0">
                <h3 className="text-sm font-medium">{`SDG ${s.id} — ${s.label}`}</h3>
                <p className="text-xs text-gray-700 mt-1">{s.short}</p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
