import type { Metadata } from "next";
import Script from "next/script";
import { Header, Footer } from "../components/SiteChrome";
import { buildPageMetadata } from "../../lib/seo";

export const metadata: Metadata = buildPageMetadata({
  title: "Impact | Smallholder finance and rural economic development",
  description:
    "How Fairways.Tech improves agricultural financing for smallholder farmers and institutions: verified farm data, lower perceived risk for banks, and stronger local economies in Ghana and other emerging markets.",
  path: "/impact",
  ogTitle: "Impact & Vision | Fairways.Tech",
});

const impactWebPageJsonLd = {
  "@context": "https://schema.org",
  "@type": "WebPage",
  "@id": "https://fairways.tech/impact#webpage",
  url: "https://fairways.tech/impact",
  name: "Impact & Vision",
  description:
    "How Fairways.Tech improves agricultural financing for smallholder farmers and institutions: verified farm data, lower perceived risk for banks, and stronger local economies in Ghana and other emerging markets.",
  isPartOf: {
    "@type": "WebSite",
    url: "https://fairways.tech",
    name: "Fairways.Tech",
  },
  about: {
    "@id": "https://fairways.tech/#organization",
  },
};

const breadcrumbJsonLd = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    {
      "@type": "ListItem",
      position: 1,
      name: "Home",
      item: "https://fairways.tech/",
    },
    {
      "@type": "ListItem",
      position: 2,
      name: "Impact",
      item: "https://fairways.tech/impact",
    },
  ],
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
                Fairways.Tech is an impact-driven digital infrastructure for agricultural financing. We measure progress by better access to finance for smallholder farmers, fairer markets, and less food loss. Supported by verified farm data and compliance-aligned rails regardless of where we operate.
              </p>
            </div>
          </div>
        </section>

        {/* Main Content */}
        <section className="relative z-0 bg-sand pb-24">
          <div className="mx-auto max-w-5xl px-6 lg:px-8">
            {/* Short context for impact sections */}
            <div className="group relative mb-12 overflow-hidden rounded-3xl border border-white/60 bg-white/85 p-8 shadow-[0_8px_32px_rgba(31,77,54,0.08)] backdrop-blur-sm transition-all duration-300 hover:-translate-y-1 hover:border-white/75 hover:shadow-[0_14px_36px_rgba(31,77,54,0.12)] sm:p-10 lg:p-12">
              {/* Background Image */}
              <div
                className="pointer-events-none absolute inset-0 bg-cover bg-center opacity-80 transition-transform duration-500 ease-out group-hover:scale-105"
                style={{ backgroundImage: "url('/images/impact-context-card.png')" }}
              />
              {/* Dark overlay for text contrast (aligned with home reach cards) */}
              <div
                className="pointer-events-none absolute inset-0 z-[1] rounded-3xl"
                style={{
                  background:
                    "linear-gradient(rgba(0,0,0,0.55), rgba(0,0,0,0.55))",
                }}
                aria-hidden="true"
              />
              <div className="relative z-10 text-center">
                <h2 className="mb-6 text-2xl font-semibold tracking-tight text-white drop-shadow-sm sm:text-3xl">
                  Why reliable agricultural finance matters
                </h2>
                <div className="space-y-4 text-base leading-relaxed text-white/95 drop-shadow-sm sm:text-lg">
                  <p>
                    Agricultural finance is foundational to rural prosperity: when farmers and value-chain actors can participate in formal finance, productivity, market continuity, and household stability all improve.
                  </p>
                  <p>
                    Trusted infrastructure and verifiable records help institutions, buyers, and public stakeholders participate with greater confidence, enabling broader and more sustainable engagement in agricultural markets.
                  </p>
                  <p>
                    The impact is systemic: stronger access to finance for farmers, more reliable market participation, and deeper resilience for local economies over the long term.
                  </p>
                </div>
              </div>
            </div>

            {/* For Farmers Card */}
            <div className="group relative mb-12 overflow-hidden rounded-3xl border border-white/60 bg-sand/30 p-8 shadow-[0_8px_32px_rgba(31,77,54,0.08)] backdrop-blur-sm transition-all duration-300 hover:-translate-y-1 hover:border-white/75 hover:shadow-[0_14px_36px_rgba(31,77,54,0.12)] sm:p-10 lg:p-12">
              {/* Background Image */}
              <div 
                className="pointer-events-none absolute inset-0 bg-cover bg-center opacity-85 transition-transform duration-500 ease-out group-hover:scale-105"
                style={{ backgroundImage: "url('/images/impact-farmers.png')" }}
              />
              {/* Dark overlay for text contrast (aligned with home reach cards) */}
              <div
                className="pointer-events-none absolute inset-0 z-[1] rounded-3xl"
                style={{
                  background:
                    "linear-gradient(rgba(0,0,0,0.55), rgba(0,0,0,0.55))",
                }}
                aria-hidden="true"
              />

              {/* Content */}
              <div className="relative z-10 text-center">
                <h2 className="mb-6 text-2xl font-semibold tracking-tight text-white drop-shadow-sm sm:text-3xl">
                  For Farmers
                </h2>
                <div className="space-y-4 text-base leading-relaxed text-white/95 drop-shadow-sm sm:text-lg">
                  <p>
                    Fairways.Tech supports smallholder farmers in building more stable and predictable livelihoods. With stronger participation records and trusted market linkages, farmers are better positioned to access finance, plan across seasons, and operate with greater confidence.
                  </p>
                  <p>
                    The long-term outcome is greater resilience: improved income stability, broader access to formal markets, and stronger capacity to absorb shocks while continuing to grow.
                  </p>
                  <p className="mt-4">
                    Over time, this contributes to rural development by helping farming households and producer groups strengthen continuity, expand opportunity, and participate in value chains on fairer terms.
                  </p>
                </div>
              </div>
            </div>

            {/* For Institutions Card */}
            <div className="group relative mb-12 overflow-hidden rounded-3xl border border-white/60 bg-sand/30 p-8 shadow-[0_8px_32px_rgba(31,77,54,0.08)] backdrop-blur-sm transition-all duration-300 hover:-translate-y-1 hover:border-white/75 hover:shadow-[0_14px_36px_rgba(31,77,54,0.12)] sm:p-10 lg:p-12">
              {/* Background Image */}
              <div 
                className="pointer-events-none absolute inset-0 bg-cover bg-center opacity-85 transition-transform duration-500 ease-out group-hover:scale-105"
                style={{ backgroundImage: "url('/images/impact-institutions.png')" }}
              />
              {/* Dark overlay for text contrast (aligned with home reach cards) */}
              <div
                className="pointer-events-none absolute inset-0 z-[1] rounded-3xl"
                style={{
                  background:
                    "linear-gradient(rgba(0,0,0,0.55), rgba(0,0,0,0.55))",
                }}
                aria-hidden="true"
              />

              {/* Content */}
              <div className="relative z-10 text-center">
                <h2 className="mb-6 text-2xl font-semibold tracking-tight text-white drop-shadow-sm sm:text-3xl">
                  For Institutions
                </h2>
                <div className="space-y-4 text-base leading-relaxed text-white/95 drop-shadow-sm sm:text-lg">
                  <p>
                    Financial institutions, cooperatives, buyers, and development partners gain clearer visibility into agricultural participation and portfolio context. This improves transparency and supports more informed engagement in rural markets.
                  </p>
                  <p>
                    With stronger risk visibility and compliance-aligned participation, institutions can reduce uncertainty, lower the cost to serve rural segments, and expand agricultural finance more sustainably over time.
                  </p>
                </div>
              </div>
            </div>

            {/* For Food Systems Card */}
            <div className="group relative mb-12 overflow-hidden rounded-3xl border border-white/60 bg-sand/30 p-8 shadow-[0_8px_32px_rgba(31,77,54,0.08)] backdrop-blur-sm transition-all duration-300 hover:-translate-y-1 hover:border-white/75 hover:shadow-[0_14px_36px_rgba(31,77,54,0.12)] sm:p-10 lg:p-12">
              {/* Background Image */}
              <div 
                className="pointer-events-none absolute inset-0 bg-cover bg-center opacity-85 transition-transform duration-500 ease-out group-hover:scale-105"
                style={{ backgroundImage: "url('/images/impact-food-systems.png')" }}
              />
              {/* Dark overlay for text contrast (aligned with home reach cards) */}
              <div
                className="pointer-events-none absolute inset-0 z-[1] rounded-3xl"
                style={{
                  background:
                    "linear-gradient(rgba(0,0,0,0.55), rgba(0,0,0,0.55))",
                }}
                aria-hidden="true"
              />

              {/* Content */}
              <div className="relative z-10 text-center">
                <h2 className="mb-6 text-2xl font-semibold tracking-tight text-white drop-shadow-sm sm:text-3xl">
                  For Food Systems
                </h2>
                <div className="space-y-4 text-base leading-relaxed text-white/95 drop-shadow-sm sm:text-lg">
                  <p>
                    Fairways.Tech contributes to more stable food systems by strengthening continuity between production, trade, and finance. Better traceability and clearer origin records support consistent sourcing and stronger supply chain reliability.
                  </p>
                  <p>
                    Over time, this helps reduce waste, reinforce food safety, and improve resilience across the chain from farm to market. The broader effect is a more durable food system with stronger long-term development potential.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Script
        id="impact-webpage-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(impactWebPageJsonLd) }}
      />
      <Script
        id="impact-breadcrumb-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
      <Footer />
    </>
  );
}
