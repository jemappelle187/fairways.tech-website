import React from "react";

type Tile = { id: number; title: string; status: string; desc: string };

const tiles: Tile[] = [
  {
    id: 1,
    title: "Project 1",
    status: "Pilot",
    desc: "High-level pilot work — details available on request.",
  },
  {
    id: 2,
    title: "Project 2",
    status: "Planning",
    desc: "High-level pilot work — details available on request.",
  },
  {
    id: 3,
    title: "Project 3",
    status: "Deployment",
    desc: "High-level pilot work — details available on request.",
  },
];

export default function ProjectTiles() {
  return (
    <div className="projects-grid mx-auto grid max-w-6xl gap-8 py-8 md:grid-cols-3">
      {tiles.map((t) => (
        <div key={t.id} className="tile text-center">
          <div className="tile-icon mx-auto mb-4 flex h-28 w-28 items-center justify-center rounded bg-gray-50 shadow-sm">
            <span className="text-sm font-semibold text-gray-700">Logo</span>
          </div>
          <h4 className="text-lg font-semibold">{t.title}</h4>
          <div className="my-2 text-xs text-gray-500">
            <strong>{t.status}</strong>
          </div>
          <p className="text-sm text-gray-600">{t.desc}</p>
          <div className="mt-4">
            <a
              href="/#cta"
              className="inline-flex items-center justify-center rounded-lg border border-forest px-4 py-2 text-sm font-medium text-forest transition hover:bg-forest/5 focus:outline-none focus:ring-2 focus:ring-forest focus:ring-offset-2"
            >
              Request a private briefing
            </a>
          </div>
        </div>
      ))}
    </div>
  );
}
