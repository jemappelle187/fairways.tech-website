// app/terms/page.tsx

export default function TermsPage() {
  return (
    <main className="bg-sand min-h-screen py-16">
      <div className="mx-auto max-w-3xl px-6 lg:px-8">
        <h1 className="text-3xl font-semibold text-stone sm:text-4xl">
          Website Terms &amp; Conditions
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
              These Website Terms &amp; Conditions (&quot;Terms&quot;) apply to your use
              of the website <strong>www.fairways.tech</strong> (the &quot;Website&quot;).
            </p>
            <p className="mt-2">
              The Website is operated by:
            </p>
            <ul className="mt-2 list-disc pl-5">
              <li>Fairways.Tech B.V. (Netherlands)</li>
              <li>Fairways.Tech Ltd (Ghana)</li>
            </ul>
            <p className="mt-2">
              Together referred to as &quot;Fairways.Tech&quot;, &quot;we&quot;, &quot;us&quot; or &quot;our&quot;.
              The Website is a corporate / informational site. It does not
              provide account opening, loan applications, or any regulated
              financial services directly.
            </p>
            <p className="mt-2">
              By using this Website, you agree to these Terms. If you do not
              agree, please do not use the Website.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-stone">
              2. Who may use this Website
            </h2>
            <p className="mt-2">
              You may use the Website only:
            </p>
            <ul className="mt-2 list-disc pl-5">
              <li>For lawful purposes</li>
              <li>For your own business or personal use</li>
              <li>In accordance with these Terms and applicable laws</li>
            </ul>
            <p className="mt-2">
              You must not:
            </p>
            <ul className="mt-2 list-disc pl-5">
              <li>
                Attempt to gain unauthorised access to the Website, its
                infrastructure, or any data
              </li>
              <li>
                Use the Website in a way that could damage, disable, overburden
                or impair it
              </li>
              <li>
                Introduce malware, malicious code or other harmful material
              </li>
              <li>
                Use the Website to send unsolicited or unlawful communications
              </li>
            </ul>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-stone">
              3. No financial, legal or investment advice
            </h2>
            <p className="mt-2">
              All information on this Website is for general information only.
              It does not:
            </p>
            <ul className="mt-2 list-disc pl-5">
              <li>
                Constitute financial, legal, investment, tax or regulatory advice
              </li>
              <li>
                Create any client, advisory, or fiduciary relationship
              </li>
              <li>
                Represent an offer or solicitation to provide financial services,
                credit or investment products
              </li>
            </ul>
            <p className="mt-2">
              Any decision you make based on information from this Website is
              your own responsibility. You should obtain independent professional
              advice before acting on any information.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-stone">
              4. Information on the Website
            </h2>
            <p className="mt-2">
              We aim to keep the content accurate and up to date, but:
            </p>
            <ul className="mt-2 list-disc pl-5">
              <li>
                Information may become outdated, incomplete or inaccurate over time
              </li>
              <li>We may update, remove or change content without prior notice</li>
              <li>
                We do not guarantee that the Website, or any content on it, will
                always be available or error-free
              </li>
            </ul>
            <p className="mt-2">
              To the extent permitted by law, we do not accept liability for any
              loss or damage arising from your use of, or reliance on, the
              information on this Website.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-stone">
              5. Intellectual property
            </h2>
            <p className="mt-2">
              Unless stated otherwise, all content on this Website is owned by
              or licensed to Fairways.Tech, including:
            </p>
            <ul className="mt-2 list-disc pl-5">
              <li>Text, copy and page layouts</li>
              <li>Logos, trademarks and branding</li>
              <li>Images, graphics and illustrations</li>
              <li>Design, look &amp; feel, and underlying code</li>
            </ul>
            <p className="mt-2">
              You may view the Website in your browser and print or download
              extracts for your own non-commercial use.
            </p>
            <p className="mt-2">
              You may not copy, reproduce, distribute or adapt content for
              commercial purposes without our prior written consent, nor remove
              or obscure copyright, trademark or other proprietary notices.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-stone">
              6. Third-party links
            </h2>
            <p className="mt-2">
              The Website may contain links to third-party websites or resources.
              These links are provided for convenience only. We do not control,
              endorse or take responsibility for their content or practices. Your
              use of third-party sites is at your own risk and subject to their
              terms and policies.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-stone">
              7. Privacy &amp; cookies
            </h2>
            <p className="mt-2">
              Our use of personal data and tracking technologies is described in
              our{" "}
              <a
                href="/privacy"
                className="text-forest underline underline-offset-4"
              >
                Privacy Policy
              </a>{" "}
              and{" "}
              <a
                href="/cookies"
                className="text-forest underline underline-offset-4"
              >
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
              To the maximum extent permitted by applicable law, we are not
              liable for any indirect, consequential, punitive, incidental or
              special loss or damage, including loss of profit, data or business
              opportunities arising from or related to your use of the Website.
            </p>
            <p className="mt-2">
              Where liability cannot be excluded entirely, our total aggregate
              liability shall be limited to a reasonable amount proportional to
              your use of the Website as an informational resource.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-stone">
              9. Changes to these Terms
            </h2>
            <p className="mt-2">
              We may update these Terms from time to time to reflect changes in
              our business, technology or legal requirements. The &quot;Last updated&quot;
              date will be revised accordingly. By continuing to use the Website
              after changes take effect, you accept the updated Terms.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-stone">
              10. Governing law &amp; jurisdiction
            </h2>
            <p className="mt-2">
              These Terms and your use of the Website are governed by the laws
              of the Netherlands, without regard to conflict of laws rules.
            </p>
            <p className="mt-2">
              Any disputes arising out of or in connection with the Website or
              these Terms shall be subject to the exclusive jurisdiction of the
              competent courts in the Netherlands, without prejudice to any
              mandatory rights you may have under applicable law.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-stone">11. Contact</h2>
            <p className="mt-2">
              For questions about these Terms, please contact:
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

