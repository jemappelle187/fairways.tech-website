import type { Metadata } from "next";
import { Header, Footer } from "../components/SiteChrome";

export const metadata: Metadata = {
  title: "Website Terms & Conditions | Fairways.Tech",
  description:
    "Terms and conditions governing the use of the Fairways.Tech corporate website.",
};

export default function TermsPage() {
  return (
    <>
      <Header />
      <main id="main-content" className="min-h-screen bg-sand pt-28 pb-20">
        <div className="mx-auto max-w-3xl px-6 lg:px-8">
        <p className="text-xs font-semibold uppercase tracking-[0.24em] text-forest">
          Legal
        </p>
        <h1 className="mt-2 text-3xl font-semibold text-stone sm:text-4xl">
          Website Terms &amp; Conditions
        </h1>
        <p className="mt-2 text-sm text-slate-500">Last updated: 27 November 2025</p>

        <div className="mt-10 space-y-8 text-sm leading-relaxed text-slate-800">
          <section>
            <h2 className="text-lg font-semibold text-stone">1. Who we are</h2>
            <p className="mt-2">
              These Website Terms &amp; Conditions (“Terms”) govern your use of the
              corporate website <strong>www.fairways.tech</strong> (the “Website”).
            </p>
            <p className="mt-2">The Website is operated by:</p>
            <ul className="mt-2 list-disc pl-5">
              <li>Fairways.Tech B.V., incorporated in the Netherlands</li>
              <li>Fairways.Tech Ltd, incorporated in the Republic of Ghana</li>
            </ul>
            <p className="mt-2">
              Together, “Fairways.Tech”, “we”, “us” or “our”. The Website is an
              informational, non-transactional site. It does not facilitate account
              opening, onboarding, biometric capture, lending, or any other regulated
              financial or identification process. Any such services, if and when
              offered, are governed by separate agreements and policies and are not
              covered by these Website Terms.
            </p>
            <p className="mt-2">
              By accessing the Website, you agree to be bound by these Terms. If
              you do not agree, you must discontinue use immediately.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-stone">
              2. Permitted use of the Website
            </h2>
            <p className="mt-2">You may use the Website only:</p>
            <ul className="mt-2 list-disc pl-5">
              <li>For lawful personal or business purposes</li>
              <li>In accordance with these Terms and applicable laws</li>
            </ul>
            <p className="mt-2">You must not:</p>
            <ul className="mt-2 list-disc pl-5">
              <li>Attempt to bypass or interfere with Website security</li>
              <li>Use automated tools to scrape, extract or harvest data</li>
              <li>Upload malware or harmful content</li>
              <li>Use the Website to send unlawful or unsolicited communications</li>
            </ul>
            <p className="mt-2">
              The Website is not intended for children under 16. If you are under
              16, do not use the Website or submit personal data.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-stone">
              3. No financial, legal, or investment advice
            </h2>
            <p className="mt-2">
              All information provided on the Website is general and descriptive in
              nature. It does not:
            </p>
            <ul className="mt-2 list-disc pl-5">
              <li>Constitute financial, legal, regulatory or investment advice</li>
              <li>Create any advisory, client, or fiduciary relationship</li>
              <li>
                Represent an offer or solicitation to provide credit, banking,
                investment, or other regulated financial services
              </li>
            </ul>
            <p className="mt-2">
              You should obtain independent professional advice before relying on
              any information presented here, particularly in relation to financial,
              legal, regulatory, or investment decisions, or before entering into
              any credit, payment, or other financial arrangements.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-stone">
              4. Information on the Website
            </h2>
            <p className="mt-2">
              We aim to ensure the accuracy and relevance of the information
              published, but:
            </p>
            <ul className="mt-2 list-disc pl-5">
              <li>Content may become outdated or incomplete</li>
              <li>
                We may update, modify or remove content without prior notification
              </li>
              <li>
                We do not guarantee continuous availability or error‑free operation
                of the Website
              </li>
            </ul>
            <p className="mt-2">
              To the extent permitted by law, we disclaim liability for any loss
              arising from reliance on Website content.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-stone">
              5. Intellectual property rights
            </h2>
            <p className="mt-2">
              All Website content is owned by or licensed to Fairways.Tech,
              including:
            </p>
            <ul className="mt-2 list-disc pl-5">
              <li>Logos, visual identity and branding</li>
              <li>Design, layout, and user interface</li>
              <li>Graphics, illustrations and images</li>
              <li>Text, copy and underlying source code</li>
            </ul>
            <p className="mt-2">
              You may reproduce limited extracts for non‑commercial use only.
            </p>
            <p className="mt-2">
              You may not copy, commercially exploit, or redistribute Website
              content without prior written permission.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-stone">6. Third‑party content</h2>
            <p className="mt-2">
              The Website may contain links to independent third‑party websites.
              These are provided for convenience only. We do not endorse, control
              or take responsibility for their content or practices.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-stone">
              7. Privacy and cookies
            </h2>
            <p className="mt-2">
              Our handling of personal data and tracking technologies is governed
              by our{" "}
              <a href="/privacy" className="text-forest underline underline-offset-4">
                Privacy Policy
              </a>{" "}
              and{" "}
              <a href="/cookies" className="text-forest underline underline-offset-4">
                Cookie Policy
              </a>
              .
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-stone">
              8. Limitation of liability
            </h2>
            <p className="mt-2">
              To the maximum extent permitted by law, Fairways.Tech excludes
              liability for any indirect or consequential loss arising from your
              use of the Website.
            </p>
            <p className="mt-2">
              Where liability cannot be excluded, it will be limited to a
              reasonable amount proportionate to your use of the Website as a
              non‑commercial informational resource.
            </p>
            <p className="mt-2">
              Nothing in these Terms excludes or limits any liability that cannot be
              excluded or limited under applicable law.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-stone">
              9. Changes to these Terms
            </h2>
            <p className="mt-2">
              We may revise these Terms from time to time. The “Last updated” date
              reflects the most recent version. Continued use constitutes acceptance
              of the updated Terms.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-stone">
              10. Governing law &amp; jurisdiction
            </h2>
            <p className="mt-2">
              These Terms are governed by the laws of the Netherlands. Any disputes
              shall be submitted to the exclusive jurisdiction of the courts of the
              Netherlands, without prejudice to mandatory rights under applicable
              law.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-stone">11. Contact</h2>
            <p className="mt-2">For questions regarding these Terms:</p>
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
