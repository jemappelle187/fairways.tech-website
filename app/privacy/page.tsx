// app/privacy/page.tsx

import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Website Privacy Policy | Fairways.Tech",
  description:
    "Learn how Fairways.Tech processes personal data when visitors use www.fairways.tech or submit the contact form. GDPR-aligned, institutional-grade privacy practices.",
};

export default function PrivacyPage() {
  return (
    <main className="bg-sand min-h-screen pt-28 pb-20">
      <div className="mx-auto max-w-3xl px-6 lg:px-8">
        <p className="text-xs font-semibold uppercase tracking-[0.28em] text-forest">
          Legal
        </p>

        <h1 className="mt-2 text-3xl font-semibold text-stone sm:text-4xl">
          Website Privacy Policy
        </h1>

        <p className="mt-2 text-sm text-slate-500">Last updated: 27 November 2025</p>

        <div className="mt-10 space-y-8 text-sm leading-relaxed text-slate-800">

          {/* 1 — WHO WE ARE */}
          <section>
            <h2 className="text-lg font-semibold text-stone">1. Who we are</h2>

            <p className="mt-2">
              This Privacy Policy explains how Fairways.Tech B.V. (Netherlands) and
              Fairways.Tech Ltd (Ghana) (“Fairways.Tech”, “we”, “us”, “our”)
              process personal data when you visit <strong>www.fairways.tech</strong>
              (the “Website”) or submit information through the Website contact form.
            </p>

            <p className="mt-3">For visitors in the EU/EEA, the primary data controller is:</p>
            <p className="mt-2"><strong>Fairways.Tech B.V.</strong> – The Netherlands</p>

            <p className="mt-3">
              All Website processing is governed by the <strong>EU General Data Protection Regulation (GDPR)</strong>.
              Where processing involves Fairways.Tech Ltd (Ghana), equivalent safeguards are applied to ensure an
              appropriate level of protection.
            </p>

            <p className="mt-3">For privacy inquiries or to exercise data rights, contact:</p>
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

          {/* 2 — WHAT DATA WE COLLECT */}
          <section>
            <h2 className="text-lg font-semibold text-stone">2. Personal data we collect</h2>

            <p className="mt-2">
              The Website collects only limited, non‑sensitive personal data. No biometric identifiers, identity documents, selfies, liveness checks, financial profiles, or regulated onboarding data are processed on this Website.
            </p>
            <p className="mt-2">
              Fairways.Tech’s <strong>mobile application</strong>, used by farmers, agents and field partners, <em>does</em> process additional categories of personal data — including biometrics, national identity numbers (e.g., Ghana Card), GPS-based farm mapping, and production or repayment data. That processing is governed separately under product‑level privacy notices, contractual agreements with cooperatives and institutions, and Fairways.Tech’s regulated compliance framework. It does not form part of this Website Privacy Policy.
            </p>

            {/* 2.1 CONTACT FORM */}
            <h3 className="mt-3 text-sm font-semibold text-stone">
              2.1 Information you provide via the Website contact form
            </h3>
            <p className="mt-1">
              When you choose to contact us, we collect the information you provide:
            </p>
            <ul className="mt-2 list-disc pl-5">
              <li>First name and last name</li>
              <li>Company or organisation</li>
              <li>Email address</li>
              <li>Phone number (with country code)</li>
              <li>Country</li>
              <li>Your message or inquiry</li>
            </ul>
            <p className="mt-2">
              The Website does not perform identity verification, biometric capture, or any regulated onboarding. 
              These processes occur only within the Fairways.Tech mobile application and are governed by separate 
              product-level privacy notices and contracts.
            </p>

            {/* 2.2 ANALYTICS & USAGE */}
            <h3 className="mt-4 text-sm font-semibold text-stone">
              2.2 Technical and usage data (analytics)
            </h3>
            <p className="mt-1">
              To understand how the Website is used and to maintain security and performance,
              we collect limited technical data such as:
            </p>
            <ul className="mt-2 list-disc pl-5">
              <li>IP address (stored only briefly in minimised form)</li>
              <li>Browser, operating system and device type</li>
              <li>Screen size and language settings</li>
              <li>Pages visited, visit duration and referrer URL</li>
              <li>Aggregate usage trends</li>
            </ul>
            <p className="mt-2">
              We do <strong>not</strong> use this information for advertising, profiling or commercial resale.
            </p>

            {/* 2.3 SECURITY LOGS */}
            <h3 className="mt-4 text-sm font-semibold text-stone">2.3 System logs and security events</h3>
            <p className="mt-1">
              Our hosting environment may automatically record:
            </p>
            <ul className="mt-2 list-disc pl-5">
              <li>Requests to our servers</li>
              <li>Error messages and performance diagnostics</li>
              <li>IP address and basic request metadata</li>
            </ul>
            <p className="mt-2">
              These logs help us monitor uptime, detect abuse and maintain a secure Website.
            </p>

            {/* 2.4 FORM ENRICHMENT */}
            <h3 className="mt-4 text-sm font-semibold text-stone">
              2.4 Technical context added to contact submissions
            </h3>
            <p className="mt-1">
              When you open or submit the contact form, we may include contextual
              information such as:
            </p>
            <ul className="mt-2 list-disc pl-5">
              <li>Approximate country or city (IP-derived)</li>
              <li>Browser and device information</li>
              <li>Referrer URL</li>
              <li>Timestamp of submission</li>
            </ul>
            <p className="mt-2">
              This helps us understand the origin of interest and respond appropriately.
            </p>
          </section>

          {/* 3 — LEGAL BASES */}
          <section>
            <h2 className="text-lg font-semibold text-stone">3. Legal bases for processing</h2>

            <p className="mt-2">We process personal data under the following GDPR bases:</p>

            <ul className="mt-2 list-disc pl-5">
              <li>
                <strong>Legitimate interests</strong> (Art. 6(1)(f)):
                operating, securing and improving the Website; performing analytics;
                preventing fraud and misuse.
              </li>
              <li>
                <strong>Pre-contractual steps</strong> (Art. 6(1)(b)):
                responding to contact requests and exploring potential partnerships.
              </li>
              <li>
                <strong>Consent</strong> (Art. 6(1)(a)):
                where required for certain analytics or cookies, as described in the Cookie Policy.
              </li>
            </ul>
          </section>

          {/* 4 — HOW WE USE DATA */}
          <section>
            <h2 className="text-lg font-semibold text-stone">4. How we use personal data</h2>

            <p className="mt-2">We may use personal data to:</p>

            <ul className="mt-2 list-disc pl-5">
              <li>Respond to your inquiries and manage follow-up</li>
              <li>Assess or initiate collaborations and partnerships</li>
              <li>Ensure Website stability, reliability and performance</li>
              <li>Analyse aggregate usage patterns (not individual profiles)</li>
              <li>Protect the Website against abuse and security threats</li>
              <li>Meet applicable legal and regulatory obligations</li>
            </ul>
            <p className="mt-2">
              We do <strong>not</strong> sell personal data and do <strong>not</strong> use Website analytics for targeted advertising.
            </p>
          </section>

          {/* 5 — RETENTION */}
          <section>
            <h2 className="text-lg font-semibold text-stone">5. Retention periods</h2>

            <p className="mt-2">We retain personal data only as long as necessary:</p>

            <ul className="mt-2 list-disc pl-5">
              <li>
                <strong>Contact form data</strong>: kept for a reasonable period for follow-up and partner management.
              </li>
              <li>
                <strong>Analytics data</strong>: kept only as aggregate or pseudonymised trends.
              </li>
              <li>
                <strong>Security logs</strong>: retained briefly unless needed to investigate incidents.
              </li>
            </ul>
          </section>

          {/* 6 — SHARING */}
          <section>
            <h2 className="text-lg font-semibold text-stone">6. Sharing and international transfers</h2>

            <p className="mt-2">
              We use a small number of trusted service providers for hosting, analytics,
              secure form handling and internal notifications. These processors act under
              our instructions and appropriate safeguards.
            </p>

            <p className="mt-3">
              Website analytics and form submissions are processed using privacy‑respecting tools. These processors 
              do not receive biometric data, identity documents, or any sensitive categories of information. 
              All operational data related to farmers, agents, cooperatives or identity workflows is handled 
              exclusively within the Fairways.Tech app ecosystem and remains outside the scope of this Website Policy.
            </p>

            <p className="mt-3">
              Personal data may be processed in the EU/EEA or in other jurisdictions.
              Where international transfers occur, we apply GDPR-compliant safeguards
              such as Standard Contractual Clauses.
            </p>

            <p className="mt-3">
              We may share data with regulators or authorities when legally required.
              We do not share Website data with third parties for marketing purposes.
            </p>
          </section>

          {/* 7 — RIGHTS */}
          <section>
            <h2 className="text-lg font-semibold text-stone">7. Your rights</h2>

            <p className="mt-2">Depending on your location, you may have the right to:</p>

            <ul className="mt-2 list-disc pl-5">
              <li>Access your personal data</li>
              <li>Rectify inaccuracies</li>
              <li>Request erasure (“right to be forgotten”)</li>
              <li>Restrict processing</li>
              <li>Object to processing based on legitimate interests</li>
              <li>Request data portability</li>
              <li>Withdraw consent at any time</li>
            </ul>

            <p className="mt-2">
              To exercise your rights, contact:{" "}
              <a
                href="mailto:privacy@fairways.tech"
                className="text-forest underline underline-offset-4"
              >
                privacy@fairways.tech
              </a>
            </p>

            <p className="mt-2">
              You may also lodge a complaint with an EU supervisory authority.
            </p>
          </section>

          {/* 8 — CHILDREN */}
          <section>
            <h2 className="text-lg font-semibold text-stone">8. Children</h2>

            <p className="mt-2">
              The Website is intended for professional audiences and is not directed at
              children. We do not knowingly collect data from children.
            </p>
          </section>

          {/* 9 — CHANGES */}
          <section>
            <h2 className="text-lg font-semibold text-stone">9. Changes to this Policy</h2>

            <p className="mt-2">
              We may update this Policy to reflect changes in our Website, operations
              or applicable laws. The “Last updated” date will be revised accordingly.
            </p>
          </section>

          {/* 10 — CONTACT */}
          <section>
            <h2 className="text-lg font-semibold text-stone">10. Contact</h2>

            <p className="mt-2">For any privacy-related questions, contact:</p>
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
  );
}