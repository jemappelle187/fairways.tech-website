"use client";

import React from "react";
import ProjectLogo from "./ProjectLogo";

type Tile = {
  id: number;
  title: string;
  status: string;
  sector: string;
  timeframe: string;
  desc: string;
  progressPercent?: number;
};

const tiles: Tile[] = [
  {
    id: 1,
    title: "Project 1",
    status: "Pilot — active",
    sector: "agri / horticulture",
    timeframe: "Q1–Q2 — active",
    desc: "Active pilot work validating horticulture interventions and supply reliability. Outcomes shared after validation; sensitive details on request.",
    progressPercent: 45,
  },
  {
    id: 2,
    title: "Project 2",
    status: "Planning",
    sector: "agri / horticulture",
    timeframe: "Planning",
    desc: "Planning-stage pilot exploring agronomic and logistics solutions. Details available on request.",
    progressPercent: 15,
  },
  {
    id: 3,
    title: "Project 3",
    status: "Planning",
    sector: "poultry",
    timeframe: "Planning",
    desc: "Planning-stage pilot to strengthen poultry processing and cold-chain readiness. Details available on request.",
    progressPercent: 10,
  },
];

export default function ProjectTiles() {
  return (
    <div className="projects-grid mx-auto grid max-w-6xl grid-cols-1 gap-8 py-8 md:grid-cols-3">
      {tiles.map((t) => (
        <div key={t.id} className="group tile text-center">
          <ProjectLogo
            alt={`${t.title} logo (${t.sector})`}
            progressPercent={t.progressPercent}
          />
          <div className="mb-2 inline-block rounded-full border border-forest/20 bg-white/80 px-3 py-1 text-xs font-semibold text-forest shadow-sm backdrop-blur-sm">
            {t.status}
          </div>
          <h4 className="text-lg font-semibold text-stone">{t.title}</h4>
          <p className="mt-1 text-xs text-gray-500">
            Timeline: {t.timeframe}
          </p>
          <p className="mt-2 text-sm text-gray-600">{t.desc}</p>
          <p className="mt-3 text-sm text-gray-600">
            Private briefings available on request; please{" "}
            <a href="/#cta" className="underline hover:text-forest">
              contact us
            </a>
            .
          </p>
        </div>
      ))}
    </div>
  );
}
