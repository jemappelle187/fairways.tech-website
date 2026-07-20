import type { Metadata } from "next";
import Script from "next/script";
import { LEGAL_CONFIG } from "@/config/legal";
import { AboutFaqAccordion } from "../components/AboutFaqAccordion";
import { Header, Footer } from "../components/SiteChrome";
import { buildPageMetadata } from "../../lib/seo";

export const metadata: Metadata = buildPageMetadata({
  title: "About | Agricultural finance infrastructure & compliance-aligned rails",
  description:
    "Fairways.Tech is digital infrastructure for agricultural financing: verified farm data and compliance-aligned rails so banks and partners can serve smallholder farmers in Ghana, the Netherlands, and other emerging markets.",
  path: "/about",
  ogTitle: "About Fairways.Tech – Compliance-first rails for rural finance",
});

const faqItems: { question: string; answer: string }[] = [
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
    question: "What problem does Fairways.Tech solve?",
    answer:
      "Fairways.Tech addresses the infrastructure gap between informal agricultural activity and formal finance by making participation and value-chain records visible in a format institutions can trust.",
  },
  {
    question: "How does Fairways.Tech collect farm data?",
    answer:
      "Fairways.Tech works with local partners to standardize and verify field and value-chain records, focusing on trusted documentation rather than proprietary methods. The resulting data is encrypted in transit and at rest, and stored and shared in line with GDPR.",
  },
  {
    question: "What principles guide the Fairways.Tech operating model?",
    answer:
      "Interoperability, traceability, and accountability. Participation records are standardized and verified so institutions and value-chain actors share a common foundation; each partner then applies its own governance and compliance standards on top.",
  },
  {
    question: "Is Fairways.Tech a bank, a lender, or a regulated financial institution?",
    answer:
      "No. Fairways.Tech is not a bank, lender, or regulated deposit-taking institution. We provide infrastructure; regulated financial services are delivered by licensed partners, who hold the relevant licences and remain accountable to supervisors.",
  },
  {
    question: "How is Fairways.Tech different from microfinance?",
    answer:
      "Microfinance institutions typically lend directly. Fairways.Tech provides shared infrastructure and trusted records that licensed actors can use within their own models.",
  },
  {
    question: "What type of data does the platform provide to institutions?",
    answer:
      "The platform provides structured, traceable participation and value-chain records for institutional review under each partner's own framework. That data is encrypted in transit and at rest, and stored and shared in line with GDPR.",
  },
  {
    question: "How does Fairways.Tech support AML, CFT and sanctions compliance?",
    answer:
      "The infrastructure supports traceability, controls, and auditability so licensed partners can execute AML/CFT and sanctions obligations under their own mandates.",
  },
  {
    question: "Who typically partners with Fairways.Tech?",
    answer:
      "Partners include local and regional banks, cooperatives, buyers, supply-chain partners, development funds and regulators seeking transparent, compliant, data-rich rails for rural finance and horticulture in emerging markets.",
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

/** Safe for embedding in <script type="application/ld+json"> (avoids breaking HTML if a string ever contains "<"). */
function jsonLdScriptContent(data: unknown) {
  return JSON.stringify(data).replace(/</g, "\\u003c");
}

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

const editorialCardClass =
  "group relative overflow-hidden rounded-2xl border border-white/55 bg-white/80 p-8 shadow-[0_12px_34px_rgba(31,77,54,0.08)] ring-1 ring-forest/5 backdrop-blur-sm transition-all duration-500 ease-out hover:-translate-y-0.5 hover:border-white/80 hover:shadow-[0_18px_44px_rgba(31,77,54,0.12)] sm:p-10 lg:p-12";

const editorialImageClass =
  "pointer-events-none absolute inset-0 bg-cover bg-center opacity-80 saturate-[0.94] contrast-[1.04] transition-transform duration-700 ease-out group-hover:scale-[1.025]";

const editorialOverlayStyle = {
  background:
    "linear-gradient(rgba(0,0,0,0.52), rgba(0,0,0,0.52))",
};

export default function AboutPage() {
  return (
    <>
      <Header />
      <main id="main-content" className="min-h-screen bg-gradient-to-b from-sand via-sand to-sand-muted">
        {/* Hero Section */}
        <section className="relative overflow-hidden bg-sand pt-32 pb-14 sm:pt-40 sm:pb-20">
          <div className="absolute inset-0 bg-gradient-to-br from-forest/3 via-transparent to-leaf/3" />
          <div className="relative z-10 mx-auto max-w-5xl px-6 lg:px-8">
            <div className="text-center">
              <p className="mb-4 text-xs font-semibold uppercase tracking-[0.22em] text-forest/85">
                People · purpose · presence
              </p>
              <h1 className="mb-6 text-4xl font-semibold tracking-tight text-stone sm:text-5xl">
                Fairways.Tech in depth
              </h1>
              <p className="mx-auto max-w-2xl text-lg leading-[1.75] text-slate-700 sm:text-xl">
                We build compliance-aligned infrastructure for agricultural financing, so partners can see real activity clearly and act with confidence.
              </p>
            </div>
          </div>
        </section>

        {/* Main Content */}
        <section className="relative z-0 bg-sand pb-24 pt-4 sm:pt-6">
          <div className="pointer-events-none absolute inset-x-0 top-0 h-16 bg-gradient-to-b from-sand via-sand/80 to-transparent" />
          <div className="mx-auto max-w-5xl px-6 lg:px-8">
            {/* Narrative anchor: legal/regulatory framing (detail lives in FAQ) */}
            <div className={`${editorialCardClass} mb-14 sm:mb-16`}>
              <div
                className={editorialImageClass}
                style={{ backgroundImage: "url('/images/about-overview-card.png')" }}
              />
              <div
                className="pointer-events-none absolute inset-0 z-[1] rounded-2xl"
                style={editorialOverlayStyle}
                aria-hidden="true"
              />
              <div className="relative z-10 text-center">
                <h2 className="mb-6 text-2xl font-semibold tracking-tight text-white drop-shadow-sm sm:text-3xl">
                  What is Fairways.Tech?
                </h2>
                <div className="mx-auto max-w-3xl space-y-5 text-base leading-[1.75] text-white/95 drop-shadow-sm sm:text-lg">
                  <p>
                    We design and operate compliance‑aligned digital infrastructure for agricultural financing: a shared layer between field activity and finance‑ready records. Licensed partners deliver regulated services; we provide the rails and coordination they plug into.
                  </p>
                  <p>
                    {LEGAL_CONFIG.netherlandsEntityName} (Netherlands) and{" "}
                    {LEGAL_CONFIG.ghanaEntityName} (Ghana) together operate under the
                    Fairways.Tech trading name. We build to supervisory and market
                    standards, including alignment with expectations under AMLR, FATF,
                    DORA, GDPR and regulatory oversight.
                  </p>
                </div>
              </div>
            </div>

            {/* FAQ Section */}
            <div className={editorialCardClass}>
              <div
                className={editorialImageClass}
                style={{ backgroundImage: "url('/images/about-why-we-exist-card.png')" }}
              />
              <div
                className="pointer-events-none absolute inset-0 z-[1] rounded-2xl"
                style={editorialOverlayStyle}
                aria-hidden="true"
              />
              <div className="relative z-10 text-center">
                <h2 className="mb-4 text-2xl font-semibold tracking-tight text-white drop-shadow-sm sm:text-3xl">
                  FAQ
                </h2>
                <p className="mb-8 mx-auto max-w-2xl text-base leading-relaxed text-white/90 drop-shadow-sm">
                  Operating model, data practices, compliance context, and typical partners.
                </p>
                <AboutFaqAccordion items={faqItems} />
              </div>
            </div>
          </div>
        </section>
      </main>
      <Script
        id="about-faq-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: jsonLdScriptContent(faqJsonLd) }}
      />
      <Script
        id="about-page-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: jsonLdScriptContent(aboutPageJsonLd) }}
      />
      <Script
        id="about-service-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: jsonLdScriptContent(serviceJsonLd) }}
      />
      <Script
        id="about-breadcrumb-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: jsonLdScriptContent(breadcrumbJsonLd) }}
      />
      <Footer />
    </>
  );
}
