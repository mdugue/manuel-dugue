"use client";

import { Tooltip } from "@base-ui/react";
import { useSyncExternalStore } from "react";

import type { Locale } from "@/i18n/config";

export interface RegenerateTooltipLabels {
  cached: string;
  fresh: string;
  nextModel: string;
}

export interface RegenerateTooltip {
  labels: RegenerateTooltipLabels;
  locale: Locale;
  nextModelExpiresAt: number | null;
  nextModelLabel: string;
}

function subscribeNow(onTick: () => void) {
  const id = setInterval(onTick, 30_000);
  return () => {
    clearInterval(id);
  };
}

function getNow() {
  return Date.now();
}

function getServerNow(): number | null {
  return null;
}

function useNow(): number | null {
  return useSyncExternalStore(subscribeNow, getNow, getServerNow);
}

function formatRelative(locale: Locale, remainingMs: number): string {
  const rtf = new Intl.RelativeTimeFormat(locale, {
    numeric: "auto",
    style: "long",
  });
  const minutes = Math.round(remainingMs / 60_000);
  if (minutes < 60) {
    return rtf.format(Math.max(1, minutes), "minute");
  }
  const hours = Math.round(remainingMs / 3_600_000);
  if (hours < 48) {
    return rtf.format(hours, "hour");
  }
  const days = Math.round(remainingMs / 86_400_000);
  return rtf.format(days, "day");
}

function formatAbsolute(locale: Locale, at: number): string {
  return new Intl.DateTimeFormat(locale, {
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    month: "short",
  }).format(new Date(at));
}

function RegenerateTooltipContent({
  nextModelLabel,
  nextModelExpiresAt,
  locale,
  labels,
}: RegenerateTooltip) {
  const now = useNow();
  const cached =
    now !== null && nextModelExpiresAt !== null && nextModelExpiresAt > now;
  return (
    <div className="flex flex-col gap-1.5">
      <div>
        <div className="text-ink-faint text-[9.5px]">{labels.nextModel}</div>
        <div className="text-ink-soft tracking-label mt-0.5 text-[12px] font-medium normal-case">
          {nextModelLabel}
        </div>
      </div>
      <div className="border-rule mt-1 flex flex-col gap-1 border-t border-dashed pt-2">
        {cached && now !== null && nextModelExpiresAt !== null ? (
          <>
            <div className="text-accent">
              {labels.cached}{" "}
              <span className="text-ink-soft normal-case">
                {formatRelative(locale, nextModelExpiresAt - now)}
              </span>
            </div>
            <div className="text-ink-faint text-[11px] tracking-normal normal-case">
              {formatAbsolute(locale, nextModelExpiresAt)}
            </div>
          </>
        ) : (
          <div>{labels.fresh}</div>
        )}
      </div>
    </div>
  );
}

export function AiControls({
  modelId,
  modelLabel,
  position,
  cycleLabel,
  onRegenerate,
  disabled,
  tooltip,
  className,
}: {
  modelId: string;
  modelLabel: string;
  position: string;
  cycleLabel: string;
  onRegenerate: () => void;
  disabled: boolean;
  tooltip: RegenerateTooltip;
  className?: string;
}) {
  return (
    <div
      className={`text-ink-faint text-nano tracking-label flex flex-wrap items-center justify-between gap-4 font-mono uppercase ${className}`}
    >
      <div className="flex flex-wrap gap-4.5">
        <span>
          {modelLabel} {modelId}
        </span>
        <span>{position}</span>
      </div>
      <Tooltip.Provider closeDelay={80} delay={250}>
        <Tooltip.Root>
          <Tooltip.Trigger
            className="border-rule font-inherit text-ink-soft tracking-label hover:border-accent hover:text-accent focus-visible:border-accent focus-visible:text-accent focus-visible:outline-accent inline-flex cursor-pointer items-center gap-2 border bg-none px-3.5 py-2 uppercase transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 disabled:cursor-not-allowed disabled:opacity-40"
            disabled={disabled}
            onClick={onRegenerate}
            type="button"
          >
            <span aria-hidden="true" className="text-[13px]">
              ↻
            </span>
            {cycleLabel}
          </Tooltip.Trigger>
          <Tooltip.Portal>
            <Tooltip.Positioner side="top" sideOffset={10}>
              <Tooltip.Popup className="border-rule bg-paper text-ink-faint tracking-label max-w-70 origin-(--transform-origin) border px-4 py-3 font-mono text-[10.5px] leading-[1.55] uppercase shadow-[0_10px_30px_-12px_rgba(30,22,14,0.25)] transition-[transform,opacity] duration-150 data-ending-style:scale-95 data-ending-style:opacity-0 data-starting-style:scale-95 data-starting-style:opacity-0">
                <RegenerateTooltipContent {...tooltip} />
              </Tooltip.Popup>
            </Tooltip.Positioner>
          </Tooltip.Portal>
        </Tooltip.Root>
      </Tooltip.Provider>
    </div>
  );
}
