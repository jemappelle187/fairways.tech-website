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

const PRIVACY_TOC = [
  { id: "who-we-are", label: "1. Who we are" },
  { id: "data-we-collect", label: "2. Personal data we collect" },
  { id: "legal-bases", label: "3. Legal bases" },
  { id: "how-we-use", label: "4. How we use data" },
  { id: "retention", label: "5. Retention" },
  { id: "sharing", label: "6. Sharing" },
  { id: "rights", label: "7. Your rights" },
  { id: "children", label: "8. Children" },
  { id: "changes", label: "9. Changes" },
  { id: "contact", label: "10. Contact" },
];

export const metadata: Metadata = buildPageMetadata({
  title: "Privacy Policy",
  description:
    "How Fairways.Tech processes personal data when you use www.fairways.tech or the contact form. GDPR where applicable.",
  path: "/privacy",
  ogTitle: "Privacy Policy | Fairways.Tech",
});

export default function PrivacyPage() {
  return (
    <>
      <Header />
      <LegalPageTemplate
        title="Privacy Policy"
        lastUpdated={LEGAL_PAGES_LAST_UPDATED}
        showToc
        tocItems={PRIVACY_TOC}
      >
        <div className="space-y-0">
          <LegalSection id="who-we-are" title="1. Who we are" isFirst>
            <p>
              This Privacy Policy explains how {LEGAL_CONFIG.netherlandsEntityName}{" "}
              (KvK {LEGAL_CONFIG.netherlandsRegistrationNumber},{" "}
              {LEGAL_CONFIG.netherlandsJurisdiction}), as{" "}
              <strong>data controller for this Website</strong>, processes personal
              data when you visit <strong>www.fairways.tech</strong> (the
              &quot;Website&quot;) or submit information through the Website contact
              form.
            </p>
            <p>
              {LEGAL_CONFIG.ghanaEntityName} (Ghana company registration number{" "}
              {LEGAL_CONFIG.ghanaRegistrationNumber}, registered address:{" "}
              {LEGAL_CONFIG.ghanaRegisteredAddress}) is part of the{" "}
              {LEGAL_CONFIG.tradingName} operating structure but is{" "}
              <strong>not</strong> the data controller for this Website unless
              expressly stated otherwise.
            </p>
            <p>
              Unless we state otherwise in this Policy, &quot;we&quot;, &quot;us&quot;
              and &quot;our&quot; refer to {LEGAL_CONFIG.netherlandsEntityName} in its
              capacity as data controller for this Website.
            </p>
            <div className="mt-4 space-y-1 text-sm text-slate-800">
              <p className="font-medium text-slate-900">
                For visitors in the EU/EEA, the data controller for this Website is:
              </p>
              <p className="font-semibold text-slate-900">
                {LEGAL_CONFIG.netherlandsEntityName}
              </p>
              <p>
                KvK: <strong>{LEGAL_CONFIG.netherlandsRegistrationNumber}</strong>
              </p>
              <p>{LEGAL_CONFIG.netherlandsJurisdiction}</p>
              <p>
                Email:{" "}
                <a
                  href={LEGAL_MAILTO_PRIVACY}
                  className={legalPageLinkClass}
                >
                  {LEGAL_CONFIG.privacyEmail}
                </a>
              </p>
            </div>
            <p className="mt-4">
              Where Website-related processing involves {LEGAL_CONFIG.ghanaEntityName}{" "}
              or other partners outside the EU/EEA, we apply appropriate safeguards.
            </p>
            <p>
              All Website processing is governed by the{" "}
              <strong>EU General Data Protection Regulation (GDPR)</strong> where
              applicable. Where processing involves partners or service providers
              outside the EU/EEA, we apply appropriate safeguards to ensure a
              suitable level of protection.
            </p>
          </LegalSection>

          <LegalSection
            id="data-we-collect"
            title="2. Personal data we collect"
          >
            <p>
              The Website collects only limited, non‑sensitive personal data. We do
              not process on this Website: biometric identifiers, identity documents,
              selfies, liveness checks, financial profiles, or regulated onboarding
              data.
            </p>
            <p>
              {LEGAL_CONFIG.tradingName}&apos;s <strong>mobile application</strong>,
              used by farmers, agents and field partners, processes additional
              categories of personal data, including biometrics, national identity
              numbers (e.g., Ghana Card), GPS-based farm mapping, and production or
              repayment data. That processing is covered by product‑level privacy
              notices, contracts with cooperatives and institutions, and applicable
              compliance requirements, and is not part of this Website Privacy
              Policy.
            </p>
            <h3 className="text-base font-semibold text-stone sm:text-lg">
              2.1 Information you provide via the Website contact form
            </h3>
            <p>When you contact us, we collect the information you provide:</p>
            <ul className="ml-5 list-disc space-y-1">
              <li>First name and last name</li>
              <li>Company or organisation</li>
              <li>Email address</li>
              <li>Phone number (with country code)</li>
              <li>Country</li>
              <li>Your message or inquiry</li>
            </ul>
            <p>
              The Website does not perform identity verification, biometric capture,
              or any regulated onboarding. Those processes, where they apply, occur
              in the {LEGAL_CONFIG.tradingName} mobile application and are described
              in separate notices and agreements.
            </p>
            <h3 className="mt-6 text-base font-semibold text-stone sm:text-lg">
              2.2 Technical and usage data (analytics)
            </h3>
            <p>
              To understand how the Website is used and to support security and
              performance, we may collect limited technical data such as:
            </p>
            <ul className="ml-5 list-disc space-y-1">
              <li>IP address (stored only briefly in minimised form)</li>
              <li>Browser, operating system and device type</li>
              <li>Screen size and language settings</li>
              <li>Pages visited, visit duration and referrer URL</li>
              <li>Aggregate usage trends</li>
              <li>
                Interaction patterns via Microsoft Clarity (session replays and
                heatmaps), with sensitive inputs masked
              </li>
            </ul>
            <p>
              We do <strong>not</strong> use this information for advertising,
              profiling, or commercial resale.
            </p>
            <h3 className="mt-6 text-base font-semibold text-stone sm:text-lg">
              2.3 System logs and security events
            </h3>
            <p>Our hosting environment may automatically record:</p>
            <ul className="ml-5 list-disc space-y-1">
              <li>Requests to our servers</li>
              <li>Error messages and performance diagnostics</li>
              <li>IP address and basic request metadata</li>
            </ul>
            <p>These records support uptime, abuse detection, and site security.</p>
            <h3 className="mt-6 text-base font-semibold text-stone sm:text-lg">
              2.4 Technical context added to contact submissions
            </h3>
            <p>When you open or submit the contact form, we may add:</p>
            <ul className="ml-5 list-disc space-y-1">
              <li>Approximate country or city (IP-derived)</li>
              <li>Browser and device information</li>
              <li>Referrer URL</li>
              <li>Timestamp of submission</li>
            </ul>
            <p>This context helps us respond to your request.</p>
          </LegalSection>

          <LegalSection id="legal-bases" title="3. Legal bases for processing">
            <p>We process personal data under the following GDPR bases:</p>
            <ul className="ml-5 list-disc space-y-2">
              <li>
                <strong>Legitimate interests (Art. 6(1)(f))</strong> — operating,
                securing and improving the Website; performing analytics; preventing
                fraud and misuse.
              </li>
              <li>
                <strong>Pre-contractual steps (Art. 6(1)(b))</strong> — responding
                to contact requests and exploring potential partnerships.
              </li>
              <li>
                <strong>Consent (Art. 6(1)(a))</strong> — where required for certain
                analytics or cookies, as set out in the{" "}
                <a href="/cookies" className={legalPageLinkClass}>
                  Cookie Policy
                </a>
                .
              </li>
            </ul>
          </LegalSection>

          <LegalSection id="how-we-use" title="4. How we use personal data">
            <p>We may use personal data to:</p>
            <ul className="ml-5 list-disc space-y-1">
              <li>Respond to your inquiries and manage follow-up</li>
              <li>Assess or initiate collaborations and partnerships</li>
              <li>Support Website stability, reliability and performance</li>
              <li>Analyse aggregate usage patterns (not individual profiles)</li>
              <li>Protect the Website against abuse and security threats</li>
              <li>Meet applicable legal and regulatory obligations</li>
            </ul>
            <p>
              We do <strong>not</strong> sell personal data and do{" "}
              <strong>not</strong> use Website analytics for targeted advertising.
            </p>
          </LegalSection>

          <LegalSection id="retention" title="5. Retention periods">
            <p>We retain personal data only as long as necessary:</p>
            <ul className="ml-5 list-disc space-y-1">
              <li>
                <strong>Contact form data</strong> — for a reasonable period for
                follow-up and relationship management;
              </li>
              <li>
                <strong>Analytics data</strong> — as aggregate or pseudonymised
                trends, as applicable;
              </li>
              <li>
                <strong>Security logs</strong> — for a short period, unless
                longer retention is required to investigate an incident.
              </li>
            </ul>
          </LegalSection>

          <LegalSection
            id="sharing"
            title="6. Sharing and international transfers"
          >
            <p>
              We use a small number of service providers for hosting, analytics,
              secure form handling, and internal notifications. They process data on
              our instructions and with appropriate safeguards.
            </p>
            <p>
              Website analytics and form submissions are handled with
              privacy‑respecting tools. These processors do not receive biometric
              data, identity documents, or the sensitive categories described for the
              mobile app. Data about farmers, agents, cooperatives, or identity
              workflows in the app is handled under separate arrangements and
              outside the scope of this Policy.
            </p>
            <p>
              Personal data may be processed in the EU/EEA or in other
              jurisdictions. Where we transfer data internationally, we use
              GDPR-compliant tools such as Standard Contractual Clauses where
              required.
            </p>
            <p>
              We may share data with regulators or authorities when required by law.
              We do not share Website data with third parties for their marketing.
            </p>
          </LegalSection>

          <LegalSection id="rights" title="7. Your rights">
            <p>Depending on your location, you may have the right to:</p>
            <ul className="ml-5 list-disc space-y-1">
              <li>Access your personal data</li>
              <li>Rectify inaccuracies</li>
              <li>Request erasure (&quot;right to be forgotten&quot;)</li>
              <li>Restrict processing</li>
              <li>Object to processing</li>
              <li>Request data portability</li>
            </ul>
            <p>
              You may also lodge a complaint with an EU supervisory authority where
              applicable.
            </p>
          </LegalSection>

          <LegalSection id="children" title="8. Children">
            <p>
              The Website is intended for professional audiences and is not
              directed at children. We do not knowingly collect data from children
              on the Website.
            </p>
          </LegalSection>

          <LegalSection id="changes" title="9. Changes to this Policy">
            <p>
              We may update this Policy to reflect changes in our Website, our
              operations, or applicable law. The &quot;Last updated&quot; date will
              be revised when we do.
            </p>
          </LegalSection>

          <LegalSection id="contact" title="10. Contact">
            <p>For privacy requests or any privacy-related questions:</p>
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
