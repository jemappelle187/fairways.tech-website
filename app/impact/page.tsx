import type { Metadata } from "next";
import { Header, Footer } from "../components/SiteChrome";

export const metadata: Metadata = {
  title: "Impact & Vision",
  description:
    "Learn about Fairways.Tech's impact on farmers, institutions, and food systems across Africa.",
};

export default function ImpactPage() {
  return (
    <>
      <Header />
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
                Fairways.Tech strengthens smallholder farmers’ ability to operate with stability, predictability, and commercial dignity. Through trusted digital identity and verifiable production records, farmers obtain timely working capital, plan for seasonal cash-flow, and participate in value chains on transparent and equitable terms.
              </p>
              <p>
                By enabling farmers to build a financial track record and integrate into compliant value‑chain rails, we reduce vulnerability to price shocks, improve income stability, and expand opportunities for growth. This forms the foundation for scalable rural finance and durable livelihood improvement.
              </p>
            </div>

            <div className="border-t border-slate-200 pt-8">
              <h2 className="mb-4 text-2xl font-semibold text-slate-900">
                For Institutions
              </h2>
              <p className="mb-4">
                Financial institutions, cooperatives, buyers, and development partners gain access to compliant, audit‑ready data flows and verifiable identity rails. Fairways.Tech reduces the operational friction of serving rural markets by providing structured, regulator‑aligned workflows for onboarding, monitoring, and risk assessment.
              </p>
              <p>
                Our infrastructure delivers field‑level data integrity—production, transactions, repayment signals—allowing institutions to deploy capital with confidence, meet AML/CFT and supervisory expectations, and expand their rural footprint sustainably. The result is a lower cost‑to‑serve model and the ability to scale compliant finance at meaningful depth.
              </p>
            </div>

            <div className="border-t border-slate-200 pt-8">
              <h2 className="mb-4 text-2xl font-semibold text-slate-900">
                For Food Systems
              </h2>
              <p className="mb-4">
                Fairways.Tech contributes to resilient food systems by transforming fragmented, informal production environments into transparent, data‑driven supply networks. Predictable supply, authenticated origin data, and aligned financing enable buyers to source reliably and reduce operational uncertainty.
              </p>
              <p>
                With traceability from farm to market and improved post‑harvest coordination, our infrastructure reduces waste, strengthens food safety compliance, and supports climate‑resilient value chains. Trusted data links farmers, markets, and finance in a way that promotes system‑wide efficiency and long‑term stability.
              </p>
            </div>
          </div>
        </div>
      </section>
      </main>
      <Footer />
    </>
  );
}
