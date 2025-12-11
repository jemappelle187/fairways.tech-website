import type { Metadata } from "next";
import { Header, Footer } from "../components/SiteChrome";

export const metadata: Metadata = {
  title: "Impact & Vision",
  description:
    "Learn about Fairways.Tech's impact on farmers, institutions, and food systems across Africa.",
  openGraph: {
    title: "Impact & Vision | Fairways.Tech",
    description:
      "Learn about Fairways.Tech's impact on farmers, institutions, and food systems across Africa.",
    url: "https://fairways.tech/impact",
  },
};

export default function ImpactPage() {
  return (
    <>
      <Header />
      <main id="main-content" className="min-h-screen bg-gradient-to-b from-sand via-sand to-sand-muted">
        {/* Hero Section */}
        <section className="relative overflow-hidden bg-sand pt-32 pb-16 sm:pt-40 sm:pb-24">
          <div className="absolute inset-0 bg-gradient-to-br from-forest/3 via-transparent to-leaf/3" />
          <div className="relative z-10 mx-auto max-w-5xl px-6 lg:px-8">
            <div className="text-center">
              <p className="mb-4 text-xs font-semibold uppercase tracking-[0.28em] text-forest">
                Our impact
              </p>
              <h1 className="mb-6 text-4xl font-semibold tracking-tight text-stone sm:text-5xl lg:text-6xl">
                Impact & Vision
              </h1>
              <p className="mx-auto max-w-3xl text-lg leading-relaxed text-slate-700 sm:text-xl">
                Learn about Fairways.Tech&apos;s impact on farmers, institutions, and food systems across Africa.
              </p>
            </div>
          </div>
        </section>

        {/* Main Content */}
        <section className="relative z-0 bg-sand pb-24">
          <div className="mx-auto max-w-5xl px-6 lg:px-8">
            {/* For Farmers Card */}
            <div className="relative mb-12 overflow-hidden rounded-3xl border border-white/60 bg-sand/30 p-8 shadow-[0_8px_32px_rgba(31,77,54,0.08)] backdrop-blur-sm sm:p-10 lg:p-12">
              {/* Background Image */}
              <div 
                className="pointer-events-none absolute inset-0 bg-cover bg-center opacity-50"
                style={{ backgroundImage: "url('/farmer_woman.jpg')" }}
              />
              {/* Overlay for better text readability */}
              <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-white/70 via-white/60 to-white/50" />
              
              {/* Content */}
              <div className="relative z-10">
                <h2 className="mb-6 text-2xl font-semibold tracking-tight text-stone sm:text-3xl">
                  For Farmers
                </h2>
                <div className="space-y-4 text-base leading-relaxed text-slate-800 sm:text-lg">
                  <p>
                    Fairways.Tech strengthens smallholder farmers&apos; ability to operate with stability, predictability, and commercial dignity. Through trusted digital identity and verifiable production records, farmers obtain timely working capital, plan for seasonal cash-flow, and participate in value chains on transparent and equitable terms.
                  </p>
                  <p>
                    By enabling farmers to build a financial track record and integrate into compliant value‑chain rails, we reduce vulnerability to price shocks, improve income stability, and expand opportunities for growth. This forms the foundation for scalable rural finance and durable livelihood improvement.
                  </p>
                </div>
              </div>
            </div>

            {/* For Institutions Card */}
            <div className="relative mb-12 overflow-hidden rounded-3xl border border-white/60 bg-sand/30 p-8 shadow-[0_8px_32px_rgba(31,77,54,0.08)] backdrop-blur-sm sm:p-10 lg:p-12">
              {/* Background Image */}
              <div 
                className="pointer-events-none absolute inset-0 bg-cover bg-center opacity-50"
                style={{ backgroundImage: "url('/regulations_compliance.jpg')" }}
              />
              {/* Overlay for better text readability */}
              <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-white/70 via-white/60 to-white/50" />
              
              {/* Content */}
              <div className="relative z-10">
                <h2 className="mb-6 text-2xl font-semibold tracking-tight text-stone sm:text-3xl">
                  For Institutions
                </h2>
                <div className="space-y-4 text-base leading-relaxed text-slate-800 sm:text-lg">
                  <p>
                    Financial institutions, cooperatives, buyers, and development partners gain access to compliant, audit‑ready data flows and verifiable identity rails. Fairways.Tech reduces the operational friction of serving rural markets by providing structured, regulator‑aligned workflows for onboarding, monitoring, and risk assessment.
                  </p>
                  <p>
                    Our infrastructure delivers field‑level data integrity, production, transactions, repayment signals, allowing institutions to deploy capital with confidence, meet AML/CFT and supervisory expectations, and expand their rural footprint sustainably. The result is a lower cost‑to‑serve model and the ability to scale compliant finance at meaningful depth.
                  </p>
                </div>
              </div>
            </div>

            {/* For Food Systems Card */}
            <div className="relative mb-12 overflow-hidden rounded-3xl border border-white/60 bg-sand/30 p-8 shadow-[0_8px_32px_rgba(31,77,54,0.08)] backdrop-blur-sm sm:p-10 lg:p-12">
              {/* Background Image */}
              <div 
                className="pointer-events-none absolute inset-0 bg-cover bg-center opacity-50"
                style={{ backgroundImage: "url('/vegetables_boxes.jpg')" }}
              />
              {/* Overlay for better text readability */}
              <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-white/70 via-white/60 to-white/50" />
              
              {/* Content */}
              <div className="relative z-10">
                <h2 className="mb-6 text-2xl font-semibold tracking-tight text-stone sm:text-3xl">
                  For Food Systems
                </h2>
                <div className="space-y-4 text-base leading-relaxed text-slate-800 sm:text-lg">
                  <p>
                    Fairways.Tech contributes to resilient food systems by transforming fragmented, informal production environments into transparent, data‑driven supply networks. Predictable supply, authenticated origin data, and aligned financing enable buyers to source reliably and reduce operational uncertainty.
                  </p>
                  <p>
                    With traceability from farm to market and improved post‑harvest coordination, our infrastructure reduces waste, strengthens food safety compliance, and supports climate‑resilient value chains. Trusted data links farmers, markets, and finance in a way that promotes system‑wide efficiency and long‑term stability.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
