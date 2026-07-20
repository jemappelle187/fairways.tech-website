import type { Metadata } from "next";
import {
  LEGAL_CONFIG,
  LEGAL_MAILTO_PRIVACY,
  LEGAL_PAGES_LAST_UPDATED,
} from "@/config/legal";
import { buildPageMetadata } from "../../lib/seo";
import { Header, Footer } from "../components/SiteChrome";
import { LegalEntityBlock } from "../components/LegalEntityBlock";
import { LegalPageTemplate, LegalSection, legalPageLinkClass } from "../components/legal";

const COOKIES_TOC = [
  { id: "purpose", label: "1. Purpose" },
  { id: "technologies", label: "2. Technologies" },
  { id: "categories", label: "3. Categories" },
  { id: "consent", label: "4. Consent" },
  { id: "browser", label: "5. Browser settings" },
  { id: "updates", label: "6. Updates" },
  { id: "contact", label: "7. Contact" },
];

export const metadata: Metadata = buildPageMetadata({
  title: "Cookie Policy",
  description:
    "How the Fairways.Tech website uses cookies and local storage in a proportionate, non-advertising manner.",
  path: "/cookies",
  ogTitle: "Cookie Policy | Fairways.Tech",
});

export default function CookiesPage() {
  return (
    <>
      <Header />
      <LegalPageTemplate
        title="Cookie Policy"
        lastUpdated={LEGAL_PAGES_LAST_UPDATED}
        intro="This Policy describes the cookies and storage technologies used on www.fairways.tech, the purposes of such use, and the choices you have. We do not use advertising cookies, cross-site tracking pixels, or profiling for marketing."
        showToc
        tocItems={COOKIES_TOC}
      >
        <div className="space-y-0">
          <LegalSection id="purpose" title="1. Purpose of this Policy" isFirst>
            <p>
              This Cookie Policy applies to www.fairways.tech, operated by{" "}
              {LEGAL_CONFIG.netherlandsEntityName} (KvK{" "}
              {LEGAL_CONFIG.netherlandsRegistrationNumber},{" "}
              {LEGAL_CONFIG.netherlandsJurisdiction}) and{" "}
              {LEGAL_CONFIG.ghanaEntityName} (Ghana company registration number{" "}
              {LEGAL_CONFIG.ghanaRegistrationNumber}, registered address:{" "}
              {LEGAL_CONFIG.ghanaRegisteredAddress}), together trading as &quot;
              {LEGAL_CONFIG.tradingName}&quot;. It describes the types of cookies and
              storage we use, why we use them, and the options available to
              visitors. The Website is intended to work with a small set of
              client-side tools: where we use storage, it supports security, basic
              operation, and aggregated analytics, not third-party advertising
              networks.
            </p>
          </LegalSection>

          <LegalSection id="technologies" title="2. What technologies we use">
            <p>The Website may use:</p>
            <ul className="ml-5 list-disc space-y-2">
              <li>
                <strong>Functional cookies</strong> — to support basic operation
                (for example, remembering a cookie choice you have made).
              </li>
              <li>
                <strong>Local storage</strong> — to hold preferences and support
                stability (for example, distinguishing a first visit from a return
                visit for performance or security review).
              </li>
              <li>
                <strong>Aggregated, privacy-oriented analytics</strong> — to
                understand overall traffic and performance, without building
                individual marketing profiles and without tracking you across
                unrelated sites.
              </li>
            </ul>
            <p>
              We do <strong>not</strong> use fingerprinting, cross‑site advertising
              cookies, or behavioural ad profiling for marketing. We do not sell
              analytics data to advertisers.
            </p>
            <p>
              For more detail on personal data, see the{" "}
              <a href="/privacy" className={legalPageLinkClass}>
                Privacy Policy
              </a>
              .
            </p>
          </LegalSection>

          <LegalSection
            id="categories"
            title="3. Categories of cookies and storage"
          >
            <h3 className="text-base font-semibold text-stone sm:text-lg">
              3.1 Strictly necessary / functional
            </h3>
            <p>These are used so the site can function securely, including:</p>
            <ul className="ml-5 list-disc space-y-1">
              <li>Recording your cookie banner choice</li>
              <li>Correct load behaviour and avoiding repeated unnecessary prompts</li>
              <li>Basic fraud prevention and request integrity where applicable</li>
            </ul>
            <h3 className="mt-6 text-base font-semibold text-stone sm:text-lg">
              3.2 Performance and analytics (non-advertising)
            </h3>
            <p>
              We use analytics only in aggregate form, for example to review page
              load times, general navigation, and high-level referrer information.
              We may also send a minimal internal visit notification to support
              reliability monitoring and follow-up on Website usage. These metrics
              are not used to show targeted ads to you on other sites and are not
              resold. They support reliable operation, monitoring, and improvement
              of the Website.
            </p>
            <h3 className="mt-6 text-base font-semibold text-stone sm:text-lg">
              3.3 Behavioural insights (Microsoft Clarity)
            </h3>
            <p>
              We use Microsoft Clarity to understand how visitors interact with the
              Website (for example anonymised session replays, heatmaps, and
              frustration signals such as repeated clicks). Clarity is used for
              product and UX improvement only, not for advertising. We configure
              Clarity in cookieless mode where available so it does not rely on
              Clarity cookies. Sensitive form fields are masked by default in
              Clarity&apos;s privacy settings.
            </p>
          </LegalSection>

          <LegalSection id="consent" title="4. How we use consent">
            <p>
              When you first visit, you will see a cookie notice that explains our
              use of storage. Where required, you can choose to allow only what is
              needed for the site to work, or to allow optional analytics (such as
              Umami or Google Analytics) in line with applicable ePrivacy and GDPR
              requirements.
            </p>
            <p>
              Strictly necessary / functional storage may load as needed for the
              site to function. Internal visit monitoring and Microsoft Clarity
              behavioural insights may load as part of site operation and
              improvement. Optional analytics tools that require consent are loaded
              only in line with your choice and the law that applies in your
              situation.
            </p>
            <p>
              For more information about your rights, see the{" "}
              <a href="/privacy" className={legalPageLinkClass}>
                Privacy Policy
              </a>
              .
            </p>
          </LegalSection>

          <LegalSection
            id="browser"
            title="5. Managing cookies via your browser"
          >
            <p>
              You can view, delete, or block cookies and similar data through your
              browser. Typical options include:
            </p>
            <ul className="ml-5 list-disc space-y-1">
              <li>Viewing stored cookies for a site</li>
              <li>Deleting cookies when you close the browser</li>
              <li>Blocking cookies from selected sites or all sites</li>
            </ul>
            <p>
              Blocking all cookies can affect how the site works. Because we do not
              rely on large advertising or tracking stacks, the impact is often
              limited, but you may lose preferences or have to confirm choices
              again.
            </p>
          </LegalSection>

          <LegalSection id="updates" title="6. Policy updates">
            <p>
              We may update this Policy to reflect new technologies, legal
              requirements, or changes to the Website. If we make a material
              change, we will use the Website (for example the banner or a clear
              notice on the page) to inform you in line with applicable law.
            </p>
          </LegalSection>

          <LegalSection id="contact" title="7. Contact">
            <p>Questions about this Policy:</p>
            <p>
              Email:{" "}
              <a href={LEGAL_MAILTO_PRIVACY} className={legalPageLinkClass}>
                {LEGAL_CONFIG.privacyEmail}
              </a>
            </p>
          </LegalSection>
        </div>
        <LegalEntityBlock />
      </LegalPageTemplate>
      <Footer />
    </>
  );
}
