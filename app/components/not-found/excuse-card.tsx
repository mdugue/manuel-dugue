"use client";

import { useEffect, useState } from "react";

import type { Dictionary } from "@/i18n/dictionaries";

type Excuse = Dictionary["portfolio"]["notFound"]["excuse"];

/** Per character — close to how fast the self-portrait streams in. */
const TYPE_MS = 22;

function prefersReducedMotion(): boolean {
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

function counter(index: number, total: number): string {
  return `${String(index + 1).padStart(2, "0")}/${String(total).padStart(2, "0")}`;
}

/**
 * The self-portrait's handwritten twin: same card, same regenerate button, no
 * model. A new excuse types itself out as if it were streamed — the joke needs
 * the delay. The first one is server-rendered in full.
 */
export function ExcuseCard({ excuse }: { excuse: Excuse }) {
  const { items } = excuse;
  const [index, setIndex] = useState(0);
  const [typed, setTyped] = useState(Number.POSITIVE_INFINITY);
  const [run, setRun] = useState(0);

  const text = items[index] ?? "";
  const typing = typed < text.length;

  useEffect(() => {
    let frame = 0;
    if (run > 0 && !prefersReducedMotion()) {
      const start = performance.now();
      const tick = (now: number) => {
        const count = Math.floor((now - start) / TYPE_MS);
        setTyped(count);
        if (count < text.length) {
          frame = requestAnimationFrame(tick);
        }
      };
      frame = requestAnimationFrame(tick);
    }
    return () => {
      cancelAnimationFrame(frame);
    };
  }, [run, text.length]);

  const nextExcuse = () => {
    setIndex((index + 1) % items.length);
    setTyped(prefersReducedMotion() ? Number.POSITIVE_INFINITY : 0);
    setRun(run + 1);
  };

  return (
    <div className="border-rule bg-paper before:bg-accent relative max-w-195 border p-[clamp(28px,3.5vw,44px)] before:absolute before:-inset-px before:bottom-auto before:left-auto before:h-3.5 before:w-3.5 before:content-['']">
      <div className="bg-bg text-ink-faint text-nano tracking-heading absolute -top-2.25 left-6 inline-flex items-center gap-2 px-2.5 font-mono uppercase">
        <span
          aria-hidden="true"
          className="border-ink-faint h-1.5 w-1.5 rounded-full border"
        />
        {excuse.tag}
      </div>

      <p className="font-display text-ink m-0 min-h-[3.1em] text-[clamp(19px,1.75vw,24px)] leading-[1.55]">
        <span aria-hidden="true">{text.slice(0, typed)}</span>
        {typing ? (
          <span
            aria-hidden="true"
            className="animate-pulse-dot bg-accent ml-1.5 inline-block h-[0.45em] w-[0.45em] rounded-full align-middle"
          />
        ) : null}
        <span aria-live="polite" className="sr-only">
          {text}
        </span>
      </p>

      <div className="border-rule text-ink-faint text-nano tracking-label mt-7 flex flex-wrap items-center justify-between gap-4 border-t border-dashed pt-5 font-mono uppercase">
        <div className="flex flex-wrap gap-4.5">
          <span>{excuse.model}</span>
          <span>{counter(index, items.length)}</span>
        </div>
        <button
          className="border-rule font-inherit text-ink-soft tracking-label hover:border-accent hover:text-accent focus-visible:border-accent focus-visible:text-accent focus-visible:outline-accent inline-flex cursor-pointer items-center gap-2 border bg-none px-3.5 py-2 uppercase transition-colors focus-visible:outline-2 focus-visible:outline-offset-2"
          onClick={nextExcuse}
          type="button"
        >
          <span aria-hidden="true" className="text-[13px]">
            ↻
          </span>
          {excuse.cycle}
        </button>
      </div>
    </div>
  );
}
