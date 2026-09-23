/**
 * Request header the proxy sets to the requested path. The global 404 renders
 * outside the route tree — its router pathname is `/_not-found` — so this is
 * how it learns which locale and address the visitor asked for.
 */
export const REQUEST_PATH_HEADER = "x-request-path";
