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

const TERMS_TOC = [
  { id: "who-we-are", label: "1. Who we are" },
  { id: "permitted-use", label: "2. Permitted use" },
  { id: "no-advice", label: "3. No professional advice" },
  { id: "information", label: "4. Information on the Website" },
  { id: "ip", label: "5. Intellectual property" },
  { id: "third-party", label: "6. Third-party content" },
  { id: "privacy-cookies", label: "7. Privacy and cookies" },
  { id: "liability", label: "8. Limitation of liability" },
  { id: "changes", label: "9. Changes" },
  { id: "governing-law", label: "10. Governing law" },
  { id: "contact", label: "11. Contact" },
];

export const metadata: Metadata = buildPageMetadata({
  title: "Website Terms & Conditions",
  description:
    "Terms and conditions governing the use of the Fairways.Tech corporate website.",
  path: "/terms",
  ogTitle: "Website Terms & Conditions | Fairways.Tech",
});

export default function TermsPage() {
  return (
    <>
      <Header />
      <LegalPageTemplate
        title="Website Terms & Conditions"
        lastUpdated={LEGAL_PAGES_LAST_UPDATED}
        showToc
        tocItems={TERMS_TOC}
      >
        <div className="space-y-0">
          <LegalSection id="who-we-are" title="1. Who we are" isFirst>
            <p>
              These Website Terms &amp; Conditions (&quot;Terms&quot;) govern your
              use of the corporate website <strong>www.fairways.tech</strong> (the
              &quot;Website&quot;).
            </p>
            <p className="font-medium text-slate-900">The Website is operated by:</p>
            <ul className="ml-5 list-disc space-y-1">
              <li>
                <strong>{LEGAL_CONFIG.netherlandsEntityName}</strong> (KvK{" "}
                <strong>{LEGAL_CONFIG.netherlandsRegistrationNumber}</strong>)
              </li>
              <li>
                <strong>{LEGAL_CONFIG.ghanaEntityName}</strong> (incorporated in the
                Republic of Ghana)
              </li>
            </ul>
            <p>
              Together trading as &quot;{LEGAL_CONFIG.tradingName}&quot;.
            </p>
            <p>
              In these Terms, &quot;{LEGAL_CONFIG.tradingName}&quot;, &quot;we&quot;,
              &quot;us&quot; or &quot;our&quot; refers to {LEGAL_CONFIG.netherlandsEntityName}{" "}
              and {LEGAL_CONFIG.ghanaEntityName}, trading as &quot;
              {LEGAL_CONFIG.tradingName}&quot;, unless we state otherwise. The
              Website is an informational, non-transactional site. It does not
              facilitate account opening, onboarding, biometric capture, lending, or
              any other regulated financial or identification process. Any such
              services, if and when offered, are governed by separate agreements
              and policies and are not covered by these Website Terms.
            </p>
            <p>
              By accessing the Website, you agree to be bound by these Terms. If
              you do not agree, you must discontinue use immediately.
            </p>
          </LegalSection>

          <LegalSection id="permitted-use" title="2. Permitted use of the Website">
            <p>You may use the Website only:</p>
            <ul className="ml-5 list-disc space-y-1">
              <li>For lawful personal or business purposes</li>
              <li>In accordance with these Terms and applicable laws</li>
            </ul>
            <p className="font-medium text-slate-900">You must not:</p>
            <ul className="ml-5 list-disc space-y-1">
              <li>Attempt to bypass or interfere with Website security</li>
              <li>Use automated tools to scrape, extract or harvest data</li>
              <li>Upload malware or harmful content</li>
              <li>
                Use the Website to send unlawful or unsolicited communications
              </li>
            </ul>
            <p>
              The Website is not intended for children under 16. If you are under
              16, do not use the Website or submit personal data.
            </p>
          </LegalSection>

          <LegalSection
            id="no-advice"
            title="3. No financial, legal, or investment advice"
          >
            <p>
              All information provided on the Website is general and descriptive
              in nature. It does not:
            </p>
            <ul className="ml-5 list-disc space-y-1">
              <li>Constitute financial, legal, regulatory or investment advice</li>
              <li>Create any advisory, client, or fiduciary relationship</li>
              <li>
                Represent an offer or solicitation to provide credit, banking,
                investment, or other regulated financial services
              </li>
            </ul>
            <p>
              You should obtain independent professional advice before relying on
              any information presented here, particularly in relation to financial,
              legal, regulatory, or investment decisions, or before entering into
              any credit, payment, or other financial arrangements.
            </p>
          </LegalSection>

          <LegalSection id="information" title="4. Information on the Website">
            <p>
              We aim to ensure the accuracy and relevance of the information
              published, but:
            </p>
            <ul className="ml-5 list-disc space-y-1">
              <li>Content may become outdated or incomplete</li>
              <li>We may update, modify or remove content without prior notification</li>
              <li>
                We do not guarantee continuous availability or error‑free operation
                of the Website
              </li>
            </ul>
            <p>
              To the extent permitted by law, we disclaim liability for any loss
              arising from reliance on Website content.
            </p>
          </LegalSection>

          <LegalSection id="ip" title="5. Intellectual property rights">
            <p>
              All Website content is owned by or licensed to{" "}
              {LEGAL_CONFIG.tradingName}, including:
            </p>
            <ul className="ml-5 list-disc space-y-1">
              <li>Logos, visual identity and branding</li>
              <li>Design, layout, and user interface</li>
              <li>Graphics, illustrations and images</li>
              <li>Text, copy and underlying source code</li>
            </ul>
            <p>You may reproduce limited extracts for non‑commercial use only.</p>
            <p>
              You may not copy, commercially exploit, or redistribute Website
              content without prior written permission.
            </p>
          </LegalSection>

          <LegalSection id="third-party" title="6. Third‑party content">
            <p>
              The Website may contain links to independent third‑party websites.
              These are provided for convenience only. We do not endorse, control or
              take responsibility for their content or practices.
            </p>
          </LegalSection>

          <LegalSection id="privacy-cookies" title="7. Privacy and cookies">
            <p>
              Our handling of personal data and tracking technologies is governed
              by our{" "}
              <a href="/privacy" className={legalPageLinkClass}>
                Privacy Policy
              </a>{" "}
              and{" "}
              <a href="/cookies" className={legalPageLinkClass}>
                Cookie Policy
              </a>
              .
            </p>
          </LegalSection>

          <LegalSection id="liability" title="8. Limitation of liability">
            <p>
              To the maximum extent permitted by law, {LEGAL_CONFIG.tradingName}{" "}
              excludes liability for any indirect or consequential loss arising from
              your use of the Website.
            </p>
            <p>
              Where liability cannot be excluded, it will be limited to a reasonable
              amount proportionate to your use of the Website as a non‑commercial
              informational resource.
            </p>
            <p>
              Nothing in these Terms excludes or limits any liability that cannot be
              excluded or limited under applicable law.
            </p>
          </LegalSection>

          <LegalSection id="changes" title="9. Changes to these Terms">
            <p>
              We may revise these Terms from time to time. The &quot;Last
              updated&quot; date reflects the most recent version. Continued use
              constitutes acceptance of the updated Terms.
            </p>
          </LegalSection>

          <LegalSection id="governing-law" title="10. Governing law &amp; jurisdiction">
            <p>
              These Terms are governed by the laws of {LEGAL_CONFIG.governingLaw}. Any
              disputes shall be submitted to the exclusive jurisdiction of the
              courts of the {LEGAL_CONFIG.governingLaw}, without prejudice to
              mandatory rights under applicable law.
            </p>
          </LegalSection>

          <LegalSection id="contact" title="11. Contact">
            <p>For questions regarding these Terms:</p>
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
