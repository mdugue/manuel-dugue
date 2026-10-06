"use client";

import { useSyncExternalStore } from "react";

import type { Locale } from "@/i18n/config";

const TICK_MS = 30_000;
const MINUTE_MS = 60_000;
const TIME_ZONE = "Europe/Berlin";
/** Reserves roughly the width of a time while the server renders none. */
const PLACEHOLDER = "00:00";

function subscribe(onTick: () => void): () => void {
  const id = setInterval(onTick, TICK_MS);
  return () => {
    clearInterval(id);
  };
}

/** The current minute; a primitive, so React only re-renders when it changes. */
const currentMinute = (): number => Math.floor(Date.now() / MINUTE_MS);

/** The server cannot know the visitor's moment of reading, so it renders none. */
const noMinute = (): null => null;

/**
 * Dresden's wall-clock time, refreshed every 30 seconds. Server and first client
 * render show an invisible placeholder, so hydration matches and nothing shifts.
 */
export function LocalTime({
  lang,
  template,
}: {
  lang: Locale;
  template: string;
}) {
  const minute = useSyncExternalStore(subscribe, currentMinute, noMinute);
  const [before = "", after = ""] = template.split("{time}");

  const time =
    minute === null
      ? null
      : new Intl.DateTimeFormat(lang, {
          hour: "2-digit",
          minute: "2-digit",
          timeZone: TIME_ZONE,
        }).format(new Date(minute * MINUTE_MS));

  return (
    <span>
      {before}
      {time === null ? (
        <span aria-hidden="true" className="invisible">
          {PLACEHOLDER}
        </span>
      ) : (
        <time className="tabular-nums">{time}</time>
      )}
      {after}
    </span>
  );
}
