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

export function AiControls({
  modelId,
  position,
  cycleLabel,
  onRegenerate,
  disabled,
  tooltip,
  className,
}: {
  modelId: string;
  position: string;
  cycleLabel: string;
  onRegenerate: () => void;
  disabled: boolean;
  tooltip: RegenerateTooltip;
  className?: string;
}) {
  return (
    <div
      className={`flex flex-wrap items-center justify-between gap-4 font-mono text-ink-faint text-nano uppercase tracking-label ${className}`}
    >
      <div className="flex flex-wrap gap-4.5">
        <span>model: {modelId}</span>
        <span>{position}</span>
      </div>
      <Tooltip.Provider closeDelay={80} delay={250}>
        <Tooltip.Root>
          <Tooltip.Trigger
            className="inline-flex cursor-pointer items-center gap-2 border border-rule bg-none px-3.5 py-2 font-inherit text-ink-soft uppercase tracking-label transition-colors hover:border-accent hover:text-accent focus-visible:border-accent focus-visible:text-accent focus-visible:outline-2 focus-visible:outline-accent focus-visible:outline-offset-2 disabled:cursor-not-allowed disabled:opacity-40"
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
              <Tooltip.Popup className="max-w-70 origin-(--transform-origin) border border-rule bg-paper px-4 py-3 font-mono text-[10.5px] text-ink-faint uppercase leading-[1.55] tracking-label shadow-[0_10px_30px_-12px_rgba(30,22,14,0.25)] transition-[transform,opacity] duration-150 data-ending-style:scale-95 data-starting-style:scale-95 data-ending-style:opacity-0 data-starting-style:opacity-0">
                <RegenerateTooltipContent {...tooltip} />
              </Tooltip.Popup>
            </Tooltip.Positioner>
          </Tooltip.Portal>
        </Tooltip.Root>
      </Tooltip.Provider>
    </div>
  );
}

function subscribeNow(onTick: () => void) {
  const id = setInterval(onTick, 30_000);
  return () => clearInterval(id);
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
        <div className="text-[9.5px] text-ink-faint">{labels.nextModel}</div>
        <div className="mt-0.5 font-medium text-[12px] text-ink-soft normal-case tracking-label">
          {nextModelLabel}
        </div>
      </div>
      <div className="mt-1 flex flex-col gap-1 border-rule border-t border-dashed pt-2">
        {cached && now !== null && nextModelExpiresAt !== null ? (
          <>
            <div className="text-accent">
              {labels.cached}{" "}
              <span className="text-ink-soft normal-case">
                {formatRelative(locale, nextModelExpiresAt - now)}
              </span>
            </div>
            <div className="text-[11px] text-ink-faint normal-case tracking-normal">
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
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  }).format(new Date(at));
}
