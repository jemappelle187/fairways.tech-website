/**
 * Reusable legal entity block for Privacy, Terms, Cookies, and Disclaimer pages.
 * Lists operating companies (NL + Ghana) and address placeholders only.
 */
export function LegalEntityBlock() {
  return (
    <div className="rounded-2xl border border-slate-200/60 bg-white/80 p-6">
      <h2 className="mb-3 text-lg font-semibold tracking-tight text-stone">
        Legal entity information
      </h2>
      <p className="mb-2 text-sm text-slate-800">
        The <strong>Fairways.Tech</strong> website and brand are operated by:
      </p>
      <ul className="mb-4 ml-5 list-disc space-y-1 text-sm text-slate-800">
        <li>
          <strong>Fairways Tech Operations B.V.</strong> (
          <strong>99720248</strong>)
        </li>
        <li>
          <strong>Fairways.Tech Ltd</strong> (Republic of Ghana)
        </li>
      </ul>
      <p className="text-xs text-slate-600">
        Registered office address:{" "}
        <span className="italic">
          [insert registered address of Fairways Tech Operations B.V.]
        </span>
        . Ghana: <span className="italic">[insert if required]</span>.
      </p>
    </div>
  );
}
