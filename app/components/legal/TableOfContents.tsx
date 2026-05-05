"use client";

import { useEffect, useRef, useState } from "react";

export type TableOfContentsProps = {
  items: { id: string; label: string }[];
};

const ROOT_MARGIN = "-20% 0px -65% 0px";

function pickActiveId(
  items: { id: string; label: string }[],
  visible: Record<string, boolean>
): string {
  const firstVisible = items.find((i) => visible[i.id])?.id;
  if (firstVisible) return firstVisible;

  if (typeof document === "undefined") return items[0]?.id ?? "";

  for (let idx = items.length - 1; idx >= 0; idx--) {
    const el = document.getElementById(items[idx].id);
    if (!el) continue;
    const top = el.getBoundingClientRect().top;
    if (top < window.innerHeight * 0.35) {
      return items[idx].id;
    }
  }

  return items[0]?.id ?? "";
}

export function TableOfContents({ items }: TableOfContentsProps) {
  const [activeId, setActiveId] = useState(() => items[0]?.id ?? "");
  const visibleRef = useRef<Record<string, boolean>>({});

  useEffect(() => {
    if (items.length === 0) return;

    const elements = items
      .map((i) => document.getElementById(i.id))
      .filter((el): el is HTMLElement => el !== null);

    if (elements.length === 0) return;

    for (const i of items) {
      visibleRef.current[i.id] = false;
    }

    const update = () => {
      setActiveId(pickActiveId(items, visibleRef.current));
    };

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          const id = entry.target.id;
          if (id) visibleRef.current[id] = entry.isIntersecting;
        }
        update();
      },
      { root: null, rootMargin: ROOT_MARGIN, threshold: 0 }
    );

    for (const el of elements) {
      observer.observe(el);
    }

    update();

    return () => observer.disconnect();
  }, [items]);

  if (items.length === 0) {
    return null;
  }

  const linkBase =
    "underline-offset-2 transition-colors hover:underline focus:outline-none focus:ring-2 focus:ring-forest focus:ring-offset-2 rounded";

  return (
    <nav aria-label="On this page" className="text-sm text-slate-600">
      <p className="mb-2 font-medium text-slate-700">On this page</p>
      <ol className="space-y-1.5">
        {items.map((item) => {
          const isActive = activeId === item.id;
          return (
            <li key={item.id}>
              <a
                href={`#${item.id}`}
                aria-current={isActive ? "location" : undefined}
                className={
                  isActive
                    ? `${linkBase} font-semibold text-slate-900`
                    : `${linkBase} text-forest/90`
                }
              >
                {item.label}
              </a>
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
