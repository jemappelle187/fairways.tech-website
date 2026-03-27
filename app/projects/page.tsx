import type { Metadata } from "next";
import { Header, Footer } from "../components/SiteChrome";
import ProjectTiles from "./ProjectTiles";

export const metadata: Metadata = {
  title: "Our Projects — Fairways.Tech",
  description:
    "Field pilots and infrastructure upgrades to validate scalable solutions for smallholder markets.",
  openGraph: {
    title: "Our Projects | Fairways.Tech",
    description:
      "Field pilots and infrastructure upgrades to validate scalable solutions for smallholder markets.",
    url: "https://fairways.tech/projects",
  },
};

export default function ProjectsPage() {
  return (
    <>
      <Header />
      <main
        id="main-content"
        className="min-h-screen scroll-mt-24 bg-sand"
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
              Active projects
            </h2>
            <p className="mt-2 text-center text-sm text-gray-500">
              We are running multiple pilots across cropping, tree crops, and
              processing-details shared on request.
            </p>
            <ProjectTiles />
          </section>
        </div>
      </main>
      <Footer />
    </>
  );
}
