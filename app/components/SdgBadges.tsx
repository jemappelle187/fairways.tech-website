import React from "react";

export type SdgItem = { id: number; label: string; file: string; short: string; alt?: string };

export default function SdgBadges({
  list,
  compact = false,
  variant = "supporting",
}: {
  list: SdgItem[];
  compact?: boolean;
  variant?: "supporting" | "primary";
}) {
  const isPrimary = variant === "primary";
  const iconSize = isPrimary ? 72 : 56;

  return (
    <div className={isPrimary ? "grid grid-cols-1 gap-4 md:grid-cols-3" : "sdg-support-row"}>
      {list.map((s) => (
        <div
          key={s.id}
          className={isPrimary ? "sdg-glass sdg-primary-card" : "sdg-glass sdg-support-item"}
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={s.file}
            alt={s.alt ?? `SDG ${s.id} — ${s.label}`}
            className="sdg-badge-img"
            width={iconSize}
            height={iconSize}
            role="img"
          />
          <div className="min-w-0">
            <div className="sdg-card-title">{`SDG ${s.id} — ${s.label}`}</div>
            <div className="sdg-card-desc mt-1">{s.short}</div>
          </div>
        </div>
      ))}
    </div>
  );
}
