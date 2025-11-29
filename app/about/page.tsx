import type { Metadata } from "next";
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
  return (
    <>
      <Header />
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
                Fairways.Tech designs and operates secure, compliance‑aligned digital infrastructure that enables financial institutions, cooperatives and market partners to serve Africa’s rural communities with confidence — without exposing proprietary models or sensitive operational details.
              </p>
              <p className="mb-4">
                Fairways.Tech B.V. (Netherlands) and Fairways.Tech Ltd (Ghana) together
                anchor a dual presence between Europe and West Africa. {`From day one we build to regulatory standard, aligning with frameworks such as AMLR, FATF, DORA, GDPR and Bank of Ghana supervisory expectations — ensuring institutional‑grade governance without disclosing internal methodologies.`}
              </p>
              <p>
                We believe that smallholder farmers should have access to transparent,
                compliant financial services on the same terms as any other business. By
                creating trusted digital infrastructure, we help close the liquidity gap
                that prevents millions of farmers from investing, growing and improving
                their livelihoods.
              </p>
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
                Fairways.Tech addresses these challenges by providing digital infrastructure that helps make rural production and financial activity visible in ways that banks and regulators can rely on — enabling compliant capital to flow to smallholder farmers without revealing sensitive internal processes.
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
