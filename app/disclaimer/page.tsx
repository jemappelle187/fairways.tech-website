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
          <section>
            <h2 className="text-lg font-semibold text-stone">
              1. Informational purpose only
            </h2>
            <p className="mt-2">
              The website <strong>www.fairways.tech</strong> (the &quot;Website&quot;) is
              operated by Fairways.Tech B.V. (Netherlands) and Fairways.Tech Ltd
              (Ghana) (&quot;Fairways.Tech&quot;, &quot;we&quot;, &quot;us&quot;).
            </p>
            <p className="mt-2">
              All content on this Website is provided solely for general
              information purposes. It is not intended to provide financial,
              investment, legal, tax, regulatory or technical advice, and should
              not be relied upon as such.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-stone">
              2. No offer, solicitation, or commitment
            </h2>
            <p className="mt-2">
              Nothing on this Website shall be construed as:
            </p>
            <ul className="mt-2 list-disc pl-5">
              <li>
                An offer or invitation to buy, sell or subscribe for any
                financial product or service
              </li>
              <li>
                A commitment by Fairways.Tech or any partner to enter into a
                contract
              </li>
              <li>
                A guarantee that any described model, product or partnership
                will be launched, licensed or available in a particular
                jurisdiction
              </li>
            </ul>
            <p className="mt-2">
              Any future services are subject to regulatory approvals, commercial
              agreements and internal governance decisions.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-stone">
              3. Forward-looking statements
            </h2>
            <p className="mt-2">
              The Website may include statements about future plans, roadmaps,
              growth ambitions, markets or farmer numbers. These are
              forward-looking statements based on assumptions and information
              available at the time of writing. Actual results may differ
              materially due to factors such as:
            </p>
            <ul className="mt-2 list-disc pl-5">
              <li>Market developments</li>
              <li>Regulatory changes</li>
              <li>Operational, technological or partner constraints</li>
            </ul>
            <p className="mt-2">
              Fairways.Tech has no obligation to update or revise any
              forward-looking statements.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-stone">
              4. No guarantee of availability
            </h2>
            <p className="mt-2">
              We do not guarantee that the Website or any content on it will be:
            </p>
            <ul className="mt-2 list-disc pl-5">
              <li>Available at all times</li>
              <li>Complete, current or error-free</li>
              <li>
                Implemented in the form, timeline or jurisdictions described
              </li>
            </ul>
            <p className="mt-2">
              We may modify, suspend or discontinue any part of the Website at
              any time, without prior notice.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-stone">
              5. External links
            </h2>
            <p className="mt-2">
              The Website may contain links to third-party websites. These links
              are provided for convenience only. We do not endorse or control
              those websites and are not responsible for their content, security
              or data handling. Your use of third-party sites is at your own
              risk.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-stone">
              6. Limitation of liability
            </h2>
            <p className="mt-2">
              To the fullest extent permitted by law, Fairways.Tech shall not be
              liable for any indirect, consequential, incidental, special or
              punitive damages, or any loss of profit, data, business or
              opportunity arising from or in connection with your use of, or
              reliance on, the Website or its content.
            </p>
            <p className="mt-2">
              Nothing in this Disclaimer excludes or limits any liability that
              cannot be excluded or limited under applicable law.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-stone">7. Contact</h2>
            <p className="mt-2">
              If you have any questions about this Disclaimer, please contact:
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

