"use client";

import React from "react";
import ProjectLogo from "./ProjectLogo";

type Tile = {
  id: number;
  title: string;
  status: string;
  desc: string;
  progressPercent?: number;
};

const tiles: Tile[] = [
  {
    id: 1,
    title: "Project 1",
    status: "Pilot",
    desc: "High-level pilot work — details available on request.",
    progressPercent: 28,
  },
  {
    id: 2,
    title: "Project 2",
    status: "Planning",
    desc: "High-level pilot work — details available on request.",
    progressPercent: 12,
  },
  {
    id: 3,
    title: "Project 3",
    status: "Deployment",
    desc: "High-level pilot work — details available on request.",
    progressPercent: 62,
  },
];

export default function ProjectTiles() {
  return (
    <div className="projects-grid mx-auto grid max-w-6xl grid-cols-1 gap-8 py-8 md:grid-cols-3">
      {tiles.map((t) => (
        <div key={t.id} className="tile text-center">
          <ProjectLogo
            alt={`${t.title} logo`}
            progressPercent={t.progressPercent}
          />
          <div className="mb-2 inline-block rounded-full bg-forest/10 px-3 py-1 text-xs font-semibold text-forest">
            {t.status}
          </div>
          <h4 className="text-lg font-semibold text-stone">{t.title}</h4>
          <p className="mt-2 text-sm text-gray-600">{t.desc}</p>
          <div className="mt-4">
            <a
              href="/#cta"
              className="inline-flex items-center justify-center rounded-lg border border-forest px-4 py-2 text-sm font-medium text-forest transition hover:bg-forest/5 focus:outline-none focus:ring-2 focus:ring-forest focus:ring-offset-2"
              aria-label={`Request a private briefing for ${t.title}`}
            >
              Request a private briefing
            </a>
          </div>
        </div>
      ))}
    </div>
  );
}
