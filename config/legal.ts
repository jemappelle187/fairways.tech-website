export const LEGAL_CONFIG = {
  ghanaEntityName: "Fairways.Tech Operations Ghana Ltd",
  netherlandsEntityName: "Fairways Tech Operations B.V.",
  netherlandsRegistrationNumber: "99720248",
  tradingName: "Fairways.Tech",
  governingLaw: "Netherlands",
  privacyEmail: "privacy@fairways.tech",
  legalEmail: "legal@fairways.tech",
} as const;

export type LegalConfig = typeof LEGAL_CONFIG;
export const LEGAL_MAILTO_PRIVACY = `mailto:${LEGAL_CONFIG.privacyEmail}` as const;
export const LEGAL_MAILTO_LEGAL = `mailto:${LEGAL_CONFIG.legalEmail}` as const;
