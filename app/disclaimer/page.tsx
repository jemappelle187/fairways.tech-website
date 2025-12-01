// app/disclaimer/page.tsx

export default function DisclaimerPage() {
  return (
    <main className="bg-sand min-h-screen py-16">
      <div className="mx-auto max-w-3xl px-6 lg:px-8">
        <h1 className="text-3xl font-semibold text-stone sm:text-4xl">
          Website Disclaimer
        </h1>
        <p className="mt-2 text-sm text-slate-500">
          Last updated: 27 November 2025
        </p>

        <div className="mt-10 space-y-6 text-sm leading-relaxed text-slate-800">

          {/* 1. Informational Purpose */}
          <section>
            <h2 className="text-lg font-semibold text-stone">
              1. Informational Purpose Only
            </h2>
            <p className="mt-2">
              The website <strong>www.fairways.tech</strong> (the “Website”) is operated by
              Fairways.Tech B.V. (Netherlands) and Fairways.Tech Ltd (Ghana)
              (“Fairways.Tech”, “we”, “us”).
            </p>
            <p className="mt-2">
              All content on this Website is provided for general informational
              purposes only. Nothing on this Website constitutes financial,
              investment, legal, tax, compliance, engineering, or other
              professional advice. You should not rely on any information on this
              Website as a substitute for professional guidance.
            </p>
          </section>

          {/* 2. No Offer / Solicitation */}
          <section>
            <h2 className="text-lg font-semibold text-stone">
              2. No Offer, Solicitation, or Commitment
            </h2>
            <p className="mt-2">
              The Website does not constitute and shall not be interpreted as:
            </p>
            <ul className="mt-2 list-disc pl-5">
              <li>An offer to sell or solicitation to buy any financial product or service</li>
              <li>A commitment by Fairways.Tech or any partner to enter into any agreement</li>
              <li>
                A guarantee that any described model, technology, process, or
                partnership will be launched, licensed, implemented, or made
                available in any jurisdiction
              </li>
            </ul>
            <p className="mt-2">
              All future services are subject to regulatory approvals, partner
              agreements, compliance assessments, market conditions, and internal
              governance.
            </p>
          </section>

          {/* 3. Forward-Looking Statements */}
          <section>
            <h2 className="text-lg font-semibold text-stone">
              3. Forward-Looking Statements
            </h2>
            <p className="mt-2">
              Certain statements on this Website may describe anticipated
              developments, future functionality, growth plans, operational
              forecasts, or expected farmer and market engagement. These are
              forward‑looking statements that inherently involve risks and
              uncertainties.
            </p>
            <p className="mt-2">Actual outcomes may differ materially due to factors such as:</p>
            <ul className="mt-2 list-disc pl-5">
              <li>Changes in regulation or supervisory guidance</li>
              <li>Financial sector requirements</li>
              <li>Market, operational, or technological constraints</li>
              <li>Partner dependencies and external conditions</li>
            </ul>
            <p className="mt-2">
              Fairways.Tech is under no obligation to update or revise
              forward‑looking statements unless required to do so by law.
            </p>
          </section>

          {/* 4. No Guarantee of Accuracy or Availability */}
          <section>
            <h2 className="text-lg font-semibold text-stone">
              4. No Guarantee of Accuracy or Availability
            </h2>
            <p className="mt-2">
              While we aim to keep the Website accurate and up to date, we make
              no representations or warranties, express or implied, regarding the:
            </p>
            <ul className="mt-2 list-disc pl-5">
              <li>Accuracy, completeness, or timeliness of the content</li>
              <li>Availability or uninterrupted functioning of the Website</li>
              <li>
                Implementation of any feature, product, process, or partnership
                in the form or timeline described
              </li>
            </ul>
            <p className="mt-2">
              We may modify, update, or remove Website content at any time without
              notice.
            </p>
          </section>

          {/* 5. External Links */}
          <section>
            <h2 className="text-lg font-semibold text-stone">
              5. External Links
            </h2>
            <p className="mt-2">
              The Website may include links to external third‑party websites or
              resources. Such links are provided solely for convenience. We do not
              endorse, control, or guarantee the accuracy, security, or practices
              of these third‑party sites. Accessing them is at your own risk.
            </p>
          </section>

          {/* 6. Limitation of Liability */}
          <section>
            <h2 className="text-lg font-semibold text-stone">
              6. Limitation of Liability
            </h2>
            <p className="mt-2">
              To the fullest extent permitted under applicable law, Fairways.Tech
              shall not be liable for any direct or indirect damages arising from
              or related to:
            </p>
            <ul className="mt-2 list-disc pl-5">
              <li>Your use of or inability to use the Website</li>
              <li>Reliance on any information provided on the Website</li>
              <li>Errors, omissions, or interruptions in the Website’s operation</li>
              <li>Any third‑party content or external links</li>
            </ul>
            <p className="mt-2">
              Nothing in this Disclaimer limits liability that cannot be limited
              under Dutch, Ghanaian, or other applicable law.
            </p>
          </section>

          {/* 7. Contact */}
          <section>
            <h2 className="text-lg font-semibold text-stone">7. Contact</h2>
            <p className="mt-2">
              For questions regarding this Disclaimer, please contact:
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

