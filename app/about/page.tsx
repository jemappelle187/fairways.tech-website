import type { Metadata } from "next";
import Script from "next/script";
import { Header, Footer } from "../components/SiteChrome";

export const metadata: Metadata = {
  title: "About Fairways.Tech | Agricultural finance infrastructure & compliance-aligned rails",
  description:
    "Fairways.Tech is digital infrastructure for agricultural financing: verified farm data and compliance-aligned rails so banks and partners can serve smallholder farmers in Ghana, the Netherlands, and other emerging markets.",
  alternates: {
    canonical: "/about",
  },
  openGraph: {
    title: "About Fairways.Tech – Compliance-first rails for rural finance",
    description:
      "Fairways.Tech is digital infrastructure for agricultural financing: verified farm data and compliance-aligned rails so banks and partners can serve smallholder farmers in Ghana, the Netherlands, and other emerging markets.",
    url: "https://fairways.tech/about",
  },
};

const faqItems: { question: string; answer: string }[] = [
  {
    question: "What does Fairways.Tech do?",
    answer:
      "Fairways.Tech provides digital infrastructure for agricultural financing, helping partners engage smallholder agriculture through structured, verifiable records.",
  },
  {
    question: "How does Fairways.Tech help farmers?",
    answer:
      "Farmers can build verifiable participation histories that support inclusion in formal value chains and improve access to services through licensed partners.",
  },
  {
    question: "How does Fairways.Tech help banks?",
    answer:
      "Fairways.Tech helps banks participate in agricultural and rural markets through trusted infrastructure that supports their existing institutional standards.",
  },
  {
    question: "In which countries does Fairways.Tech operate?",
    answer:
      "Fairways.Tech is anchored by Fairways.Tech B.V. in the Netherlands and Fairways.Tech Ltd in Ghana, with operations concentrated in Ghana and West Africa.",
  },
  {
    question: "What problem does Fairways.Tech solve?",
    answer:
      "Fairways.Tech addresses the infrastructure gap between informal agricultural activity and formal finance by making participation and value-chain records visible in a format institutions can trust.",
  },
  {
    question: "How does Fairways.Tech collect farm data?",
    answer:
      "Fairways.Tech works with local partners to standardize and verify field and value-chain records, focusing on trusted documentation rather than proprietary methods.",
  },
  {
    question: "Who can use Fairways.Tech?",
    answer:
      "The ecosystem includes smallholder farmers and cooperatives, banks and lenders, buyers, development partners, and public actors needing trusted visibility into rural finance and value chains.",
  },
  {
    question: "Is Fairways.Tech a bank or a lending platform?",
    answer:
      "No. Fairways.Tech is not a bank, lender, or regulated deposit-taking institution. We provide infrastructure; regulated financial services are delivered by licensed partners.",
  },
  {
    question: "How is Fairways.Tech different from microfinance?",
    answer:
      "Microfinance institutions typically lend directly. Fairways.Tech provides shared infrastructure and trusted records that licensed actors can use within their own models.",
  },
  {
    question: "Is Fairways.Tech a regulated financial institution?",
    answer:
      "No. Fairways.Tech is an infrastructure provider. Regulated financial licences are held by the licensed institutions we work with.",
  },
  {
    question: "Which markets does Fairways.Tech focus on?",
    answer:
      "Fairways.Tech has a dual presence in the Netherlands and Ghana and focuses on horticulture and agriculture value chains in West Africa and other emerging markets where smallholder farmers are underserved.",
  },
  {
    question: "What type of data does the platform provide to institutions?",
    answer:
      "The platform provides structured, traceable participation and value-chain records for institutional review under each partner's own framework.",
  },
  {
    question: "How does Fairways.Tech support AML, CFT and sanctions compliance?",
    answer:
      "The infrastructure supports traceability, controls, and auditability so licensed partners can execute AML/CFT and sanctions obligations under their own mandates.",
  },
  {
    question: "Who typically partners with Fairways.Tech?",
    answer:
      "Partners include local and regional banks, cooperatives, buyers, development funds and regulators seeking transparent, compliant, data-rich rails for rural finance and horticulture in emerging markets.",
  },
];

const faqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: faqItems.map((item) => ({
    "@type": "Question",
    name: item.question,
    acceptedAnswer: {
      "@type": "Answer",
      text: item.answer,
    },
  })),
};

const aboutPageJsonLd = {
  "@context": "https://schema.org",
  "@type": "AboutPage",
  "@id": "https://fairways.tech/about#webpage",
  url: "https://fairways.tech/about",
  name: "About Fairways.Tech",
  description:
    "About Fairways.Tech: digital infrastructure for agricultural financing, connecting banks, cooperatives, and buyers to smallholder farmers through verified farm data and compliance-aligned rails in Ghana, the Netherlands, and emerging markets.",
  isPartOf: {
    "@type": "WebSite",
    url: "https://fairways.tech",
    name: "Fairways.Tech",
  },
  about: {
    "@id": "https://fairways.tech/#organization",
  },
  publisher: {
    "@id": "https://fairways.tech/#organization"
  },
};

const serviceJsonLd = {
  "@context": "https://schema.org",
  "@type": "Service",
  name: "Fairways.Tech platform",
  serviceType: "Digital infrastructure for agricultural finance",
  provider: {
    "@id": "https://fairways.tech/#organization",
  },
  description:
    "Compliance-aligned digital infrastructure that turns farm and value-chain activity into structured, finance-ready records for banks, cooperatives, and market partners serving smallholder farmers.",
  areaServed: [
    { "@type": "Country", "name": "Ghana" },
    { "@type": "Country", "name": "Netherlands" },
    { "@type": "Place", "name": "West Africa" }
  ],
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
      name: "About",
      item: "https://fairways.tech/about",
    },
  ],
};

