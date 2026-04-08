"use client";

import { useId, useState } from "react";
import { ChevronDown } from "lucide-react";

export type AboutFaqItem = { question: string; answer: string };

export function AboutFaqAccordion({ items }: { items: AboutFaqItem[] }) {
  const baseId = useId();
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <dl className="mx-auto max-w-3xl space-y-3 text-center">
      {items.map((item, i) => {
        const isOpen = openIndex === i;
        const headingId = `${baseId}-h-${i}`;
        const panelId = `${baseId}-p-${i}`;
        return (
          <div
            key={`${i}-${item.question}`}
            className="overflow-hidden rounded-2xl border border-slate-200/35 bg-white/70 shadow-[0_2px_12px_rgba(15,23,42,0.04)] transition-colors hover:border-forest/20"
          >
            <dt className="m-0">
              <button
                type="button"
                id={headingId}
                aria-expanded={isOpen}
                aria-controls={panelId}
                onClick={() => setOpenIndex(isOpen ? null : i)}
                className="relative flex w-full items-start justify-center px-12 py-5 text-center focus:outline-none focus-visible:ring-2 focus-visible:ring-forest focus-visible:ring-offset-2 focus-visible:ring-offset-white/80"
              >
                <span className="text-lg font-semibold text-stone">
                  {item.question}
                </span>
                <ChevronDown
                  className={`absolute right-4 top-5 h-5 w-5 shrink-0 text-forest transition-transform duration-200 ease-out motion-reduce:transition-none ${
                    isOpen ? "rotate-180" : "rotate-0"
                  }`}
                  aria-hidden
                />
              </button>
            </dt>
            <dd className="m-0">
              <div
                id={panelId}
                role="region"
                aria-labelledby={headingId}
                aria-hidden={!isOpen}
                className={`grid transition-[grid-template-rows] duration-200 ease-out motion-reduce:transition-none ${
                  isOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
                }`}
              >
                <div className="min-h-0 overflow-hidden">
                  <p className="border-t border-slate-200/50 px-5 pb-5 pt-3 text-center text-base leading-relaxed text-slate-700">
                    {item.answer}
                  </p>
                </div>
              </div>
            </dd>
          </div>
        );
      })}
    </dl>
  );
}
