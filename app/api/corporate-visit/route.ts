import { receiveVisit, preflight } from "../../../lib/corporateVisit";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";
export const maxDuration = 15;

export const OPTIONS = preflight;
export const POST = receiveVisit;
