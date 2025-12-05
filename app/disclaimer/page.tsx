import type { Metadata } from "next";
import { Header, Footer } from "../components/SiteChrome";

export const metadata: Metadata = {
  title: "Website Disclaimer | Fairways.Tech",
  description:
    "Website disclaimer for Fairways.Tech corporate website.",
};

export default function DisclaimerPage() {
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
                Legal
              </p>
              <h1 className="mb-6 text-4xl font-semibold tracking-tight text-stone sm:text-5xl lg:text-6xl">
                Website Disclaimer
              </h1>
              <p className="mx-auto max-w-2xl text-base text-slate-600 sm:text-lg">
                Last updated: 5 December 2025
              </p>
            </div>
          </div>
        </section>

        {/* Main Content */}
        <section className="relative pb-24">
          <div className="mx-auto max-w-4xl px-6 lg:px-8">
            <div className="space-y-8">
              {/* Section 1 */}
              <div className="rounded-3xl border border-white/60 bg-white/80 p-8 shadow-[0_8px_32px_rgba(31,77,54,0.08)] backdrop-blur-sm sm:p-10">
                <h2 className="mb-4 text-2xl font-semibold tracking-tight text-stone">
                  1. Informational Purpose Only
                </h2>
                <div className="space-y-4 text-base leading-relaxed text-slate-800">
                  <p>
                    The website <strong>www.fairways.tech</strong> (the &quot;Website&quot;) is operated by
                    Fairways.Tech B.V. (Netherlands) and Fairways.Tech Ltd (Ghana)
                    (&quot;Fairways.Tech&quot;, &quot;we&quot;, &quot;us&quot;).
                  </p>
                  <div className="rounded-xl border-l-4 border-forest bg-sand/40 p-5">
                    <p>
                      All content on this Website is provided for general informational
                      purposes only. Nothing on this Website constitutes financial,
                      investment, legal, tax, compliance, engineering, or other
                      professional advice. You should not rely on any information on this
                      Website as a substitute for professional guidance.
                    </p>
                  </div>
                </div>
              </div>

              {/* Section 2 */}
              <div className="rounded-3xl border border-white/60 bg-white/80 p-8 shadow-[0_8px_32px_rgba(31,77,54,0.08)] backdrop-blur-sm sm:p-10">
                <h2 className="mb-4 text-2xl font-semibold tracking-tight text-stone">
                  2. No Offer, Solicitation, or Commitment
                </h2>
                <div className="space-y-4 text-base leading-relaxed text-slate-800">
                  <p>
                    The Website does not constitute and shall not be interpreted as:
                  </p>
                  <ul className="ml-6 space-y-2 list-disc text-slate-800">
                    <li>An offer to sell or solicitation to buy any financial product or service</li>
                    <li>A commitment by Fairways.Tech or any partner to enter into any agreement</li>
                    <li>
                      A guarantee that any described model, technology, process, or
                      partnership will be launched, licensed, implemented, or made
                      available in any jurisdiction
                    </li>
                  </ul>
                  <div className="rounded-xl border border-slate-200/60 bg-gradient-to-br from-white to-sand/30 p-4 mt-4">
                    <p className="text-sm text-slate-700">
                      All future services are subject to regulatory approvals, partner
                      agreements, compliance assessments, market conditions, and internal
                      governance.
                    </p>
                  </div>
                </div>
              </div>

              {/* Section 3 */}
              <div className="rounded-3xl border border-white/60 bg-white/80 p-8 shadow-[0_8px_32px_rgba(31,77,54,0.08)] backdrop-blur-sm sm:p-10">
                <h2 className="mb-4 text-2xl font-semibold tracking-tight text-stone">
                  3. Forward-Looking Statements
                </h2>
                <div className="space-y-4 text-base leading-relaxed text-slate-800">
                  <p>
                    Certain statements on this Website may describe anticipated
                    developments, future functionality, growth plans, operational
                    forecasts, or expected farmer and market engagement. These are
                    forward‑looking statements that inherently involve risks and
                    uncertainties.
                  </p>
                  <p>Actual outcomes may differ materially due to factors such as:</p>
                  <div className="grid gap-3 sm:grid-cols-2">
                    <div className="rounded-xl border-l-4 border-forest bg-sand/40 p-4">
                      <p className="text-sm font-medium text-slate-800">Changes in regulation or supervisory guidance</p>
                    </div>
                    <div className="rounded-xl border-l-4 border-leaf bg-sand/40 p-4">
                      <p className="text-sm font-medium text-slate-800">Financial sector requirements</p>
                    </div>
                    <div className="rounded-xl border-l-4 border-forest bg-sand/40 p-4">
                      <p className="text-sm font-medium text-slate-800">Market, operational, or technological constraints</p>
                    </div>
                    <div className="rounded-xl border-l-4 border-leaf bg-sand/40 p-4">
                      <p className="text-sm font-medium text-slate-800">Partner dependencies and external conditions</p>
                    </div>
                  </div>
                  <p>
                    Fairways.Tech is under no obligation to update or revise
                    forward‑looking statements unless required to do so by law.
                  </p>
                </div>
              </div>

              {/* Section 4 */}
              <div className="rounded-3xl border border-white/60 bg-white/80 p-8 shadow-[0_8px_32px_rgba(31,77,54,0.08)] backdrop-blur-sm sm:p-10">
                <h2 className="mb-4 text-2xl font-semibold tracking-tight text-stone">
                  4. No Guarantee of Accuracy or Availability
                </h2>
                <div className="space-y-4 text-base leading-relaxed text-slate-800">
                  <p>
                    While we aim to keep the Website accurate and up to date, we make
                    no representations or warranties, express or implied, regarding the:
                  </p>
                  <ul className="ml-6 space-y-2 list-disc text-slate-800">
                    <li>Accuracy, completeness, or timeliness of the content</li>
                    <li>Availability or uninterrupted functioning of the Website</li>
                    <li>
                      Implementation of any feature, product, process, or partnership
                      in the form or timeline described
                    </li>
                  </ul>
                  <p>
                    We may modify, update, or remove Website content at any time without
                    notice.
                  </p>
                </div>
              </div>

              {/* Section 5 */}
              <div className="rounded-3xl border border-white/60 bg-white/80 p-8 shadow-[0_8px_32px_rgba(31,77,54,0.08)] backdrop-blur-sm sm:p-10">
                <h2 className="mb-4 text-2xl font-semibold tracking-tight text-stone">
                  5. External Links
                </h2>
                <p className="text-base leading-relaxed text-slate-800">
                  The Website may include links to external third‑party websites or
                  resources. Such links are provided solely for convenience. We do not
                  endorse, control, or guarantee the accuracy, security, or practices
                  of these third‑party sites. Accessing them is at your own risk.
                </p>
              </div>

              {/* Section 6 */}
              <div className="rounded-3xl border border-white/60 bg-white/80 p-8 shadow-[0_8px_32px_rgba(31,77,54,0.08)] backdrop-blur-sm sm:p-10">
                <h2 className="mb-4 text-2xl font-semibold tracking-tight text-stone">
                  6. Limitation of Liability
                </h2>
                <div className="space-y-4 text-base leading-relaxed text-slate-800">
                  <p>
                    To the fullest extent permitted under applicable law, Fairways.Tech
                    shall not be liable for any direct or indirect damages arising from
                    or related to:
                  </p>
                  <ul className="ml-6 space-y-2 list-disc text-slate-800">
                    <li>Your use of or inability to use the Website</li>
                    <li>Reliance on any information provided on the Website</li>
                    <li>Errors, omissions, or interruptions in the Website&apos;s operation</li>
                    <li>Any third‑party content or external links</li>
                  </ul>
                  <div className="rounded-xl border border-slate-200/60 bg-gradient-to-br from-white to-sand/30 p-4 mt-4">
                    <p className="text-sm text-slate-700">
                      Nothing in this Disclaimer limits liability that cannot be limited
                      under Dutch, Ghanaian, or other applicable law.
                    </p>
                  </div>
                </div>
              </div>

              {/* Section 7 */}
              <div className="rounded-3xl border border-white/60 bg-white/80 p-8 shadow-[0_8px_32px_rgba(31,77,54,0.08)] backdrop-blur-sm sm:p-10">
                <h2 className="mb-4 text-2xl font-semibold tracking-tight text-stone">7. Contact</h2>
                <div className="rounded-2xl border border-forest/20 bg-white/60 p-5">
                  <p className="mb-2 text-sm font-semibold text-forest">
                    For questions regarding this Disclaimer, please contact:
                  </p>
                  <p className="text-slate-800">
                    Email:{" "}
                    <a
                      href="mailto:privacy@fairways.tech"
                      className="font-medium text-forest underline underline-offset-4 hover:text-forest/80 transition-colors"
                    >
                      privacy@fairways.tech
                    </a>
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
