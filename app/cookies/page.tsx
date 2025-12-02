import { Header, Footer } from "../components/SiteChrome";

export default function CookiesPage() {
  return (
    <>
      <Header />
      <main id="main-content" className="bg-sand min-h-screen pt-28 pb-20">
        <div className="mx-auto max-w-3xl px-6 lg:px-8">
          <h1 className="text-3xl font-semibold text-stone sm:text-4xl">
          Cookie & Local Storage Policy
        </h1>
        <p className="mt-2">
          Fairways.Tech uses a minimal, compliance‑aligned set of cookies and storage technologies. We do not use advertising cookies, tracking pixels, or any cross‑site profiling technologies. Our approach reflects our identity as a regulated, institutional‑grade platform.
        </p>
        <p className="mt-2 text-sm text-slate-500">
          Last updated: 27 November 2025 — This Policy explains how Fairways.Tech uses cookies, local storage and similar technologies in a transparent and proportionate manner.
        </p>

        <div className="mt-10 space-y-6 text-sm leading-relaxed text-slate-800">

          <section>
            <h2 className="text-lg font-semibold text-stone">1. Purpose of this Policy</h2>
            <p className="mt-2">
              This Policy applies to www.fairways.tech (the “Website”) operated by Fairways.Tech B.V. (Netherlands) and Fairways.Tech Ltd (Ghana). It describes the types of cookies and storage technologies we use, why we use them, and the choices available to Website visitors.
            </p>
            <p className="mt-2">
              The Website is designed to function with minimal client‑side storage and no advertising‑related tracking. All technologies used are necessary for security, stability, analytics and user preference management.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-stone">2. What technologies we use</h2>
            <p className="mt-2">
              The Website may use:
            </p>
            <ul className="mt-2 list-disc pl-5">
              <li><strong>Functional cookies</strong> — to ensure basic operation (e.g., remembering that you dismissed the cookie banner).</li>
              <li><strong>Local storage keys</strong> — used to store preferences and improve stability (e.g., distinguishing first‑time from returning visits for security and performance monitoring).</li>
              <li><strong>Privacy‑centric analytics</strong> — aggregated performance analytics that do not track users across websites or create marketing profiles.</li>
            </ul>
            <p className="mt-2">
              We do <strong>not</strong> use fingerprinting, cross‑site tracking, advertising cookies, marketing tags or behavioural profiling technologies.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-stone">3. Categories of cookies & storage</h2>

            <h3 className="mt-3 text-sm font-semibold text-stone">3.1 Strictly necessary / functional</h3>
            <p className="mt-1">
              These are required for the Website to function securely, including:
            </p>
            <ul className="mt-2 list-disc pl-5">
              <li>Saving your cookie banner selection</li>
              <li>Ensuring correct load behaviour and preventing repeated prompts</li>
              <li>Basic fraud‑prevention and traffic integrity checks</li>
            </ul>

            <h3 className="mt-4 text-sm font-semibold text-stone">3.2 Performance & analytics (non‑advertising)</h3>
            <p className="mt-1">
              We use analytics strictly to understand aggregated performance patterns (page load times, navigation flows, referrer categories). These do not identify individual users.
            </p>
            <p className="mt-2">
              Analytics help us maintain an institutional‑grade platform and support compliance expectations around system monitoring and operational resilience.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-stone">4. How we use consent</h2>
            <p className="mt-2">
              When visiting the Website, you will see a cookie banner informing you about our use of minimal cookies and storage. You may choose whether to allow analytics in addition to strictly necessary storage.
            </p>
            <p className="mt-2">
              Functional storage loads automatically, as required for the Website to operate. Analytics only load after consent where legally required under GDPR and the ePrivacy rules.
            </p>
            <p className="mt-2">
              We are implementing an enhanced consent layer including “Accept all”, “Reject”, and “Functional only” options for improved visitor control.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-stone">5. Managing cookies via your browser</h2>
            <p className="mt-2">
              You can manage or delete cookies at any time via your browser settings. Options typically include:
            </p>
            <ul className="mt-2 list-disc pl-5">
              <li>Viewing stored cookies</li>
              <li>Deleting cookies on exit</li>
              <li>Blocking cookies from specific sites</li>
              <li>Blocking all cookies</li>
            </ul>
            <p className="mt-2">
              Blocking all cookies may affect site functionality. However, since Fairways.Tech uses minimal, non‑marketing cookies, the impact is typically limited.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-stone">6. Policy updates</h2>
            <p className="mt-2">
              We may update this Policy to reflect new technologies, updated compliance requirements or platform enhancements. When changes are material, we will notify visitors through an updated banner or a prominent notice on the Website.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-stone">7. Contact</h2>
            <p className="mt-2">For any questions about this Policy:</p>
            <p className="mt-1">
              Email:{" "}
              <a
                href="mailto:privacy@fairways.tech"
                className="text-forest underline underline-offset-4"
              >
                privacy@fairways.tech
              </a>
            </p>
          </section>
        </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
