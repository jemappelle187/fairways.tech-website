"use client";

import { useEffect } from "react";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error("Error:", error);
  }, [error]);

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-sand px-6">
      <div className="max-w-md text-center">
        <h1 className="mb-4 text-2xl font-semibold text-stone">Something went wrong!</h1>
        <p className="mb-6 text-slate-700">
          We encountered an unexpected error. Please try again.
        </p>
        <button
          onClick={reset}
          className="rounded-lg bg-forest px-6 py-3 text-sm font-semibold text-white transition hover:bg-forest/90 focus:outline-none focus:ring-2 focus:ring-forest focus:ring-offset-2"
        >
          Try again
        </button>
      </div>
    </div>
  );
}
