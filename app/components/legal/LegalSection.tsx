import type { ReactNode } from "react";

export type LegalSectionProps = {
  id: string;
  title: string;
  /** No top border or extra padding above the first section. */
  isFirst?: boolean;
  children: ReactNode;
};

export function LegalSection({
  id,
  title,
  isFirst = false,
  children,
}: LegalSectionProps) {
  return (
    <section
      id={id}
      className={
        isFirst
          ? "scroll-mt-24 pt-0"
          : "scroll-mt-24 border-t border-stone-200/80 pt-8 sm:pt-10"
      }
    >
      <h2 className="text-xl font-semibold text-stone sm:text-2xl">{title}</h2>
      <div className="mt-4 space-y-4 text-sm leading-relaxed text-slate-800 sm:text-base">
        {children}
      </div>
    </section>
  );
}
