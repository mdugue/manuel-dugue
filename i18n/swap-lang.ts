import type { Route } from "next";
import type { Locale } from "./config";

const LOCALE_PREFIX_RE = /^\/[a-z]{2}(?=\/|$)/;

export function swapLang(pathname: string, target: Locale): Route {
  return pathname.replace(LOCALE_PREFIX_RE, `/${target}`) as Route;
}
