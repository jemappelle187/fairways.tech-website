import type { Metadata } from "next";
import { Header, Footer } from "../components/SiteChrome";
import { LegalEntityBlock } from "../components/LegalEntityBlock";

export const metadata: Metadata = {
  title: "Website Terms & Conditions | Fairways.Tech",
  description:
    "Terms and conditions governing the use of the Fairways.Tech corporate website.",
};

export default function TermsPage() {
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
                Website Terms &amp; Conditions
              </h1>
              <p className="mx-auto max-w-2xl text-base text-slate-600 sm:text-lg">
                Last updated: 4 February 2026
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
                <h2 className="mb-4 text-2xl font-semibold tracking-tight text-stone">1. Who we are</h2>
                <div className="space-y-4 text-base leading-relaxed text-slate-800">
                  <p>
                    These Website Terms &amp; Conditions (&quot;Terms&quot;) govern your use of the
                    corporate website <strong>www.fairways.tech</strong> (the &quot;Website&quot;).
                  </p>
                  <div className="rounded-2xl border-l-4 border-forest bg-sand/40 p-5">
                    <p className="mb-3 font-semibold text-forest">The Website is operated by:</p>
                    <ul className="ml-6 space-y-2 list-disc text-slate-800">
                      <li>
                        <strong>Fairways Tech Operations B.V.</strong> (
                        <strong>99720248</strong>)
                      </li>
                      <li>
                        <strong>Fairways.Tech Ltd</strong>, incorporated in the Republic of Ghana
                      </li>
                    </ul>
                    <p className="mt-2 text-sm text-slate-700">
                      Together trading as &quot;Fairways.Tech&quot;.
                    </p>
                  </div>
                  <p>
                    In these Terms, &quot;Fairways.Tech&quot;, &quot;we&quot;, &quot;us&quot; or &quot;our&quot; refers to Fairways Tech
                    Operations B.V. and Fairways.Tech Ltd, trading as &quot;Fairways.Tech&quot;, unless we state otherwise. The Website is an
                    informational, non-transactional site. It does not facilitate account
                    opening, onboarding, biometric capture, lending, or any other regulated
                    financial or identification process. Any such services, if and when
                    offered, are governed by separate agreements and policies and are not
                    covered by these Website Terms.
                  </p>
                  <p>
                    By accessing the Website, you agree to be bound by these Terms. If
                    you do not agree, you must discontinue use immediately.
                  </p>
                </div>
              </div>

              {/* Section 2 */}
              <div className="rounded-3xl border border-white/60 bg-white/80 p-8 shadow-[0_8px_32px_rgba(31,77,54,0.08)] backdrop-blur-sm sm:p-10">
                <h2 className="mb-4 text-2xl font-semibold tracking-tight text-stone">
                  2. Permitted use of the Website
                </h2>
                <div className="space-y-4 text-base leading-relaxed text-slate-800">
                  <p>You may use the Website only:</p>
                  <div className="grid gap-3 sm:grid-cols-2">
                    <div className="rounded-xl border-l-4 border-forest bg-sand/40 p-4">
                      <p className="text-sm font-medium text-slate-800">For lawful personal or business purposes</p>
                    </div>
                    <div className="rounded-xl border-l-4 border-leaf bg-sand/40 p-4">
                      <p className="text-sm font-medium text-slate-800">In accordance with these Terms and applicable laws</p>
                    </div>
                  </div>
                  <p className="font-semibold text-stone">You must not:</p>
                  <ul className="ml-6 space-y-2 list-disc text-slate-800">
                    <li>Attempt to bypass or interfere with Website security</li>
                    <li>Use automated tools to scrape, extract or harvest data</li>
                    <li>Upload malware or harmful content</li>
                    <li>Use the Website to send unlawful or unsolicited communications</li>
                  </ul>
                  <div className="rounded-xl border border-slate-200/60 bg-gradient-to-br from-white to-sand/30 p-4 mt-4">
                    <p className="text-sm text-slate-700">
                      The Website is not intended for children under 16. If you are under
                      16, do not use the Website or submit personal data.
                    </p>
                  </div>
                </div>
              </div>

              {/* Section 3 */}
              <div className="rounded-3xl border border-white/60 bg-white/80 p-8 shadow-[0_8px_32px_rgba(31,77,54,0.08)] backdrop-blur-sm sm:p-10">
                <h2 className="mb-4 text-2xl font-semibold tracking-tight text-stone">
                  3. No financial, legal, or investment advice
                </h2>
                <div className="space-y-4 text-base leading-relaxed text-slate-800">
                  <p>
                    All information provided on the Website is general and descriptive in
                    nature. It does not:
                  </p>
                  <ul className="ml-6 space-y-2 list-disc text-slate-800">
                    <li>Constitute financial, legal, regulatory or investment advice</li>
                    <li>Create any advisory, client, or fiduciary relationship</li>
                    <li>
                      Represent an offer or solicitation to provide credit, banking,
                      investment, or other regulated financial services
                    </li>
                  </ul>
                  <div className="rounded-xl border-l-4 border-forest bg-sand/40 p-5 mt-4">
                    <p className="text-sm text-slate-800">
                      You should obtain independent professional advice before relying on
                      any information presented here, particularly in relation to financial,
                      legal, regulatory, or investment decisions, or before entering into
                      any credit, payment, or other financial arrangements.
                    </p>
                  </div>
                </div>
              </div>

              {/* Section 4 */}
              <div className="rounded-3xl border border-white/60 bg-white/80 p-8 shadow-[0_8px_32px_rgba(31,77,54,0.08)] backdrop-blur-sm sm:p-10">
                <h2 className="mb-4 text-2xl font-semibold tracking-tight text-stone">
                  4. Information on the Website
                </h2>
                <div className="space-y-4 text-base leading-relaxed text-slate-800">
                  <p>
                    We aim to ensure the accuracy and relevance of the information
                    published, but:
                  </p>
                  <ul className="ml-6 space-y-2 list-disc text-slate-800">
                    <li>Content may become outdated or incomplete</li>
                    <li>
                      We may update, modify or remove content without prior notification
                    </li>
                    <li>
                      We do not guarantee continuous availability or error‑free operation
                      of the Website
                    </li>
                  </ul>
                  <p>
                    To the extent permitted by law, we disclaim liability for any loss
                    arising from reliance on Website content.
                  </p>
                </div>
              </div>

              {/* Section 5 */}
              <div className="rounded-3xl border border-white/60 bg-white/80 p-8 shadow-[0_8px_32px_rgba(31,77,54,0.08)] backdrop-blur-sm sm:p-10">
                <h2 className="mb-4 text-2xl font-semibold tracking-tight text-stone">
                  5. Intellectual property rights
                </h2>
                <div className="space-y-4 text-base leading-relaxed text-slate-800">
                  <p>
                    All Website content is owned by or licensed to Fairways.Tech,
                    including:
                  </p>
                  <div className="grid gap-3 sm:grid-cols-2">
                    <div className="rounded-xl border border-slate-200/60 bg-gradient-to-br from-white to-sand/30 p-4">
                      <p className="text-sm font-medium text-slate-800">Logos, visual identity and branding</p>
                    </div>
                    <div className="rounded-xl border border-slate-200/60 bg-gradient-to-br from-white to-sand/30 p-4">
                      <p className="text-sm font-medium text-slate-800">Design, layout, and user interface</p>
                    </div>
                    <div className="rounded-xl border border-slate-200/60 bg-gradient-to-br from-white to-sand/30 p-4">
                      <p className="text-sm font-medium text-slate-800">Graphics, illustrations and images</p>
                    </div>
                    <div className="rounded-xl border border-slate-200/60 bg-gradient-to-br from-white to-sand/30 p-4">
                      <p className="text-sm font-medium text-slate-800">Text, copy and underlying source code</p>
                    </div>
                  </div>
                  <p>
                    You may reproduce limited extracts for non‑commercial use only.
                  </p>
                  <p>
                    You may not copy, commercially exploit, or redistribute Website
                    content without prior written permission.
                  </p>
                </div>
              </div>

              {/* Section 6 */}
              <div className="rounded-3xl border border-white/60 bg-white/80 p-8 shadow-[0_8px_32px_rgba(31,77,54,0.08)] backdrop-blur-sm sm:p-10">
                <h2 className="mb-4 text-2xl font-semibold tracking-tight text-stone">6. Third‑party content</h2>
                <p className="text-base leading-relaxed text-slate-800">
                  The Website may contain links to independent third‑party websites.
                  These are provided for convenience only. We do not endorse, control
                  or take responsibility for their content or practices.
                </p>
              </div>

              {/* Section 7 */}
              <div className="rounded-3xl border border-white/60 bg-white/80 p-8 shadow-[0_8px_32px_rgba(31,77,54,0.08)] backdrop-blur-sm sm:p-10">
                <h2 className="mb-4 text-2xl font-semibold tracking-tight text-stone">
                  7. Privacy and cookies
                </h2>
                <p className="text-base leading-relaxed text-slate-800">
                  Our handling of personal data and tracking technologies is governed
                  by our{" "}
                  <a href="/privacy" className="font-medium text-forest underline underline-offset-4 hover:text-forest/80 transition-colors">
                    Privacy Policy
                  </a>{" "}
                  and{" "}
                  <a href="/cookies" className="font-medium text-forest underline underline-offset-4 hover:text-forest/80 transition-colors">
                    Cookie Policy
                  </a>
                  .
                </p>
              </div>

              {/* Section 8 */}
              <div className="rounded-3xl border border-white/60 bg-white/80 p-8 shadow-[0_8px_32px_rgba(31,77,54,0.08)] backdrop-blur-sm sm:p-10">
                <h2 className="mb-4 text-2xl font-semibold tracking-tight text-stone">
                  8. Limitation of liability
                </h2>
                <div className="space-y-4 text-base leading-relaxed text-slate-800">
                  <p>
                    To the maximum extent permitted by law, Fairways.Tech excludes
                    liability for any indirect or consequential loss arising from your
                    use of the Website.
                  </p>
                  <p>
                    Where liability cannot be excluded, it will be limited to a
                    reasonable amount proportionate to your use of the Website as a
                    non‑commercial informational resource.
                  </p>
                  <div className="rounded-xl border border-slate-200/60 bg-gradient-to-br from-white to-sand/30 p-4">
                    <p className="text-sm text-slate-700">
                      Nothing in these Terms excludes or limits any liability that cannot be
                      excluded or limited under applicable law.
                    </p>
                  </div>
                </div>
              </div>

              {/* Section 9 */}
              <div className="rounded-3xl border border-white/60 bg-white/80 p-8 shadow-[0_8px_32px_rgba(31,77,54,0.08)] backdrop-blur-sm sm:p-10">
                <h2 className="mb-4 text-2xl font-semibold tracking-tight text-stone">
                  9. Changes to these Terms
                </h2>
                <p className="text-base leading-relaxed text-slate-800">
                  We may revise these Terms from time to time. The &quot;Last updated&quot; date
                  reflects the most recent version. Continued use constitutes acceptance
                  of the updated Terms.
                </p>
              </div>

              {/* Section 10 */}
              <div className="rounded-3xl border border-white/60 bg-white/80 p-8 shadow-[0_8px_32px_rgba(31,77,54,0.08)] backdrop-blur-sm sm:p-10">
                <h2 className="mb-4 text-2xl font-semibold tracking-tight text-stone">
                  10. Governing law &amp; jurisdiction
                </h2>
                <div className="rounded-xl border-l-4 border-forest bg-sand/40 p-5">
                  <p className="text-base leading-relaxed text-slate-800">
                    These Terms are governed by the laws of the Netherlands. Any disputes
                    shall be submitted to the exclusive jurisdiction of the courts of the
                    Netherlands, without prejudice to mandatory rights under applicable
                    law.
                  </p>
                </div>
              </div>

              {/* Section 11 */}
              <div className="rounded-3xl border border-white/60 bg-white/80 p-8 shadow-[0_8px_32px_rgba(31,77,54,0.08)] backdrop-blur-sm sm:p-10">
                <h2 className="mb-4 text-2xl font-semibold tracking-tight text-stone">11. Contact</h2>
                <div className="rounded-2xl border border-forest/20 bg-white/60 p-5">
                  <p className="mb-2 text-sm font-semibold text-forest">For questions regarding these Terms:</p>
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

              <LegalEntityBlock />
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
