/**
 * Signature marks for the Lab section — one per side project, each traced from
 * that project's own data rather than drawn by hand. The paths are baked at
 * 96×40 so this page ships no geometry pipeline; the provenance note above each
 * constant says where it came from and how to reproduce it.
 *
 * They are illustrations, not live readouts: nothing here needs to change when
 * the source projects gain a pass, a building or a theme.
 */

const VIEW_BOX = "0 0 96 40";

/** Passo dello Stelvio, east ramp — `data/generated/profiles.json` in
 *  mdugue/alpen, key `passo-dello-stelvio:0`: 25.1 km, 2156 hm, 7.4 % average,
 *  909 m → 2779 m, resampled to 48 evenly spaced points. */
const STELVIO_PROFILE =
  "M0 38.5L2 38.4L4.1 38.2L6.1 37.8L8.2 36.9L10.2 36.5L12.3 35.4L14.3 35.1L16.3 34.7L18.4 34.1L20.4 33.3L22.5 32.2L24.5 31.2L26.6 31.3L28.6 30.2L30.6 29.8L32.7 28.2L34.7 28.4L36.8 27.1L38.8 26.5L40.9 26.1L42.9 24.8L44.9 23.5L47 22.6L49 22.9L51.1 22.6L53.1 20.9L55.1 19.6L57.2 19L59.2 18.2L61.3 16.6L63.3 15.7L65.4 15.2L67.4 14L69.4 13.3L71.5 11.8L73.5 10.4L75.6 10.2L77.6 8.5L79.7 8.5L81.7 7L83.7 6.4L85.8 5.9L87.8 5L89.9 3.6L91.9 2.3L94 2.4L96 1.9";

/** Dresden's roofline — LoD2 CityJSON tile 33412_5656_2_sn in mdugue/bridge:
 *  3731 buildings binned across 2227 m of easting, the tallest 83.5 m above the
 *  median ground level. A real cross-section of the tile, not a drawn skyline. */
const DRESDEN_SKYLINE =
  "M0 40L0 23.8L1.7 23.8L1.7 23.7L3.4 23.7L3.4 16.9L5.1 16.9L5.1 16.9L6.9 16.9L6.9 17.3L8.6 17.3L8.6 18.1L10.3 18.1L10.3 10.5L12 10.5L12 10.5L13.7 10.5L13.7 15L15.4 15L15.4 23.2L17.1 23.2L17.1 24.8L18.9 24.8L18.9 24.8L20.6 24.8L20.6 24.8L22.3 24.8L22.3 26.9L24 26.9L24 27.4L25.7 27.4L25.7 27.5L27.4 27.5L27.4 27.2L29.1 27.2L29.1 27.2L30.9 27.2L30.9 23.8L32.6 23.8L32.6 23.8L34.3 23.8L34.3 23.8L36 23.8L36 3L37.7 3L37.7 3L39.4 3L39.4 24L41.1 24L41.1 24L42.9 24L42.9 23.8L44.6 23.8L44.6 23.8L46.3 23.8L46.3 23.8L48 23.8L48 23.9L49.7 23.9L49.7 18.6L51.4 18.6L51.4 18.6L53.1 18.6L53.1 18.6L54.9 18.6L54.9 18.6L56.6 18.6L56.6 18.6L58.3 18.6L58.3 18.6L60 18.6L60 19.2L61.7 19.2L61.7 24.1L63.4 24.1L63.4 23.9L65.1 23.9L65.1 23.9L66.9 23.9L66.9 24.2L68.6 24.2L68.6 24L70.3 24L70.3 24L72 24L72 18.6L73.7 18.6L73.7 18.6L75.4 18.6L75.4 18.7L77.1 18.7L77.1 8.5L78.9 8.5L78.9 8.5L80.6 8.5L80.6 27.4L82.3 27.4L82.3 27.4L84 27.4L84 27.4L85.7 27.4L85.7 27.7L87.4 27.7L87.4 36.6L89.1 36.6L89.1 36.6L90.9 36.6L90.9 36.6L92.6 36.6L92.6 36.6L94.3 36.6L94.3 36.6L96 36.6L96 40Z";

/** A closed circuit — `genLoop(0.7, 140)` in mdugue/activity-card, the bike leg
 *  of the `SAMPLE_TRI` fixture Effort renders its own sample cards from. Fitted
 *  without distortion: a trace that has been stretched is a different route,
 *  which is why it fills the box's height but not its width. */
const SAMPLE_TRACE =
  "M39 21.3L38.7 20.1L38.1 18.8L37.2 17.4L36 15.8L34.6 14L32.9 12.2L31.2 10.3L29.5 8.4L27.7 6.7L26.1 5.1L24.5 3.8L23 2.7L21.7 2L20.5 1.6L19.3 1.5L18.3 1.7L17.3 2.1L16.3 2.7L15.2 3.5L14.2 4.2L13 5L11.8 5.7L10.5 6.4L9.2 7L7.8 7.6L6.5 8.2L5.2 8.9L4.1 9.6L3.1 10.5L2.3 11.6L1.8 12.9L1.5 14.4L1.5 16L1.8 17.7L2.4 19.5L3.2 21.3L4.2 22.9L5.3 24.5L6.6 25.8L7.9 26.8L9.2 27.6L10.4 28.1L11.5 28.4L12.5 28.6L13.4 28.6L14.1 28.7L14.7 28.8L15.2 29.1L15.7 29.7L16.1 30.4L16.6 31.3L17.2 32.5L18 33.8L18.9 35.1L20.1 36.3L21.4 37.4L23 38.1L24.7 38.5L26.6 38.4L28.5 37.8L30.5 36.7L32.5 35.2L34.3 33.2L35.9 30.9L37.3 28.5L38.4 25.9L39.1 23.4L39.5 21L39.5 18.9L39.3 17.9Z";

/**
 * How each mark is rendered. A profile and a skyline are functions of distance,
 * so they read best closed against the baseline with a faint wash under them; a
 * GPS trace is a path and stays an open stroke.
 */
const MARKS = {
  alpen: { d: STELVIO_PROFILE, fill: "baseline", width: 1.3 },
  bridge: { d: DRESDEN_SKYLINE, fill: "self", width: 0.9 },
  effort: { d: SAMPLE_TRACE, fill: "none", width: 1.5 },
} as const;

export type MarkId = keyof typeof MARKS;

/**
 * A project's signature. Purely decorative — the heading and description beside
 * it carry the meaning, so it stays out of the accessibility tree.
 */
export function LabMark({ id }: { id: MarkId }) {
  const { d, fill, width } = MARKS[id];

  return (
    <svg
      aria-hidden="true"
      className="text-accent h-10 w-24 shrink-0"
      focusable="false"
      preserveAspectRatio="xMinYMid meet"
      viewBox={VIEW_BOX}
    >
      {fill === "baseline" ? (
        <path d={`${d}L96 40L0 40Z`} fill="currentColor" fillOpacity={0.1} />
      ) : null}
      <path
        d={d}
        fill={fill === "self" ? "currentColor" : "none"}
        fillOpacity={fill === "self" ? 0.12 : undefined}
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={width}
      />
    </svg>
  );
}