export default function AboutPage() {
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
                About us
              </p>
              <h1 className="mb-6 text-4xl font-semibold tracking-tight text-stone sm:text-5xl lg:text-6xl">
                About Fairways.Tech
              </h1>
              <p className="mx-auto max-w-3xl text-lg leading-relaxed text-slate-700 sm:text-xl">
                Fairways.Tech is a compliance-aligned infrastructure organization for agricultural financing, with a dual presence in Ghana and the Netherlands.
              </p>
            </div>
          </div>
        </section>

        {/* Main Content */}
        <section className="relative z-0 bg-sand pb-24 pt-6 sm:pt-8">
          <div className="mx-auto max-w-5xl px-6 lg:px-8">
            {/* Overview Card */}
            <div className="mb-14 rounded-3xl border border-white/60 bg-white/80 p-8 shadow-[0_8px_32px_rgba(31,77,54,0.08)] backdrop-blur-sm sm:mb-16 sm:p-10 lg:p-12">
              <div className="space-y-6 text-base leading-relaxed text-slate-800 sm:text-lg">
                <p>
                  Fairways.Tech designs and operates secure, compliance‑aligned digital infrastructure for institutions, cooperatives, and market partners working in rural and agricultural economies.
                </p>
                <p>
                  Fairways.Tech B.V. (Netherlands) and Fairways.Tech Ltd (Ghana) together
                  anchor a dual presence between Europe and West Africa. From day one we build to regulatory standard, aligning with frameworks such as AMLR, FATF, DORA, GDPR and Bank of Ghana supervisory expectations.
                </p>
                <p>
                  Our role is ecosystem coordination as infrastructure between agricultural value chains and financial institutions, so licensed partners can expand participation with stronger transparency, accountability, and institutional confidence.
                </p>
              </div>
            </div>

            {/* Definitional clarity */}
            <div className="mb-14 rounded-3xl border border-white/60 bg-white/80 p-8 shadow-[0_8px_32px_rgba(31,77,54,0.08)] backdrop-blur-sm sm:mb-16 sm:p-10 lg:p-12">
              <h2 className="mb-4 text-2xl font-semibold tracking-tight text-stone sm:text-3xl">
                What is Fairways.Tech?
              </h2>
              <div className="space-y-4 text-base leading-relaxed text-slate-800 sm:text-lg">
                <p>
                  Fairways.Tech is a shared infrastructure layer for agricultural financing, connecting farm and value-chain participation to records institutions can rely on.
                </p>
                <p>
                  It is not a bank, lender, or marketplace, and it does not replace regulated decision-making. Licensed partners remain accountable for financial services and supervision; Fairways.Tech provides the underlying digital rails.
                </p>
              </div>

              <h2 className="mb-5 mt-12 text-2xl font-semibold tracking-tight text-stone sm:text-3xl">
                How Fairways.Tech works
              </h2>
              <div className="space-y-4 text-base leading-relaxed text-slate-800 sm:text-lg">
                <p>
                  Fairways.Tech standardizes and verifies participation records so institutions and value-chain actors can work from a common, trusted foundation.
                </p>
                <p>
                  The approach is principle-based: interoperability, traceability, and accountability. Partners then apply their own governance and compliance standards on top of that shared foundation.
                </p>
              </div>

              <h2 className="mb-5 mt-12 text-2xl font-semibold tracking-tight text-stone sm:text-3xl">
                Who uses Fairways.Tech?
              </h2>
              <div className="space-y-4 text-base leading-relaxed text-slate-800 sm:text-lg">
                <p>
                  <strong>Farmers and farmer groups</strong> participate through verifiable records that improve continuity in formal value chains.
                </p>
                <p>
                  <strong>Banks and financial institutions</strong> use the infrastructure to engage agricultural portfolios with clearer documentation and stronger control environments.
                </p>
                <p>
                  <strong>Buyers, cooperatives, development partners, and public actors</strong> use it to support transparent coordination across production, trade, and finance ecosystems.
                </p>
              </div>
            </div>

            {/* Why We Exist Card */}
            <div className="mb-14 rounded-3xl border border-white/60 bg-white/70 p-6 shadow-[0_6px_24px_rgba(31,77,54,0.06)] backdrop-blur-sm sm:mb-16 sm:p-8 lg:p-10">
              <h2 className="mb-6 text-2xl font-semibold tracking-tight text-stone sm:text-3xl">
                Why we exist
              </h2>
              <p className="mb-6 text-base leading-relaxed text-slate-800 sm:text-lg">
                Rural agricultural finance remains constrained by structural barriers:
              </p>
              <ul className="ml-5 list-disc space-y-3 text-base leading-relaxed text-slate-800 marker:text-forest sm:text-lg">
                <li>
                  <strong className="text-stone">The liquidity gap:</strong> Institutions
                  often face high cost-to-serve and limited visibility in rural portfolios.
                </li>
                <li>
                  <strong className="text-stone">Informal value chains:</strong> Fragmented
                  records make it difficult to link production, trade, and finance in a
                  trusted way.
                </li>
                <li>
                  <strong className="text-stone">Lack of trustable data:</strong>{" "}
                  Decision-makers require reliable documentation, yet rural data is
                  frequently informal or inconsistent.
                </li>
              </ul>
              <p className="mt-6 text-base leading-relaxed text-slate-800 sm:text-lg">
                Fairways.Tech exists to close this infrastructure gap between informal activity and formal institutional requirements.
              </p>
            </div>

            {/* FAQ Section */}
            <div className="rounded-3xl border border-white/60 bg-white/80 p-8 shadow-[0_8px_32px_rgba(31,77,54,0.08)] backdrop-blur-sm sm:p-10 lg:p-12">
              <h2 className="mb-8 text-2xl font-semibold tracking-tight text-stone sm:text-3xl">FAQ</h2>
              <dl className="space-y-6">
                {faqItems.map((item) => (
                  <div
                    key={item.question}
                    className="rounded-2xl border border-slate-200/35 bg-white/70 p-5 shadow-[0_2px_12px_rgba(15,23,42,0.04)] transition-all hover:border-forest/20"
                  >
                    <dt className="mb-3 text-lg font-semibold text-stone">
                      {item.question}
                    </dt>
                    <dd className="text-base leading-relaxed text-slate-700">
                      {item.answer}
                    </dd>
                  </div>
                ))}
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
      <Script
        id="about-page-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(aboutPageJsonLd) }}
      />
      <Script
        id="about-service-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceJsonLd) }}
      />
      <Script
        id="about-breadcrumb-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
      <Footer />
    </>
  );
}
