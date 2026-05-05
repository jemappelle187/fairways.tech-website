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
      <div className="mt-3 space-y-4 text-sm leading-relaxed text-slate-800">
        <div>
          <p className="font-semibold text-slate-900">
            {LEGAL_CONFIG.netherlandsEntityName}
          </p>
          <p>
            Dutch Chamber of Commerce (KvK):{" "}
            <strong>{LEGAL_CONFIG.netherlandsRegistrationNumber}</strong>
          </p>
          <p>
            Jurisdiction: {LEGAL_CONFIG.netherlandsJurisdiction}
          </p>
        </div>
        <div>
          <p className="font-semibold text-slate-900">
            {LEGAL_CONFIG.ghanaEntityName}
          </p>
          <p>
            Ghana company registration number:{" "}
            <strong>{LEGAL_CONFIG.ghanaRegistrationNumber}</strong>
          </p>
          <p>
            Registered address: {LEGAL_CONFIG.ghanaRegisteredAddress}
          </p>
        </div>
        <p>
          Privacy contact:{" "}
          <a
            className="text-forest underline underline-offset-2 hover:opacity-80 focus:outline-none focus:ring-2 focus:ring-forest focus:ring-offset-2 rounded"
            href={LEGAL_MAILTO_PRIVACY}
          >
            {LEGAL_CONFIG.privacyEmail}
          </a>
        </p>
      </div>
    </section>
  );
}
