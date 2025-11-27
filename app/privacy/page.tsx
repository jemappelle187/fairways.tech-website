// app/privacy/page.tsx

export default function PrivacyPage() {
  return (
    <main className="bg-sand min-h-screen py-16">
      <div className="mx-auto max-w-3xl px-6 lg:px-8">
        <h1 className="text-3xl font-semibold text-stone sm:text-4xl">
          Website Privacy Policy
        </h1>
        <p className="mt-2 text-sm text-slate-500">
          Last updated: 27 November 2025
        </p>

        <div className="mt-10 space-y-6 text-sm leading-relaxed text-slate-800">
          <section>
            <h2 className="text-lg font-semibold text-stone">
              1. Who we are
            </h2>
            <p className="mt-2">
              This Privacy Policy explains how Fairways.Tech B.V. (Netherlands)
              and Fairways.Tech Ltd (Ghana) ("Fairways.Tech", "we", "us",
              "our") process personal data when you visit{" "}
              <strong>www.fairways.tech</strong> (the "Website") or use the
              Website contact form.
            </p>
            <p className="mt-2">
              For Website visitors in the EU/EEA, the primary data controller
              under the GDPR is:
            </p>
            <p className="mt-2">
              <strong>Fairways.Tech B.V.</strong> – The Netherlands
            </p>
            <p className="mt-2">
              If you have questions or wish to exercise your rights, contact:
            </p>
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

          <section>
            <h2 className="text-lg font-semibold text-stone">
              2. What personal data we collect
            </h2>

            <h3 className="mt-3 text-sm font-semibold text-stone">
              2.1 Information you provide via the contact form
            </h3>
            <p className="mt-1">
              When you use the Website contact form, we may collect:
            </p>
            <ul className="mt-2 list-disc pl-5">
              <li>First name and last name</li>
              <li>Company or organisation</li>
              <li>Business or private email address</li>
              <li>Phone number (with country code)</li>
              <li>Country</li>
              <li>Free-text message (how you would like to collaborate or what you want to ask)</li>
            </ul>

            <h3 className="mt-4 text-sm font-semibold text-stone">
              2.2 Technical and usage data (analytics)
            </h3>
            <p className="mt-1">
              When you visit the Website, we use a privacy-friendly analytics
              setup to collect basic usage information, such as:
            </p>
            <ul className="mt-2 list-disc pl-5">
              <li>IP address (short-term, often pseudonymised for analytics)</li>
              <li>Browser type and version</li>
              <li>Operating system and device type</li>
              <li>Screen resolution</li>
              <li>Language settings</li>
              <li>Pages visited, time of visit and referrer URL</li>
            </ul>
            <p className="mt-2">
              We use this to understand how the Website is used, to maintain
              security and performance, and to improve the user experience. We
              do not use this data for advertising or to build marketing
              profiles.
            </p>

            <h3 className="mt-4 text-sm font-semibold text-stone">
              2.3 System logs and security signals
            </h3>
            <p className="mt-1">
              Our hosting environment and security tooling may log:
            </p>
            <ul className="mt-2 list-disc pl-5">
              <li>Requests to our servers</li>
              <li>IP address and basic request metadata</li>
              <li>Error messages and performance data</li>
            </ul>
            <p className="mt-2">
              This is used to monitor uptime, detect abuse or attack patterns and
              maintain the integrity of the Website.
            </p>

            <h3 className="mt-4 text-sm font-semibold text-stone">
              2.4 Contact form enrichment (geo / device metadata)
            </h3>
            <p className="mt-1">
              When you open or submit the contact form, we may enrich the
              submission with technical context, for example:
            </p>
            <ul className="mt-2 list-disc pl-5">
              <li>Approximated country or city (derived from IP) at the time of submission</li>
              <li>Browser and device type</li>
              <li>Referrer URL</li>
              <li>Timestamp</li>
            </ul>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-stone">
              3. Legal bases for processing
            </h2>
            <p className="mt-2">
              We process personal data on the following legal bases under the
              GDPR:
            </p>
            <ul className="mt-2 list-disc pl-5">
              <li>
                <strong>Legitimate interests</strong> (Art. 6(1)(f) GDPR):
                operating, securing and improving the Website; understanding
                aggregated usage; preventing abuse and fraud.
              </li>
              <li>
                <strong>Pre-contractual steps and legitimate interests</strong>{" "}
                (Art. 6(1)(b) and (f) GDPR): responding to contact requests and
                exploring potential partnerships or collaborations.
              </li>
              <li>
                <strong>Consent</strong> (Art. 6(1)(a) GDPR): where required by
                law for certain analytics or cookies, we will rely on your
                consent and update the cookie banner accordingly.
              </li>
            </ul>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-stone">
              4. How we use your data
            </h2>
            <p className="mt-2">
              We may use the information described above to:
            </p>
            <ul className="mt-2 list-disc pl-5">
              <li>Respond to your messages and contact requests</li>
              <li>
                Manage and document potential partnerships, collaborations or
                stakeholder contacts
              </li>
              <li>
                Maintain and improve the stability, security and performance of
                the Website
              </li>
              <li>Analyse aggregated Website usage (e.g. visits, page views)</li>
              <li>
                Monitor whether our communications and content are reaching
                relevant audiences
              </li>
              <li>
                Satisfy legal, regulatory or audit requirements where applicable
              </li>
            </ul>
            <p className="mt-2">
              We do not sell personal data and we do not use Website data for
              targeted advertising.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-stone">
              5. Retention periods
            </h2>
            <p className="mt-2">
              We retain personal data only for as long as necessary for the
              purposes described above, for example:
            </p>
            <ul className="mt-2 list-disc pl-5">
              <li>
                Contact form submissions: retained for a reasonable period to
                manage follow-up and relationship history; may be archived longer
                where needed for legal or compliance reasons.
              </li>
              <li>
                Analytics data: aggregated and pseudonymised, retained only as
                long as necessary for trend analysis and service improvement.
              </li>
              <li>
                System logs: retained for a limited period necessary to monitor
                security, diagnose problems and comply with legal obligations.
              </li>
            </ul>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-stone">
              6. Sharing and transfers
            </h2>
            <p className="mt-2">
              For the Website, we use a small number of service providers for
              hosting, analytics, secure handling of contact submissions and
              internal notifications. These providers act under our instructions
              and, where required, are bound by data processing agreements.
            </p>
            <p className="mt-2">
              Because our infrastructure and service providers may be located in
              multiple jurisdictions, including outside the EU/EEA, personal
              data may be transferred internationally. Where such transfers
              involve a country without an EU adequacy decision, we rely on
              appropriate safeguards such as standard contractual clauses, as
              permitted by law.
            </p>
            <p className="mt-2">
              We may also share data where required by law with competent
              authorities or regulators, or with professional advisers under
              confidentiality obligations. We do not share Website data with
              third parties for their own marketing purposes.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-stone">
              7. Your rights
            </h2>
            <p className="mt-2">
              Depending on your location and applicable law, you may have the
              following rights regarding your personal data:
            </p>
            <ul className="mt-2 list-disc pl-5">
              <li>Right of access</li>
              <li>Right to rectification</li>
              <li>Right to erasure ("right to be forgotten")</li>
              <li>Right to restriction of processing</li>
              <li>Right to data portability</li>
              <li>
                Right to object to processing based on legitimate interests,
                including analytics
              </li>
              <li>
                Right to withdraw consent where processing is based on consent
              </li>
            </ul>
            <p className="mt-2">
              To exercise your rights, contact us at{" "}
              <a
                href="mailto:privacy@fairways.tech"
                className="text-forest underline underline-offset-4"
              >
                privacy@fairways.tech
              </a>{" "}
              and clearly specify your request. We may need to verify your
              identity before acting on it.
            </p>
            <p className="mt-2">
              You also have the right to lodge a complaint with a supervisory
              authority, in particular in the EU Member State of your habitual
              residence, place of work or place of the alleged infringement.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-stone">8. Children</h2>
            <p className="mt-2">
              The Website is not directed at children and is intended for adult
              professional audiences. We do not knowingly collect personal data
              from children via the Website.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-stone">
              9. Changes to this Policy
            </h2>
            <p className="mt-2">
              We may update this Privacy Policy to reflect changes in our
              Website, our business or applicable laws. The "Last updated" date
              will be revised accordingly. We encourage you to review this
              Policy periodically.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-stone">10. Contact</h2>
            <p className="mt-2">
              For questions about this Policy or to exercise your data
              protection rights, please contact:
            </p>
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

