import type { ReactNode } from "react";
import { TableOfContents } from "./TableOfContents";

export type LegalPageTemplateProps = {
  kicker?: string;
  title: string;
  lastUpdated: string;
  intro?: string;
  showToc?: boolean;
  tocItems?: { id: string; label: string }[];
  children: ReactNode;
};

const linkClass =
  "text-forest underline underline-offset-2 transition-opacity hover:opacity-80 focus:outline-none focus:ring-2 focus:ring-forest focus:ring-offset-2 rounded";

export { linkClass as legalPageLinkClass };

export function LegalPageTemplate({
  kicker = "Legal",
  title,
  lastUpdated,
  intro,
  showToc,
  tocItems = [],
  children,
}: LegalPageTemplateProps) {
  const hasToc = Boolean(showToc && tocItems.length > 0);

  const header = (
    <header className="max-w-3xl border-b border-stone-200/90 pb-8 pt-10 sm:pt-12">
      <p className="text-xs font-semibold uppercase tracking-wider text-slate-500">
        {kicker}
      </p>
      <h1 className="mt-2 text-3xl font-semibold tracking-tight text-stone sm:text-4xl">
        {title}
      </h1>
      <p className="mt-2 text-sm text-slate-600">Last updated: {lastUpdated}</p>
      {intro ? (
        <p className="mt-4 text-sm sm:text-base leading-relaxed text-slate-800">
          {intro}
        </p>
      ) : null}
    </header>
  );

  return (
    <main id="main-content" className="min-h-screen bg-sand">
      <div className="mx-auto w-full max-w-6xl px-4 sm:px-6 lg:px-8">
        {hasToc ? (
          <div className="lg:grid lg:grid-cols-[12rem_1fr] lg:gap-10 lg:items-start">
            <aside className="hidden pt-10 lg:sticky lg:top-24 lg:-ml-0 lg:block lg:pt-12">
              <TableOfContents items={tocItems} />
            </aside>
            <div>
              {header}
              <article
                className="legal-doc mx-auto max-w-3xl pb-16 pt-8 sm:pt-10"
                lang="en"
              >
                {children}
              </article>
            </div>
          </div>
        ) : (
          <>
            <div className="mx-auto max-w-3xl">{header}</div>
            <article
              className="legal-doc mx-auto max-w-3xl px-0 pb-16 pt-8 sm:pt-10"
              lang="en"
            >
              {children}
            </article>
          </>
        )}
      </div>
    </main>
  );
}
