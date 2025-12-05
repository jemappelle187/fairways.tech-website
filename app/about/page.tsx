import type { Metadata } from "next";
import Script from "next/script";
import { Header, Footer } from "../components/SiteChrome";

export const metadata: Metadata = {
  title: "About Fairways.Tech – Compliance-first rails for rural finance",
  description:
    "Learn how Fairways.Tech builds compliance-first digital infrastructure that connects banks, cooperatives and buyers to Africa's smallholder farmers.",
  openGraph: {
    title: "About Fairways.Tech – Compliance-first rails for rural finance",
    description:
      "Learn how Fairways.Tech builds compliance-first digital infrastructure that connects banks, cooperatives and buyers to Africa's smallholder farmers.",
    url: "https://fairways.tech/about",
  },
};

export default function AboutPage() {
  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      {
        "@type": "Question",
        name: "Is Fairways.Tech a regulated financial institution?",
        acceptedAnswer: {
          "@type": "Answer",
          text:
            "Fairways.Tech provides digital infrastructure and works with licensed banks, payment institutions and EMIs. Licences are held by our partners; our platform is built to meet AML/CFT, KYC, Wwft, FATF, DORA, GDPR and Bank of Ghana supervisory expectations.",
        },
      },
      {
        "@type": "Question",
        name: "Which markets does Fairways.Tech focus on?",
        acceptedAnswer: {
          "@type": "Answer",
          text:
            "Fairways.Tech has a dual presence in the Netherlands and Ghana and focuses on horticulture and agriculture value chains in West Africa and other emerging markets where smallholder farmers are underserved.",
        },
      },
      {
        "@type": "Question",
        name: "What type of data does the platform provide to institutions?",
        acceptedAnswer: {
          "@type": "Answer",
          text:
            "The platform provides season and crop information, transaction and repayment flows, agent-verified onboarding and farm-level production signals so institutions can assess risk and performance without exposing proprietary scoring models.",
        },
      },
      {
        "@type": "Question",
        name: "How does Fairways.Tech support AML, CFT and sanctions compliance?",
        acceptedAnswer: {
          "@type": "Answer",
          text:
            "Fairways.Tech designs processes, data flows and controls aligned with AMLR, FATF, Wwft and local AML laws, providing traceable rails and audit-ready data so licensed partners can meet AML/CFT and sanctions obligations.",
        },
      },
      {
        "@type": "Question",
        name: "Who typically partners with Fairways.Tech?",
        acceptedAnswer: {
          "@type": "Answer",
          text:
            "Partners include local and regional banks, cooperatives, buyers, development funds and regulators seeking transparent, compliant, data-rich rails for rural finance and horticulture in emerging markets.",
        },
      },
    ],
  };

  return (
    <>
      <Header />
      <main id="main-content" className="min-h-screen bg-gradient-to-b from-sand via-sand to-sand-muted">
        {/* Hero Section */}
        <section className="relative overflow-hidden pt-32 pb-16 sm:pt-40 sm:pb-24">
          <div className="absolute inset-0 bg-gradient-to-br from-forest/5 via-transparent to-leaf/5" />
          <div className="relative mx-auto max-w-5xl px-6 lg:px-8">
            <div className="text-center">
              <p className="mb-4 text-xs font-semibold uppercase tracking-[0.28em] text-forest">
                About us
              </p>
              <h1 className="mb-6 text-4xl font-semibold tracking-tight text-stone sm:text-5xl lg:text-6xl">
                About Fairways.Tech
              </h1>
              <p className="mx-auto max-w-3xl text-lg leading-relaxed text-slate-700 sm:text-xl">
                Building compliance-first digital infrastructure that connects banks, cooperatives and buyers to Africa&apos;s smallholder farmers.
              </p>
            </div>
          </div>
        </section>

        {/* Main Content */}
        <section className="relative pb-24">
          <div className="mx-auto max-w-5xl px-6 lg:px-8">
            {/* Overview Card */}
            <div className="mb-12 rounded-3xl border border-white/60 bg-white/80 p-8 shadow-[0_8px_32px_rgba(31,77,54,0.08)] backdrop-blur-sm sm:p-10 lg:p-12">
              <div className="space-y-6 text-base leading-relaxed text-slate-800 sm:text-lg">
                <p>
                  Fairways.Tech designs and operates secure, compliance‑aligned digital infrastructure that enables financial institutions, cooperatives and market partners to serve Africa&apos;s rural communities with confidence — without exposing proprietary models or sensitive operational details.
                </p>
                <p>
                  Fairways.Tech B.V. (Netherlands) and Fairways.Tech Ltd (Ghana) together
                  anchor a dual presence between Europe and West Africa. From day one we build to regulatory standard, aligning with frameworks such as AMLR, FATF, DORA, GDPR and Bank of Ghana supervisory expectations — ensuring institutional‑grade governance without disclosing internal methodologies.
                </p>
                <p>
                  We believe that smallholder farmers should have access to transparent,
                  compliant financial services on the same terms as any other business. By
                  creating trusted digital infrastructure, we help close the liquidity gap
                  that prevents millions of farmers from investing, growing and improving
                  their livelihoods.
                </p>
              </div>
            </div>

            {/* Why We Exist Card */}
            <div className="mb-12 rounded-3xl border border-white/60 bg-gradient-to-br from-white/90 to-sand/50 p-8 shadow-[0_8px_32px_rgba(31,77,54,0.08)] backdrop-blur-sm sm:p-10 lg:p-12">
              <h2 className="mb-6 text-2xl font-semibold tracking-tight text-stone sm:text-3xl">
                Why we exist
              </h2>
              <p className="mb-6 text-base leading-relaxed text-slate-800 sm:text-lg">
                Smallholder farmers face three critical barriers to accessing finance:
              </p>
              <div className="space-y-4">
                <div className="rounded-2xl border-l-4 border-forest bg-white/60 p-5 backdrop-blur-sm">
                  <h3 className="mb-2 text-lg font-semibold text-forest">
                    The liquidity gap
                  </h3>
                  <p className="text-slate-800">
                    Traditional financial institutions
                    struggle to assess risk and serve rural markets profitably, leaving
                    farmers without access to working capital.
                  </p>
                </div>
                <div className="rounded-2xl border-l-4 border-leaf bg-white/60 p-5 backdrop-blur-sm">
                  <h3 className="mb-2 text-lg font-semibold text-leaf">
                    Informal value chains
                  </h3>
                  <p className="text-slate-800">
                    Without transparent,
                    traceable data on production, sales, and quality, farmers cannot prove
                    creditworthiness or negotiate fair prices.
                  </p>
                </div>
                <div className="rounded-2xl border-l-4 border-forest bg-white/60 p-5 backdrop-blur-sm">
                  <h3 className="mb-2 text-lg font-semibold text-forest">
                    Lack of trustable data
                  </h3>
                  <p className="text-slate-800">
                    Financial institutions need
                    reliable, verifiable information to make lending decisions, but this
                    data is often fragmented or unavailable in rural contexts.
                  </p>
                </div>
              </div>
              <p className="mt-6 text-base leading-relaxed text-slate-800 sm:text-lg">
                Fairways.Tech addresses these challenges by providing digital infrastructure that helps make rural production and financial activity visible in ways that banks and regulators can rely on — enabling compliant capital to flow to smallholder farmers without revealing sensitive internal processes.
              </p>
            </div>

            {/* FAQ Section */}
            <div className="rounded-3xl border border-white/60 bg-white/80 p-8 shadow-[0_8px_32px_rgba(31,77,54,0.08)] backdrop-blur-sm sm:p-10 lg:p-12">
              <h2 className="mb-8 text-2xl font-semibold tracking-tight text-stone sm:text-3xl">
                Questions from partners &amp; regulators
              </h2>
              <dl className="space-y-6">
                <div className="rounded-2xl border border-slate-200/60 bg-gradient-to-br from-white to-sand/30 p-6 transition-all hover:border-forest/30 hover:shadow-md">
                  <dt className="mb-3 text-lg font-semibold text-stone">
                    Is Fairways.Tech a regulated financial institution?
                  </dt>
                  <dd className="text-base leading-relaxed text-slate-700">
                    Fairways.Tech designs and operates digital infrastructure and works with
                    licensed banks, payment institutions and EMIs. Regulatory licences are
                    held by our partners; our platform is built to meet AML/CFT, KYC, Wwft,
                    FATF, DORA, GDPR and Bank of Ghana supervisory expectations.
                  </dd>
                </div>
                <div className="rounded-2xl border border-slate-200/60 bg-gradient-to-br from-white to-sand/30 p-6 transition-all hover:border-forest/30 hover:shadow-md">
                  <dt className="mb-3 text-lg font-semibold text-stone">
                    Which markets does Fairways.Tech focus on?
                  </dt>
                  <dd className="text-base leading-relaxed text-slate-700">
                    We have a dual presence in the Netherlands and Ghana, with an initial
                    focus on horticulture and agriculture value chains in West Africa and
                    other emerging markets where smallholder farmers are underserved by
                    traditional finance.
                  </dd>
                </div>
                <div className="rounded-2xl border border-slate-200/60 bg-gradient-to-br from-white to-sand/30 p-6 transition-all hover:border-forest/30 hover:shadow-md">
                  <dt className="mb-3 text-lg font-semibold text-stone">
                    What type of data does the platform provide to institutions?
                  </dt>
                  <dd className="text-base leading-relaxed text-slate-700">
                    Our rails capture season and crop information, transaction and
                    repayment flows, agent-verified onboarding data and farm-level
                    production signals, so institutions can assess risk and performance
                    without us disclosing proprietary scoring models or sensitive internal
                    methodologies.
                  </dd>
                </div>
                <div className="rounded-2xl border border-slate-200/60 bg-gradient-to-br from-white to-sand/30 p-6 transition-all hover:border-forest/30 hover:shadow-md">
                  <dt className="mb-3 text-lg font-semibold text-stone">
                    How does Fairways.Tech support AML, CFT and sanctions compliance?
                  </dt>
                  <dd className="text-base leading-relaxed text-slate-700">
                    We design processes, data flows and controls to align with AMLR, FATF
                    standards, Wwft and local AML laws. Our partners remain the licensed
                    entities; we provide traceable rails, shared-responsibility workflows
                    and audit-ready data to help them fulfil their obligations, including
                    sanctions screening and transaction monitoring.
                  </dd>
                </div>
                <div className="rounded-2xl border border-slate-200/60 bg-gradient-to-br from-white to-sand/30 p-6 transition-all hover:border-forest/30 hover:shadow-md">
                  <dt className="mb-3 text-lg font-semibold text-stone">
                    Who typically partners with Fairways.Tech?
                  </dt>
                  <dd className="text-base leading-relaxed text-slate-700">
                    Our ecosystem includes local and regional banks, cooperatives and
                    buyers, development partners and regulators seeking transparent,
                    compliant, data-rich rails for rural finance and horticulture in
                    emerging markets.
                  </dd>
                </div>
              </dl>
            </div>
          </div>
        </section>
      </main>
      <Script
        id="about-faq-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />
      <Footer />
    </>
  );
}
