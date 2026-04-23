import type { Metadata } from "next";
import {
  LEGAL_CONFIG,
  LEGAL_MAILTO_PRIVACY,
  LEGAL_PAGES_LAST_UPDATED,
} from "@/config/legal";
import { buildPageMetadata } from "../../lib/seo";
import { Header, Footer } from "../components/SiteChrome";
import { LegalEntityBlock } from "../components/LegalEntityBlock";
import { LegalPageTemplate, LegalSection } from "../components/legal";

const DISCLAIMER_TOC = [
  { id: "informational", label: "1. Informational only" },
  { id: "no-offer", label: "2. No offer" },
  { id: "forward", label: "3. Forward-looking" },
  { id: "no-guarantee", label: "4. No guarantee" },
  { id: "external", label: "5. External links" },
  { id: "liability", label: "6. Limitation" },
  { id: "contact", label: "7. Contact" },
];

export const metadata: Metadata = buildPageMetadata({
  title: "Website Disclaimer",
  description: "General disclaimer for the Fairways.Tech corporate website.",
  path: "/disclaimer",
  ogTitle: "Website Disclaimer | Fairways.Tech",
});

export default function DisclaimerPage() {
  return (
    <>
      <Header />
      <LegalPageTemplate
        title="Website Disclaimer"
        lastUpdated={LEGAL_PAGES_LAST_UPDATED}
        showToc
        tocItems={DISCLAIMER_TOC}
      >
        <div className="space-y-0">
          <LegalSection
            id="informational"
            title="1. Informational purpose only"
            isFirst
          >
            <p>
              The website <strong>www.fairways.tech</strong> (the
              &quot;Website&quot;) is operated by{" "}
              <strong>{LEGAL_CONFIG.netherlandsEntityName}</strong> (KvK{" "}
              {LEGAL_CONFIG.netherlandsRegistrationNumber}) and{" "}
              <strong>{LEGAL_CONFIG.ghanaEntityName}</strong> (Republic of Ghana),
              trading as &quot;{LEGAL_CONFIG.tradingName}&quot; (
              {LEGAL_CONFIG.tradingName}, &quot;we&quot;, &quot;us&quot;).
            </p>
            <p>
              All content on the Website is provided for general information only.
              Nothing on the Website is financial, investment, legal, tax,
              compliance, engineering, or other professional advice. You should not
              treat any part of the Website as a substitute for advice suited to
              your own situation.
            </p>
          </LegalSection>

          <LegalSection
            id="no-offer"
            title="2. No offer, solicitation, or commitment"
          >
            <p>
              The Website is not, and is not to be read as, any of the following:
            </p>
            <ul className="ml-5 list-disc space-y-1">
              <li>
                An offer to sell, or a solicitation to buy, any product or
                service;
              </li>
              <li>
                A commitment by {LEGAL_CONFIG.tradingName} or any partner to enter
                into an agreement; or
              </li>
              <li>
                A guarantee that any model, process, or partnership will be
                offered, approved, or available in any particular form or
                jurisdiction.
              </li>
            </ul>
            <p>
              Future services depend on law, partner contracts, due diligence, and
              other conditions that can change. Nothing on the site promises a
              specific outcome.
            </p>
          </LegalSection>

          <LegalSection
            id="forward"
            title="3. Forward-looking statements"
          >
            <p>
              The Website may include statements about possible future
              developments, product direction, or markets. These are
              forward-looking. Actual results can differ, including because of:
            </p>
            <ul className="ml-5 list-disc space-y-1">
              <li>Changes in law or regulatory guidance</li>
              <li>Supervisory, banking, or market requirements</li>
              <li>Technology, security, or operational limits</li>
              <li>Reliance on partners, suppliers, and external conditions</li>
            </ul>
            <p>
              {LEGAL_CONFIG.tradingName} is not obliged to update such statements
              except where the law requires.
            </p>
          </LegalSection>

          <LegalSection
            id="no-guarantee"
            title="4. No guarantee of accuracy or availability"
          >
            <p>We work to keep the site accurate, but we do not warrant that:</p>
            <ul className="ml-5 list-disc space-y-1">
              <li>All content is complete, up to date, or error-free at all times;</li>
              <li>
                The site will be available without interruption; or
              </li>
              <li>
                Any process or partnership described will be available on any
                particular timeline or in any particular form.
              </li>
            </ul>
            <p>
              We may change or remove content without prior notice to you, except
              where a specific agreement or law provides otherwise.
            </p>
          </LegalSection>

          <LegalSection id="external" title="5. External links">
            <p>
              The site may include links to third-party sites. Links are for
              convenience. We do not control those sites, do not guarantee their
              content or security, and are not responsible for your use of them.
            </p>
          </LegalSection>

          <LegalSection id="liability" title="6. Limitation of liability">
            <p>
              To the fullest extent allowed by law, {LEGAL_CONFIG.tradingName} is
              not liable for direct or indirect loss or damage that arises from or
              relates to:
            </p>
            <ul className="ml-5 list-disc space-y-1">
              <li>Use of or inability to use the Website;</li>
              <li>Reliance on any content on the Website;</li>
              <li>Errors, gaps, or interruptions in the Website; or</li>
              <li>Third-party content or external links.</li>
            </ul>
            <p>
              This Disclaimer does not limit any liability that cannot be limited
              under Dutch, Ghanaian, or other law that applies to you, where
              applicable.
            </p>
            <p>
              The laws of {LEGAL_CONFIG.governingLaw} apply to the Website Terms. For
              the relationship between the Terms and this Disclaimer, see the{" "}
              <a
                className="text-forest underline underline-offset-2 hover:opacity-80 focus:outline-none focus:ring-2 focus:ring-forest focus:ring-offset-2 rounded"
                href="/terms"
              >
                Website Terms &amp; Conditions
              </a>
              .
            </p>
          </LegalSection>

          <LegalSection id="contact" title="7. Contact">
            <p>Questions about this Disclaimer:</p>
            <p>
              Email:{" "}
              <a
                className="text-forest underline underline-offset-2 hover:opacity-80 focus:outline-none focus:ring-2 focus:ring-forest focus:ring-offset-2 rounded"
                href={LEGAL_MAILTO_PRIVACY}
              >
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
