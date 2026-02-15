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
    <div className="group flex flex-col items-center">
      <div className="mx-auto mb-3 flex h-28 w-28 items-center justify-center overflow-hidden rounded-lg bg-gray-50 shadow-sm">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={imgSrc}
          alt={alt}
          loading="lazy"
          className="h-20 w-20 object-contain"
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
            aria-label={`Project progress: ${percent} percent`}
          >
            <div
              className="h-full rounded-full bg-forest transition-all duration-500"
              style={{ width: `${percent}%` }}
            />
          </div>
          <span className="sr-only">Progress: {percent}%</span>
          <p className="mt-1 text-[10px] text-gray-500 opacity-0 transition-opacity group-hover:opacity-100" aria-hidden>
            Progress: {percent}%
          </p>
        </div>
      )}
    </div>
  );
}
