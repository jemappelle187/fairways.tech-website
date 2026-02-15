import type { Metadata } from "next";
import { Header, Footer } from "../components/SiteChrome";
import ProjectTiles from "./ProjectTiles";

export const metadata: Metadata = {
  title: "Our Projects — Fairways.Tech",
  description:
    "Field pilots and infrastructure upgrades to validate scalable solutions for smallholder farmers. Request a private briefing for details.",
  openGraph: {
    title: "Our Projects | Fairways.Tech",
    description:
      "Field pilots and infrastructure upgrades to validate scalable solutions for smallholder farmers. Request a private briefing for details.",
    url: "https://fairways.tech/projects",
  },
};

export default function ProjectsPage() {
  return (
    <>
      <Header />
      <main
        id="main-content"
        className="min-h-screen scroll-mt-24 bg-gradient-to-b from-sand via-sand to-sand-muted"
      >
        <div className="mx-auto max-w-5xl px-6 py-16">
          <header className="mb-10 text-center">
            <p className="mb-4 text-xs font-semibold uppercase tracking-[0.28em] text-forest">
              Our work
            </p>
            <h1 className="text-3xl font-bold tracking-tight text-stone sm:text-4xl">
              Our Projects
            </h1>
            <p className="mx-auto mt-4 max-w-2xl text-lg leading-relaxed text-slate-700">
              We run field pilots and infrastructure upgrades to validate
              scalable solutions. Outcomes are shared after validation; request
              a private briefing for details.
            </p>
            <p className="mt-4 text-sm text-gray-600">
              Learn more about our impact on the{" "}
              <a href="/impact" className="underline hover:text-forest">
                Impact page
              </a>
              .
            </p>
            <p className="mt-2 text-xs text-gray-500">
              Current status: Pilot 1 active (Q1–Q2). Others in planning.
            </p>
          </header>

          <section
            aria-labelledby="active-projects"
            className="mb-12"
          >
            <h2
              id="active-projects"
              className="text-center text-xl font-semibold text-stone"
            >
              Active projects (teaser)
            </h2>
            <p className="mt-2 text-center text-sm text-gray-500">
              We are running multiple pilots across cropping, tree crops, and
              processing—details shared on request.
            </p>
            <ProjectTiles />
          </section>

          <section className="mb-12">
            <h3 className="text-lg font-semibold text-stone">
              What we track
            </h3>
            <ul className="mt-3 list-inside list-disc space-y-2 text-gray-700">
              <li>Adoption & yield change</li>
              <li>Post-harvest loss & supply reliability</li>
              <li>Verified repayment & buyer off-take</li>
            </ul>
          </section>

          <section className="border-t border-stone-200 py-8">
            <h4 className="font-semibold text-stone">How to engage</h4>
            <p className="mt-2 text-gray-600">
              For partnership or investor briefings, please{" "}
              <a href="/#cta" className="underline hover:text-forest">
                contact us
              </a>
              . Sensitive commercial details are shared in direct briefings under
              appropriate confidentiality arrangements.
            </p>
          </section>
        </div>
      </main>
      <Footer />
    </>
  );
}
