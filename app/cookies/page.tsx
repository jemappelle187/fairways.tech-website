import type { Metadata } from "next";
import { Header, Footer } from "../components/SiteChrome";

export const metadata: Metadata = {
  title: "Cookie & Local Storage Policy | Fairways.Tech",
  description:
    "Learn how Fairways.Tech uses cookies and local storage technologies in a transparent and proportionate manner.",
};

export default function CookiesPage() {
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
                Cookie & Local Storage Policy
              </h1>
              <p className="mx-auto max-w-3xl text-base leading-relaxed text-slate-700 sm:text-lg mb-4">
                Fairways.Tech uses a minimal, compliance‑aligned set of cookies and storage technologies. We do not use advertising cookies, tracking pixels, or any cross‑site profiling technologies. Our approach reflects our identity as a regulated, institutional‑grade platform.
              </p>
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
                <h2 className="mb-4 text-2xl font-semibold tracking-tight text-stone">1. Purpose of this Policy</h2>
                <div className="space-y-4 text-base leading-relaxed text-slate-800">
                  <p>
                    This Policy applies to www.fairways.tech (the &quot;Website&quot;) operated by Fairways.Tech B.V. (Netherlands) and Fairways.Tech Ltd (Ghana). It describes the types of cookies and storage technologies we use, why we use them, and the choices available to Website visitors.
                  </p>
                  <div className="rounded-xl border-l-4 border-forest bg-sand/40 p-5">
                    <p>
                      The Website is designed to function with minimal client‑side storage and no advertising‑related tracking. All technologies used are necessary for security, stability, analytics and user preference management.
                    </p>
                  </div>
                </div>
              </div>

              {/* Section 2 */}
              <div className="rounded-3xl border border-white/60 bg-white/80 p-8 shadow-[0_8px_32px_rgba(31,77,54,0.08)] backdrop-blur-sm sm:p-10">
                <h2 className="mb-4 text-2xl font-semibold tracking-tight text-stone">2. What technologies we use</h2>
                <div className="space-y-4 text-base leading-relaxed text-slate-800">
                  <p>The Website may use:</p>
                  <div className="space-y-3">
                    <div className="rounded-xl border-l-4 border-forest bg-sand/40 p-4">
                      <p className="font-semibold text-forest mb-1">Functional cookies</p>
                      <p className="text-sm text-slate-700">to ensure basic operation (e.g., remembering that you dismissed the cookie banner).</p>
                    </div>
                    <div className="rounded-xl border-l-4 border-leaf bg-sand/40 p-4">
                      <p className="font-semibold text-leaf mb-1">Local storage keys</p>
                      <p className="text-sm text-slate-700">used to store preferences and improve stability (e.g., distinguishing first‑time from returning visits for security and performance monitoring).</p>
                    </div>
                    <div className="rounded-xl border-l-4 border-forest bg-sand/40 p-4">
                      <p className="font-semibold text-forest mb-1">Privacy‑centric analytics</p>
                      <p className="text-sm text-slate-700">aggregated performance analytics that do not track users across websites or create marketing profiles.</p>
                    </div>
                  </div>
                  <div className="rounded-xl border border-slate-200/60 bg-gradient-to-br from-white to-sand/30 p-4 mt-4">
                    <p className="font-medium text-forest">
                      We do <strong>not</strong> use fingerprinting, cross‑site tracking, advertising cookies, marketing tags or behavioural profiling technologies.
                    </p>
                  </div>
                </div>
              </div>

              {/* Section 3 */}
              <div className="rounded-3xl border border-white/60 bg-white/80 p-8 shadow-[0_8px_32px_rgba(31,77,54,0.08)] backdrop-blur-sm sm:p-10">
                <h2 className="mb-4 text-2xl font-semibold tracking-tight text-stone">3. Categories of cookies & storage</h2>
                <div className="space-y-6">
                  <div className="rounded-2xl border border-slate-200/60 bg-gradient-to-br from-white to-sand/30 p-6">
                    <h3 className="mb-3 text-lg font-semibold text-stone">3.1 Strictly necessary / functional</h3>
                    <p className="mb-3 text-base text-slate-800">
                      These are required for the Website to function securely, including:
                    </p>
                    <ul className="ml-6 space-y-2 list-disc text-slate-700">
                      <li>Saving your cookie banner selection</li>
                      <li>Ensuring correct load behaviour and preventing repeated prompts</li>
                      <li>Basic fraud‑prevention and traffic integrity checks</li>
                    </ul>
                  </div>

                  <div className="rounded-2xl border border-slate-200/60 bg-gradient-to-br from-white to-sand/30 p-6">
                    <h3 className="mb-3 text-lg font-semibold text-stone">3.2 Performance & analytics (non‑advertising)</h3>
                    <p className="mb-3 text-base text-slate-800">
                      We use analytics strictly to understand aggregated performance patterns (page load times, navigation flows, referrer categories). These do not identify individual users.
                    </p>
                    <p className="text-sm text-slate-600">
                      Analytics help us maintain an institutional‑grade platform and support compliance expectations around system monitoring and operational resilience.
                    </p>
                  </div>
                </div>
              </div>

              {/* Section 4 */}
              <div className="rounded-3xl border border-white/60 bg-white/80 p-8 shadow-[0_8px_32px_rgba(31,77,54,0.08)] backdrop-blur-sm sm:p-10">
                <h2 className="mb-4 text-2xl font-semibold tracking-tight text-stone">4. How we use consent</h2>
                <div className="space-y-4 text-base leading-relaxed text-slate-800">
                  <p>
                    When visiting the Website, you will see a cookie banner informing you about our use of minimal cookies and storage. You may choose whether to allow analytics in addition to strictly necessary storage.
                  </p>
                  <p>
                    Functional storage loads automatically, as required for the Website to operate. Analytics only load after consent where legally required under GDPR and the ePrivacy rules.
                  </p>
                  <div className="rounded-xl border-l-4 border-forest bg-sand/40 p-5">
                    <p>
                      We are implementing an enhanced consent layer including &quot;Accept all&quot;, &quot;Reject&quot;, and &quot;Functional only&quot; options for improved visitor control.
                    </p>
                  </div>
                </div>
              </div>

              {/* Section 5 */}
              <div className="rounded-3xl border border-white/60 bg-white/80 p-8 shadow-[0_8px_32px_rgba(31,77,54,0.08)] backdrop-blur-sm sm:p-10">
                <h2 className="mb-4 text-2xl font-semibold tracking-tight text-stone">5. Managing cookies via your browser</h2>
                <div className="space-y-4 text-base leading-relaxed text-slate-800">
                  <p>
                    You can manage or delete cookies at any time via your browser settings. Options typically include:
                  </p>
                  <div className="grid gap-3 sm:grid-cols-2">
                    <div className="rounded-xl border border-slate-200/60 bg-gradient-to-br from-white to-sand/30 p-4">
                      <p className="text-sm font-medium text-slate-800">Viewing stored cookies</p>
                    </div>
                    <div className="rounded-xl border border-slate-200/60 bg-gradient-to-br from-white to-sand/30 p-4">
                      <p className="text-sm font-medium text-slate-800">Deleting cookies on exit</p>
                    </div>
                    <div className="rounded-xl border border-slate-200/60 bg-gradient-to-br from-white to-sand/30 p-4">
                      <p className="text-sm font-medium text-slate-800">Blocking cookies from specific sites</p>
                    </div>
                    <div className="rounded-xl border border-slate-200/60 bg-gradient-to-br from-white to-sand/30 p-4">
                      <p className="text-sm font-medium text-slate-800">Blocking all cookies</p>
                    </div>
                  </div>
                  <div className="rounded-xl border border-slate-200/60 bg-gradient-to-br from-white to-sand/30 p-4 mt-4">
                    <p className="text-sm text-slate-700">
                      Blocking all cookies may affect site functionality. However, since Fairways.Tech uses minimal, non‑marketing cookies, the impact is typically limited.
                    </p>
                  </div>
                </div>
              </div>

              {/* Section 6 */}
              <div className="rounded-3xl border border-white/60 bg-white/80 p-8 shadow-[0_8px_32px_rgba(31,77,54,0.08)] backdrop-blur-sm sm:p-10">
                <h2 className="mb-4 text-2xl font-semibold tracking-tight text-stone">6. Policy updates</h2>
                <p className="text-base leading-relaxed text-slate-800">
                  We may update this Policy to reflect new technologies, updated compliance requirements or platform enhancements. When changes are material, we will notify visitors through an updated banner or a prominent notice on the Website.
                </p>
              </div>

              {/* Section 7 */}
              <div className="rounded-3xl border border-white/60 bg-white/80 p-8 shadow-[0_8px_32px_rgba(31,77,54,0.08)] backdrop-blur-sm sm:p-10">
                <h2 className="mb-4 text-2xl font-semibold tracking-tight text-stone">7. Contact</h2>
                <div className="rounded-2xl border border-forest/20 bg-white/60 p-5">
                  <p className="mb-2 text-sm font-semibold text-forest">For any questions about this Policy:</p>
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
