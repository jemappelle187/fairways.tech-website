import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About",
  description:
    "Learn about Fairways.Tech's mission to build compliance-first digital infrastructure for Africa's smallholder farmers.",
};

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-sand">
      <section className="relative overflow-hidden pt-28 pb-24">
        <div className="relative mx-auto max-w-4xl px-6 lg:px-8">
          <header className="mb-12">
            <p className="mb-3 text-xs font-semibold uppercase tracking-[0.28em] text-forest">
              About us
            </p>
            <h1 className="mb-6 text-3xl font-semibold text-slate-900 sm:text-4xl">
              About Fairways.Tech
            </h1>
          </header>

          <div className="space-y-8 text-base leading-relaxed text-slate-800">
            <div>
              <p className="mb-4">
                Fairways.Tech builds compliance-first digital infrastructure to unlock
                fair finance for Africa&apos;s smallholder farmers. We provide the
                identity, data, and liquidity rails that enable financial institutions,
                cooperatives, and market partners to serve rural communities at scale.
              </p>
              <p className="mb-4">
                Founded in 2025, Fairways.Tech operates with a dual presence in the
                Netherlands and Ghana. Our approach is grounded in regulatory compliance
                from day one, aligning with frameworks including AMLR (Anti-Money
                Laundering Regulation), FATF (Financial Action Task Force), DORA (Digital
                Operational Resilience Act), GDPR, and Bank of Ghana requirements.
              </p>
              <p>
                We believe that smallholder farmers deserve the same access to
                transparent, compliant financial services as any other business. By
                building trusted digital infrastructure, we help bridge the liquidity gap
                that prevents millions of farmers from scaling their operations and
                improving their livelihoods.
              </p>
            </div>

            <div className="mt-12 border-t border-slate-200 pt-8">
              <h2 className="mb-4 text-xl font-semibold text-slate-900">
                Who we work with
              </h2>
              <p className="mb-4">
                Fairways.Tech collaborates with a diverse ecosystem of partners:
              </p>
              <ul className="ml-6 list-disc space-y-2 text-slate-800">
                <li>
                  <strong>Banks and financial institutions:</strong> We provide
                  risk-visible, compliant rails for rural finance that meet regulatory
                  standards.
                </li>
                <li>
                  <strong>Cooperatives and farmer groups:</strong> We enable community
                  onboarding and structured workflows that help groups access finance
                  collectively.
                </li>
                <li>
                  <strong>Buyers and market partners:</strong> We facilitate transparent
                  sourcing and reliable volumes through traceable value chains.
                </li>
                <li>
                  <strong>Development partners:</strong> We deliver traceable impact data
                  and align with development goals for food security and inclusion.
                </li>
                <li>
                  <strong>Regulators:</strong> We support food security, financial
                  inclusion, and resilient agricultural systems through compliant
                  infrastructure.
                </li>
              </ul>
            </div>

            <div className="mt-12 border-t border-slate-200 pt-8">
              <h2 className="mb-4 text-xl font-semibold text-slate-900">
                Why we exist
              </h2>
              <p className="mb-4">
                Smallholder farmers face three critical barriers to accessing finance:
              </p>
              <ul className="ml-6 list-disc space-y-2 text-slate-800">
                <li>
                  <strong>The liquidity gap:</strong> Traditional financial institutions
                  struggle to assess risk and serve rural markets profitably, leaving
                  farmers without access to working capital.
                </li>
                <li>
                  <strong>Informal value chains:</strong> Without transparent,
                  traceable data on production, sales, and quality, farmers cannot prove
                  creditworthiness or negotiate fair prices.
                </li>
                <li>
                  <strong>Lack of trustable data:</strong> Financial institutions need
                  reliable, verifiable information to make lending decisions, but this
                  data is often fragmented or unavailable in rural contexts.
                </li>
              </ul>
              <p className="mt-4">
                Fairways.Tech addresses these challenges by building digital
                infrastructure that creates trust, enables compliance, and unlocks
                finance for smallholder farmers across Africa.
              </p>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}

