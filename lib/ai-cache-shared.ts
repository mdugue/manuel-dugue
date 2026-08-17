export const AI_CACHE_TTL_SECONDS = 60 * 60 * 24;
export const AI_CACHE_TTL_MS = AI_CACHE_TTL_SECONDS * 1000;

/** Bump on any payload shape change: cached text is served without revalidation. */
export const AI_CACHE_SHAPE_VERSION = 2;
