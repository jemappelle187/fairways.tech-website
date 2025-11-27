// app/cookies/page.tsx

export default function CookiesPage() {
  return (
    <main className="bg-sand min-h-screen py-16">
      <div className="mx-auto max-w-3xl px-6 lg:px-8">
        <h1 className="text-3xl font-semibold text-stone sm:text-4xl">
          Cookie &amp; Local Storage Policy
        </h1>
        <p className="mt-2 text-sm text-slate-500">
          Last updated: 27 November 2025
        </p>

        <div className="mt-10 space-y-6 text-sm leading-relaxed text-slate-800">
          <section>
            <h2 className="text-lg font-semibold text-stone">
              1. What this Policy covers
            </h2>
            <p className="mt-2">
              This Cookie &amp; Local Storage Policy explains how Fairways.Tech
              B.V. and Fairways.Tech Ltd (&quot;Fairways.Tech&quot;, &quot;we&quot;, &quot;us&quot;) use
              cookies and similar technologies on{" "}
              <strong>www.fairways.tech</strong> (the &quot;Website&quot;).
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-stone">
              2. What are cookies and similar technologies?
            </h2>
            <p className="mt-2">
              Cookies are small text files stored on your device when you visit
              a website. Local storage and session storage are browser features
              that store data on your device. Pixels and scripts can collect
              technical information about your visit.
            </p>
            <p className="mt-2">
              We use a limited set of these technologies to operate and improve
              the Website. We do not use advertising or retargeting cookies.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-stone">
              3. What we use on fairways.tech
            </h2>
            <p className="mt-2">
              The Website currently uses:
            </p>
            <ul className="mt-2 list-disc pl-5">
              <li>
                <strong>Local storage keys</strong> set by us, for example:
                remembering that you closed or accepted the cookie banner, and a
                one-time visit marker.
              </li>
              <li>
                <strong>Privacy-friendly analytics</strong> to understand
                aggregated Website usage (e.g. page views, referrers, device
                types).
              </li>
            </ul>
            <p className="mt-2">
              We do not place third-party advertising cookies and we do not use
              Website tracking data to build marketing profiles across other
              sites.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-stone">
              4. Categories of cookies and storage
            </h2>

            <h3 className="mt-3 text-sm font-semibold text-stone">
              4.1 Strictly necessary / functional
            </h3>
            <p className="mt-1">
              These are required for basic operation of the Website, for example:
            </p>
            <ul className="mt-2 list-disc pl-5">
              <li>
                Remembering that you have seen or accepted the cookie banner
              </li>
              <li>Ensuring basic security and load management</li>
            </ul>

            <h3 className="mt-4 text-sm font-semibold text-stone">
              4.2 Analytics / performance (non-advertising)
            </h3>
            <p className="mt-1">
              We use analytics to understand how the Website is used, which pages
              are visited and how visitors arrive at the site. This helps us
              improve stability, security and content.
            </p>
            <p className="mt-2">
              Data is used in aggregated form. We do not use analytics to serve
              targeted ads or track you across other websites.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-stone">
              5. Cookie banner and consent
            </h2>
            <p className="mt-2">
              When you first visit the Website, a cookie banner informs you that
              we use cookies and similar technologies and links to this Policy
              for more details.
            </p>
            <p className="mt-2">
              We are in the process of improving the banner so that, where
              required by law, you can choose to accept or decline certain
              categories of cookies and your choices will be stored and
              respected. Until those improvements are fully deployed, we use our
              analytics and local storage only for operating, securing and
              improving the Website.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-stone">
              6. Managing cookies in your browser
            </h2>
            <p className="mt-2">
              You can manage or delete cookies through your browser settings.
              Most browsers allow you to:
            </p>
            <ul className="mt-2 list-disc pl-5">
              <li>View which cookies are stored</li>
              <li>Delete specific cookies</li>
              <li>Block cookies from certain sites or all sites</li>
              <li>Receive a warning before cookies are stored</li>
            </ul>
            <p className="mt-2">
              Please note that blocking all cookies may affect your ability to
              use some features of this Website or others.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-stone">
              7. Changes to this Policy
            </h2>
            <p className="mt-2">
              We may update this Cookie &amp; Local Storage Policy if we change
              the technologies we use, introduce new analytics or security
              tools, or if legal requirements change. The &quot;Last updated&quot; date
              will be revised accordingly. Where required, we will present an
              updated cookie banner.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-stone">8. Contact</h2>
            <p className="mt-2">
              If you have any questions about our use of cookies or similar
              technologies, please contact:
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

