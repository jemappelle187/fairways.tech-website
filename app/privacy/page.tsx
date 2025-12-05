import type { Metadata } from "next";
import { Header, Footer } from "../components/SiteChrome";

export const metadata: Metadata = {
  title: "Website Privacy Policy | Fairways.Tech",
  description:
    "Learn how Fairways.Tech processes personal data when visitors use www.fairways.tech or submit the contact form. GDPR-aligned, institutional-grade privacy practices.",
};

export default function PrivacyPage() {
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
                Website Privacy Policy
              </h1>
              <p className="mx-auto max-w-2xl text-base text-slate-600 sm:text-lg">
                Last updated: 27 January 2025
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
                    This Privacy Policy explains how Fairways.Tech B.V. (Netherlands) and
                    Fairways.Tech Ltd (Ghana) (&quot;Fairways.Tech&quot;, &quot;we&quot;, &quot;us&quot;, &quot;our&quot;)
                    process personal data when you visit <strong>www.fairways.tech</strong>
                    (the &quot;Website&quot;) or submit information through the Website contact form.
                  </p>
                  <div className="rounded-2xl border-l-4 border-forest bg-sand/40 p-5">
                    <p className="mb-2 font-semibold text-forest">For visitors in the EU/EEA, the primary data controller is:</p>
                    <p className="text-slate-800"><strong>Fairways.Tech B.V.</strong> – The Netherlands</p>
                  </div>
                  <p>
                    All Website processing is governed by the <strong>EU General Data Protection Regulation (GDPR)</strong>.
                    Where processing involves Fairways.Tech Ltd (Ghana), equivalent safeguards are applied to ensure an
                    appropriate level of protection.
                  </p>
                  <div className="rounded-2xl border border-forest/20 bg-white/60 p-5">
                    <p className="mb-2 text-sm font-semibold text-forest">For privacy inquiries or to exercise data rights, contact:</p>
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

              {/* Section 2 */}
              <div className="rounded-3xl border border-white/60 bg-white/80 p-8 shadow-[0_8px_32px_rgba(31,77,54,0.08)] backdrop-blur-sm sm:p-10">
                <h2 className="mb-4 text-2xl font-semibold tracking-tight text-stone">2. Personal data we collect</h2>
                <div className="space-y-4 text-base leading-relaxed text-slate-800">
                  <p>
                    The Website collects only limited, non‑sensitive personal data. No biometric identifiers, identity documents, selfies, liveness checks, financial profiles, or regulated onboarding data are processed on this Website.
                  </p>
                  <p>
                    Fairways.Tech&apos;s <strong>mobile application</strong>, used by farmers, agents and field partners, <em>does</em> process additional categories of personal data — including biometrics, national identity numbers (e.g., Ghana Card), GPS-based farm mapping, and production or repayment data. That processing is governed separately under product‑level privacy notices, contractual agreements with cooperatives and institutions, and Fairways.Tech&apos;s regulated compliance framework. It does not form part of this Website Privacy Policy.
                  </p>

                  <div className="mt-6 space-y-6">
                    <div className="rounded-2xl border border-slate-200/60 bg-gradient-to-br from-white to-sand/30 p-6">
                      <h3 className="mb-3 text-lg font-semibold text-stone">
                        2.1 Information you provide via the Website contact form
                      </h3>
                      <p className="mb-3">When you choose to contact us, we collect the information you provide:</p>
                      <ul className="ml-6 space-y-2 list-disc text-slate-700">
                        <li>First name and last name</li>
                        <li>Company or organisation</li>
                        <li>Email address</li>
                        <li>Phone number (with country code)</li>
                        <li>Country</li>
                        <li>Your message or inquiry</li>
                      </ul>
                      <p className="mt-3 text-sm text-slate-600">
                        The Website does not perform identity verification, biometric capture, or any regulated onboarding. 
                        These processes occur only within the Fairways.Tech mobile application and are governed by separate 
                        product-level privacy notices and contracts.
                      </p>
                    </div>

                    <div className="rounded-2xl border border-slate-200/60 bg-gradient-to-br from-white to-sand/30 p-6">
                      <h3 className="mb-3 text-lg font-semibold text-stone">
                        2.2 Technical and usage data (analytics)
                      </h3>
                      <p className="mb-3">
                        To understand how the Website is used and to maintain security and performance,
                        we collect limited technical data such as:
                      </p>
                      <ul className="ml-6 space-y-2 list-disc text-slate-700">
                        <li>IP address (stored only briefly in minimised form)</li>
                        <li>Browser, operating system and device type</li>
                        <li>Screen size and language settings</li>
                        <li>Pages visited, visit duration and referrer URL</li>
                        <li>Aggregate usage trends</li>
                      </ul>
                      <p className="mt-3 font-medium text-forest">
                        We do <strong>not</strong> use this information for advertising, profiling or commercial resale.
                      </p>
                    </div>

                    <div className="rounded-2xl border border-slate-200/60 bg-gradient-to-br from-white to-sand/30 p-6">
                      <h3 className="mb-3 text-lg font-semibold text-stone">2.3 System logs and security events</h3>
                      <p className="mb-3">Our hosting environment may automatically record:</p>
                      <ul className="ml-6 space-y-2 list-disc text-slate-700">
                        <li>Requests to our servers</li>
                        <li>Error messages and performance diagnostics</li>
                        <li>IP address and basic request metadata</li>
                      </ul>
                      <p className="mt-3 text-sm text-slate-600">
                        These logs help us monitor uptime, detect abuse and maintain a secure Website.
                      </p>
                    </div>

                    <div className="rounded-2xl border border-slate-200/60 bg-gradient-to-br from-white to-sand/30 p-6">
                      <h3 className="mb-3 text-lg font-semibold text-stone">
                        2.4 Technical context added to contact submissions
                      </h3>
                      <p className="mb-3">
                        When you open or submit the contact form, we may include contextual
                        information such as:
                      </p>
                      <ul className="ml-6 space-y-2 list-disc text-slate-700">
                        <li>Approximate country or city (IP-derived)</li>
                        <li>Browser and device information</li>
                        <li>Referrer URL</li>
                        <li>Timestamp of submission</li>
                      </ul>
                      <p className="mt-3 text-sm text-slate-600">
                        This helps us understand the origin of interest and respond appropriately.
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Section 3 */}
              <div className="rounded-3xl border border-white/60 bg-white/80 p-8 shadow-[0_8px_32px_rgba(31,77,54,0.08)] backdrop-blur-sm sm:p-10">
                <h2 className="mb-4 text-2xl font-semibold tracking-tight text-stone">3. Legal bases for processing</h2>
                <p className="mb-4 text-base leading-relaxed text-slate-800">We process personal data under the following GDPR bases:</p>
                <div className="space-y-3">
                  <div className="rounded-xl border-l-4 border-forest bg-sand/40 p-4">
                    <p className="font-semibold text-forest mb-1">Legitimate interests (Art. 6(1)(f))</p>
                    <p className="text-sm text-slate-700">operating, securing and improving the Website; performing analytics; preventing fraud and misuse.</p>
                  </div>
                  <div className="rounded-xl border-l-4 border-leaf bg-sand/40 p-4">
                    <p className="font-semibold text-leaf mb-1">Pre-contractual steps (Art. 6(1)(b))</p>
                    <p className="text-sm text-slate-700">responding to contact requests and exploring potential partnerships.</p>
                  </div>
                  <div className="rounded-xl border-l-4 border-forest bg-sand/40 p-4">
                    <p className="font-semibold text-forest mb-1">Consent (Art. 6(1)(a))</p>
                    <p className="text-sm text-slate-700">where required for certain analytics or cookies, as described in the Cookie Policy.</p>
                  </div>
                </div>
              </div>

              {/* Section 4 */}
              <div className="rounded-3xl border border-white/60 bg-white/80 p-8 shadow-[0_8px_32px_rgba(31,77,54,0.08)] backdrop-blur-sm sm:p-10">
                <h2 className="mb-4 text-2xl font-semibold tracking-tight text-stone">4. How we use personal data</h2>
                <p className="mb-4 text-base leading-relaxed text-slate-800">We may use personal data to:</p>
                <ul className="ml-6 space-y-2 list-disc text-base leading-relaxed text-slate-800">
                  <li>Respond to your inquiries and manage follow-up</li>
                  <li>Assess or initiate collaborations and partnerships</li>
                  <li>Ensure Website stability, reliability and performance</li>
                  <li>Analyse aggregate usage patterns (not individual profiles)</li>
                  <li>Protect the Website against abuse and security threats</li>
                  <li>Meet applicable legal and regulatory obligations</li>
                </ul>
                <p className="mt-4 font-medium text-forest">
                  We do <strong>not</strong> sell personal data and do <strong>not</strong> use Website analytics for targeted advertising.
                </p>
              </div>

              {/* Section 5 */}
              <div className="rounded-3xl border border-white/60 bg-white/80 p-8 shadow-[0_8px_32px_rgba(31,77,54,0.08)] backdrop-blur-sm sm:p-10">
                <h2 className="mb-4 text-2xl font-semibold tracking-tight text-stone">5. Retention periods</h2>
                <p className="mb-4 text-base leading-relaxed text-slate-800">We retain personal data only as long as necessary:</p>
                <div className="space-y-3">
                  <div className="rounded-xl border border-slate-200/60 bg-gradient-to-br from-white to-sand/30 p-4">
                    <p className="font-semibold text-stone mb-1">Contact form data</p>
                    <p className="text-sm text-slate-700">kept for a reasonable period for follow-up and partner management.</p>
                  </div>
                  <div className="rounded-xl border border-slate-200/60 bg-gradient-to-br from-white to-sand/30 p-4">
                    <p className="font-semibold text-stone mb-1">Analytics data</p>
                    <p className="text-sm text-slate-700">kept only as aggregate or pseudonymised trends.</p>
                  </div>
                  <div className="rounded-xl border border-slate-200/60 bg-gradient-to-br from-white to-sand/30 p-4">
                    <p className="font-semibold text-stone mb-1">Security logs</p>
                    <p className="text-sm text-slate-700">retained briefly unless needed to investigate incidents.</p>
                  </div>
                </div>
              </div>

              {/* Section 6 */}
              <div className="rounded-3xl border border-white/60 bg-white/80 p-8 shadow-[0_8px_32px_rgba(31,77,54,0.08)] backdrop-blur-sm sm:p-10">
                <h2 className="mb-4 text-2xl font-semibold tracking-tight text-stone">6. Sharing and international transfers</h2>
                <div className="space-y-4 text-base leading-relaxed text-slate-800">
                  <p>
                    We use a small number of trusted service providers for hosting, analytics,
                    secure form handling and internal notifications. These processors act under
                    our instructions and appropriate safeguards.
                  </p>
                  <p>
                    Website analytics and form submissions are processed using privacy‑respecting tools. These processors 
                    do not receive biometric data, identity documents, or any sensitive categories of information. 
                    All operational data related to farmers, agents, cooperatives or identity workflows is handled 
                    exclusively within the Fairways.Tech app ecosystem and remains outside the scope of this Website Policy.
                  </p>
                  <p>
                    Personal data may be processed in the EU/EEA or in other jurisdictions.
                    Where international transfers occur, we apply GDPR-compliant safeguards
                    such as Standard Contractual Clauses.
                  </p>
                  <p>
                    We may share data with regulators or authorities when legally required.
                    We do not share Website data with third parties for marketing purposes.
                  </p>
                </div>
              </div>

              {/* Section 7 */}
              <div className="rounded-3xl border border-white/60 bg-white/80 p-8 shadow-[0_8px_32px_rgba(31,77,54,0.08)] backdrop-blur-sm sm:p-10">
                <h2 className="mb-4 text-2xl font-semibold tracking-tight text-stone">7. Your rights</h2>
                <p className="mb-4 text-base leading-relaxed text-slate-800">Depending on your location, you may have the right to:</p>
                <div className="grid gap-3 sm:grid-cols-2 mb-6">
                  <div className="rounded-xl border border-slate-200/60 bg-gradient-to-br from-white to-sand/30 p-4">
                    <p className="text-sm font-medium text-slate-800">Access your personal data</p>
                  </div>
                  <div className="rounded-xl border border-slate-200/60 bg-gradient-to-br from-white to-sand/30 p-4">
                    <p className="text-sm font-medium text-slate-800">Rectify inaccuracies</p>
                  </div>
                  <div className="rounded-xl border border-slate-200/60 bg-gradient-to-br from-white to-sand/30 p-4">
                    <p className="text-sm font-medium text-slate-800">Request erasure (&quot;right to be forgotten&quot;)</p>
                  </div>
                  <div className="rounded-xl border border-slate-200/60 bg-gradient-to-br from-white to-sand/30 p-4">
                    <p className="text-sm font-medium text-slate-800">Restrict processing</p>
                  </div>
                  <div className="rounded-xl border border-slate-200/60 bg-gradient-to-br from-white to-sand/30 p-4">
                    <p className="text-sm font-medium text-slate-800">Object to processing</p>
                  </div>
                  <div className="rounded-xl border border-slate-200/60 bg-gradient-to-br from-white to-sand/30 p-4">
                    <p className="text-sm font-medium text-slate-800">Request data portability</p>
                  </div>
                </div>
                <div className="rounded-2xl border border-forest/20 bg-white/60 p-5">
                  <p className="mb-2 text-sm font-semibold text-forest">To exercise your rights, contact:</p>
                  <p className="text-slate-800">
                    <a
                      href="mailto:privacy@fairways.tech"
                      className="font-medium text-forest underline underline-offset-4 hover:text-forest/80 transition-colors"
                    >
                      privacy@fairways.tech
                    </a>
                  </p>
                  <p className="mt-3 text-sm text-slate-600">
                    You may also lodge a complaint with an EU supervisory authority.
                  </p>
                </div>
              </div>

              {/* Section 8 */}
              <div className="rounded-3xl border border-white/60 bg-white/80 p-8 shadow-[0_8px_32px_rgba(31,77,54,0.08)] backdrop-blur-sm sm:p-10">
                <h2 className="mb-4 text-2xl font-semibold tracking-tight text-stone">8. Children</h2>
                <p className="text-base leading-relaxed text-slate-800">
                  The Website is intended for professional audiences and is not directed at
                  children. We do not knowingly collect data from children.
                </p>
              </div>

              {/* Section 9 */}
              <div className="rounded-3xl border border-white/60 bg-white/80 p-8 shadow-[0_8px_32px_rgba(31,77,54,0.08)] backdrop-blur-sm sm:p-10">
                <h2 className="mb-4 text-2xl font-semibold tracking-tight text-stone">9. Changes to this Policy</h2>
                <p className="text-base leading-relaxed text-slate-800">
                  We may update this Policy to reflect changes in our Website, operations
                  or applicable laws. The &quot;Last updated&quot; date will be revised accordingly.
                </p>
              </div>

              {/* Section 10 */}
              <div className="rounded-3xl border border-white/60 bg-white/80 p-8 shadow-[0_8px_32px_rgba(31,77,54,0.08)] backdrop-blur-sm sm:p-10">
                <h2 className="mb-4 text-2xl font-semibold tracking-tight text-stone">10. Contact</h2>
                <div className="rounded-2xl border border-forest/20 bg-white/60 p-5">
                  <p className="mb-2 text-sm font-semibold text-forest">For any privacy-related questions, contact:</p>
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
