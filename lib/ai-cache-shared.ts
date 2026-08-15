export const AI_CACHE_TTL_SECONDS = 60 * 60 * 24;
export const AI_CACHE_TTL_MS = AI_CACHE_TTL_SECONDS * 1000;

/**
 * Bump whenever the cached payload shape changes (a renamed field, a new
 * required property, a different prompt contract).
 *
 * The API routes return cached text verbatim without re-validating it against
 * the current schema, so without this a shape change keeps serving
 * old-shaped entries — and therefore blank testimonials — until every entry
 * ages out of its 24h TTL.
 */
export const AI_CACHE_SHAPE_VERSION = 2;
