export const LEGAL_CONFIG = {
  ghanaEntityName: "Fairways.Tech Operations Ghana Ltd",
  ghanaRegistrationNumber: "CS084430426",
  ghanaRegisteredAddress:
    "F146/2, Lokko Road, 2nd Floor Christian Council Building, Osu, Accra, Republic of Ghana",
  ghanaJurisdiction: "Republic of Ghana",
  netherlandsEntityName: "Fairways.Tech Operations B.V.",
  netherlandsRegistrationNumber: "99720248",
  netherlandsJurisdiction: "Netherlands",
  tradingName: "Fairways.Tech",
  governingLaw: "Netherlands",
  privacyEmail: "privacy@fairways.tech",
  legalEmail: "legal@fairways.tech",
} as const;

export type LegalConfig = typeof LEGAL_CONFIG;
export const LEGAL_MAILTO_PRIVACY = `mailto:${LEGAL_CONFIG.privacyEmail}` as const;
export const LEGAL_MAILTO_LEGAL = `mailto:${LEGAL_CONFIG.legalEmail}` as const;

/** Shown on /terms, /privacy, /cookies, /disclaimer — derived from config/site-dates.ts */
export { LEGAL_PAGES_LAST_UPDATED } from "./site-dates";
