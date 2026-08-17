"use client";

import { catchError, type ErrorInfo } from "next/error";

export interface SectionErrorLabels {
  message: string;
  retry: string;
}

function SectionErrorFallback(
  { labels }: { labels: SectionErrorLabels },
  { retry }: ErrorInfo
) {
  return (
    <div
      className="flex flex-wrap items-center gap-4 border border-rule border-dashed bg-paper px-6 py-5 font-mono text-ink-soft text-micro uppercase tracking-label"
      role="alert"
    >
      <span>{labels.message}</span>
      <button
        className="cursor-pointer text-accent uppercase tracking-label hover:underline focus-visible:outline-2 focus-visible:outline-accent focus-visible:outline-offset-2"
        onClick={retry}
        type="button"
      >
        {labels.retry}
      </button>
    </div>
  );
}

/** Replaces a failed subtree with a retry prompt. `retry()` re-renders in place. */
export const SectionErrorBoundary = catchError(SectionErrorFallback);
