"use client";

import React from "react";

type ProjectLogoProps = {
  src?: string | null;
  alt: string;
  progressPercent?: number;
};

const PLACEHOLDER_SRC = "/images/logo-placeholder.svg";

export default function ProjectLogo({
  src,
  alt,
  progressPercent,
}: ProjectLogoProps) {
  const imgSrc = src || PLACEHOLDER_SRC;
  const percent = progressPercent ?? 0;

  return (
    <div className="flex flex-col items-center">
      <button
        type="button"
        className="group mx-auto mb-3 flex h-28 w-28 items-center justify-center overflow-hidden rounded-lg bg-gray-50 shadow-sm transition-all duration-200 hover:-translate-y-1 hover:shadow-md focus:outline-none focus:ring-2 focus:ring-forest focus:ring-offset-2"
        aria-label={`${alt} — view project`}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={imgSrc}
          alt={alt}
          loading="lazy"
          className="h-20 w-20 object-contain"
        />
      </button>
      {percent >= 0 && percent <= 100 && (
        <div className="w-full max-w-[7rem]" aria-live="polite">
          <div
            className="h-1.5 overflow-hidden rounded-full bg-gray-200"
            role="progressbar"
            aria-valuenow={percent}
            aria-valuemin={0}
            aria-valuemax={100}
            aria-label={`Project progress: ${percent}%`}
          >
            <div
              className="h-full rounded-full bg-forest transition-all duration-500"
              style={{ width: `${percent}%` }}
            />
          </div>
          <span className="sr-only">Project progress: {percent}%</span>
        </div>
      )}
    </div>
  );
}
