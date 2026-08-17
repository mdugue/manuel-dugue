"use client";

import { catchError, type ErrorInfo } from "next/error";

export interface SectionErrorLabels {
  message: string;
  retry: string;
}

/**
 * Fallback for a subtree with no meaningful degraded state. `retry()`
 * re-fetches and re-renders the boundary's children, so a failed Server
 * Component render can recover without a full page reload.
 */
function SectionErrorFallback(
  { className, labels }: { className?: string; labels: SectionErrorLabels },
  { retry }: ErrorInfo
) {
  return (
    <div
      className={`flex flex-wrap items-center gap-4 border border-rule border-dashed bg-paper px-6 py-5 font-mono text-ink-soft text-micro uppercase tracking-label ${className ?? ""}`}
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

export const SectionErrorBoundary = catchError(SectionErrorFallback);

/**
 * Swaps in an already-rendered degraded version of the subtree. Use where that
 * degraded UI exists anyway — the fallback node is rendered on every page
 * render, not only when the boundary catches.
 */
function StaticFallback({ fallback }: { fallback: React.ReactNode }) {
  return fallback;
}

export const FallbackErrorBoundary = catchError(StaticFallback);
