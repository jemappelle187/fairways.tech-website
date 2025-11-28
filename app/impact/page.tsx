import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Impact & Vision",
  description:
    "Learn about Fairways.Tech's impact on farmers, institutions, and food systems across Africa.",
};

export default function ImpactPage() {
  return (
    <main className="min-h-screen bg-sand">
      <section className="relative overflow-hidden pt-28 pb-24">
        <div className="relative mx-auto max-w-4xl px-6 lg:px-8">
          <header className="mb-12">
            <p className="mb-3 text-xs font-semibold uppercase tracking-[0.28em] text-forest">
              Our impact
            </p>
            <h1 className="mb-6 text-3xl font-semibold text-slate-900 sm:text-4xl">
              Impact & Vision
            </h1>
          </header>

          <div className="space-y-12 text-base leading-relaxed text-slate-800">
            <div>
              <h2 className="mb-4 text-2xl font-semibold text-slate-900">
                For Farmers
              </h2>
              <p className="mb-4">
                Fairways.Tech empowers smallholder farmers with better liquidity,
                planning capabilities, and negotiation power. By providing digital
                identity and verifiable production data, farmers can access working
                capital when they need it, plan for seasonal cycles, and negotiate fair
                prices with buyers.
              </p>
              <p>
                Our infrastructure enables farmers to build credit histories, access
                structured finance, and participate in transparent value chains that
                reward quality and reliability. This translates to improved livelihoods,
                reduced vulnerability to price shocks, and greater agency in their
                economic relationships.
              </p>
            </div>

            <div className="border-t border-slate-200 pt-8">
              <h2 className="mb-4 text-2xl font-semibold text-slate-900">
                For Institutions
              </h2>
              <p className="mb-4">
                Financial institutions, cooperatives, and market partners gain risk
                visibility, compliant rails, and reliable data through Fairways.Tech.
                Our infrastructure enables banks to serve rural markets profitably while
                meeting regulatory requirements, reducing the cost and complexity of
                rural finance.
              </p>
              <p>
                By providing verifiable identity, production data, and transaction
                history, we help institutions make informed lending decisions, manage
                risk effectively, and scale their rural finance operations. This creates
                new market opportunities while supporting financial inclusion and food
                security goals.
              </p>
            </div>

            <div className="border-t border-slate-200 pt-8">
              <h2 className="mb-4 text-2xl font-semibold text-slate-900">
                For Food Systems
              </h2>
              <p className="mb-4">
                Fairways.Tech contributes to more resilient, efficient food systems by
                reducing waste, enabling predictable supply, and supporting sustainable
                agricultural practices. Transparent value chains help buyers source
                reliably, while farmers can plan production and access finance aligned
                with market demand.
              </p>
              <p>
                Our infrastructure supports traceability from farm to market, enabling
                quality assurance, food safety compliance, and reduced post-harvest
                losses. By connecting farmers to finance and markets through trusted
                data, we help build food systems that are more inclusive, efficient, and
                resilient to climate and economic shocks.
              </p>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}

