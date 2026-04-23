import { LEGAL_CONFIG, LEGAL_MAILTO_PRIVACY } from "@/config/legal";

/**
 * Company and contact details for the legal index pages. Copy is sourced from
 * config/legal.ts only.
 */
export function LegalEntityBlock() {
  return (
    <section
      className="mt-10 border border-stone-200/90 bg-slate-50/80 p-5 sm:p-6"
      aria-labelledby="legal-entity-heading"
    >
      <h2
        id="legal-entity-heading"
        className="text-base font-semibold text-stone sm:text-lg"
      >
        Legal entity information
      </h2>
      <p className="mt-2 text-sm text-slate-800">
        The <strong>{LEGAL_CONFIG.tradingName}</strong> website and brand are
        operated by:
      </p>
      <ul className="ml-5 mt-2 list-disc space-y-1.5 text-sm text-slate-800">
        <li>
          <strong>{LEGAL_CONFIG.netherlandsEntityName}</strong> (KvK:{" "}
          <strong>{LEGAL_CONFIG.netherlandsRegistrationNumber}</strong>)
        </li>
        <li>
          <strong>{LEGAL_CONFIG.ghanaEntityName}</strong> (Republic of Ghana)
        </li>
      </ul>
      <p className="mt-3 text-sm text-slate-800">
        Together trading as &quot;{LEGAL_CONFIG.tradingName}&quot;. Privacy
        contact:{" "}
        <a
          className="text-forest underline underline-offset-2 hover:opacity-80 focus:outline-none focus:ring-2 focus:ring-forest focus:ring-offset-2 rounded"
          href={LEGAL_MAILTO_PRIVACY}
        >
          {LEGAL_CONFIG.privacyEmail}
        </a>
        .
      </p>
    </section>
  );
}
