"use client";

import React from "react";

type ProjectLogoProps = {
  src?: string | null;
  alt?: string;
  progressPercent?: number;
  projectLabel?: string;
};

const BRAND_LOGO_SRC = "/images/logo/master-250x250-svg/master-logo-drop-black.svg";

export default function ProjectLogo({
  src,
  alt,
  progressPercent,
  projectLabel = "Project",
}: ProjectLogoProps) {
  const imgSrc = src || BRAND_LOGO_SRC;
  const imgAlt = src ? (alt ?? "") : "Fairways.Tech project placeholder logo";
  const percent = progressPercent ?? 0;

  return (
    <div className="group flex flex-col items-center">
      <div className="mx-auto mb-3 flex h-28 w-28 items-center justify-center overflow-hidden">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={imgSrc}
          alt={imgAlt}
          loading="lazy"
          aria-hidden={!src}
          className="h-12 w-12 max-h-[56px] max-w-[56px] object-contain opacity-65 md:h-14 md:w-14 pointer-events-none select-none"
        />
      </div>
      {percent >= 0 && percent <= 100 && (
        <div className="w-full max-w-[7rem]" aria-live="polite">
          <div
            className="h-1.5 overflow-hidden rounded-full bg-gray-200"
            role="progressbar"
            aria-valuenow={percent}
            aria-valuemin={0}
            aria-valuemax={100}
            aria-label={`${projectLabel} progress: ${percent} percent`}
          >
            <div
              className="h-full rounded-full bg-forest transition-all duration-500"
              style={{ width: `${percent}%` }}
            />
          </div>
          <span className="sr-only">{percent}% complete</span>
          <p className="mt-1 text-[10px] text-gray-500 opacity-0 transition-opacity group-hover:opacity-100" aria-hidden>
            Progress: {percent}%
          </p>
        </div>
      )}
    </div>
  );
}
