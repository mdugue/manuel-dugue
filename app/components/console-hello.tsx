"use client";

import { useEffect } from "react";

const TITLE_STYLE = "font: italic 20px Georgia; color: #c2188f";

/** Strict Mode and locale switches remount the layout; greet once per load. */
let greeted = false;

/** A note for whoever opens the developer tools. Renders nothing. */
export function ConsoleHello({ message }: { message: string }) {
  useEffect(() => {
    if (greeted) {
      return;
    }
    greeted = true;
    console.info("%cmanuel/fyi", TITLE_STYLE, `\n${message}`);
  }, [message]);

  return null;
}
