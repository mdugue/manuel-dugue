/**
 * Signature marks for the Lab section — one per side project, each traced from
 * that project's own data rather than drawn by hand. The paths are baked, so
 * this page ships no geometry pipeline; the provenance note above each constant
 * says where it came from and how to reproduce it.
 *
 * They are illustrations, not live readouts: nothing here needs to change when
 * the source projects gain a pass, a building or a theme.
 */

/** Every mark is 40 units tall and takes the width its own data asks for, so a
 *  tall subject stays tall instead of being flattened into the widest box. */
const MARK_HEIGHT = 40;

/** Passo dello Stelvio, east ramp — `data/generated/profiles.json` in
 *  mdugue/alpen, key `passo-dello-stelvio:0`: 25.1 km, 2156 hm, 7.4 % average,
 *  909 m → 2779 m, resampled to 48 evenly spaced points. */
const STELVIO_PROFILE =
  "M0 38.5L2 38.4L4.1 38.2L6.1 37.8L8.2 36.9L10.2 36.5L12.3 35.4L14.3 35.1L16.3 34.7L18.4 34.1L20.4 33.3L22.5 32.2L24.5 31.2L26.6 31.3L28.6 30.2L30.6 29.8L32.7 28.2L34.7 28.4L36.8 27.1L38.8 26.5L40.9 26.1L42.9 24.8L44.9 23.5L47 22.6L49 22.9L51.1 22.6L53.1 20.9L55.1 19.6L57.2 19L59.2 18.2L61.3 16.6L63.3 15.7L65.4 15.2L67.4 14L69.4 13.3L71.5 11.8L73.5 10.4L75.6 10.2L77.6 8.5L79.7 8.5L81.7 7L83.7 6.4L85.8 5.9L87.8 5L89.9 3.6L91.9 2.3L94 2.4L96 1.9";

/** The Frauenkirche, seen from the east — the upper envelope of the building
 *  `DESNATPU1000DFTR` (it carries `"name": "Frauenkirche"`) and its 62 parts in
 *  the LoD2 CityJSON tile 33410_5656_2_sn that mdugue/bridge renders: 54 m wide,
 *  92 m to the tip of the lantern, sampled by intersecting 44 vertical lines
 *  with every face. Its true proportions, which is why it is narrow. */
const FRAUENKIRCHE =
  "M0 40L0 26.7L0.5 26.7L0.5 26.2L1.1 26.2L1.1 25.6L1.6 25.6L1.6 22L2.1 22L2.1 20L2.7 20L2.7 18.4L3.2 18.4L3.2 18.8L3.7 18.8L3.7 21.5L4.3 21.5L4.3 22.1L4.8 22.1L4.8 22L5.3 22L5.3 19.7L5.8 19.7L5.8 18.2L6.4 18.2L6.4 17.2L6.9 17.2L6.9 16.4L7.4 16.4L7.4 15.9L8 15.9L8 15.4L8.5 15.4L8.5 13.5L9 13.5L9 6.3L9.6 6.3L9.6 5.4L10.1 5.4L10.1 2.1L10.6 2.1L10.6 0L11.2 0L11.2 5.1L11.7 5.1L11.7 5.6L12.2 5.6L12.2 7.2L12.8 7.2L12.8 15.2L13.3 15.2L13.3 15.5L13.8 15.5L13.8 16.1L14.4 16.1L14.4 16.7L14.9 16.7L14.9 17.6L15.4 17.6L15.4 18.8L16 18.8L16 20.8L16.5 20.8L16.5 22.2L17 22.2L17 21.9L17.5 21.9L17.5 19.9L18.1 19.9L18.1 18.3L18.6 18.3L18.6 18.9L19.1 18.9L19.1 21.5L19.7 21.5L19.7 22.2L20.2 22.2L20.2 23.8L20.7 23.8L20.7 24.9L21.3 24.9L21.3 26L21.8 26L21.8 26.5L22.3 26.5L22.3 27L22.9 27L22.9 27.5L23.4 27.5L23.4 40Z";

/** A closed circuit — `genLoop(0.7, 140)` in mdugue/activity-card, the bike leg
 *  of the `SAMPLE_TRI` fixture Effort renders its own sample cards from. Fitted
 *  without distortion: a trace that has been stretched is a different route,
 *  which is why it fills the box's height but not its width. */
const SAMPLE_TRACE =
  "M39 21.3L38.7 20.1L38.1 18.8L37.2 17.4L36 15.8L34.6 14L32.9 12.2L31.2 10.3L29.5 8.4L27.7 6.7L26.1 5.1L24.5 3.8L23 2.7L21.7 2L20.5 1.6L19.3 1.5L18.3 1.7L17.3 2.1L16.3 2.7L15.2 3.5L14.2 4.2L13 5L11.8 5.7L10.5 6.4L9.2 7L7.8 7.6L6.5 8.2L5.2 8.9L4.1 9.6L3.1 10.5L2.3 11.6L1.8 12.9L1.5 14.4L1.5 16L1.8 17.7L2.4 19.5L3.2 21.3L4.2 22.9L5.3 24.5L6.6 25.8L7.9 26.8L9.2 27.6L10.4 28.1L11.5 28.4L12.5 28.6L13.4 28.6L14.1 28.7L14.7 28.8L15.2 29.1L15.7 29.7L16.1 30.4L16.6 31.3L17.2 32.5L18 33.8L18.9 35.1L20.1 36.3L21.4 37.4L23 38.1L24.7 38.5L26.6 38.4L28.5 37.8L30.5 36.7L32.5 35.2L34.3 33.2L35.9 30.9L37.3 28.5L38.4 25.9L39.1 23.4L39.5 21L39.5 18.9L39.3 17.9Z";

/**
 * How each mark is rendered, and how wide its data makes it. An elevation
 * profile is an open line closed against the baseline; a building is a solid
 * and carries a faint wash; a GPS trace is a path and stays an open stroke.
 */
const MARKS = {
  alpen: { d: STELVIO_PROFILE, fill: "baseline", stroke: 1.3, width: 96 },
  bridge: { d: FRAUENKIRCHE, fill: "self", stroke: 0.7, width: 23.4 },
  effort: { d: SAMPLE_TRACE, fill: "none", stroke: 1.5, width: 96 },
} as const;

export type MarkId = keyof typeof MARKS;

/**
 * A project's signature. Purely decorative — the heading and description beside
 * it carry the meaning, so it stays out of the accessibility tree.
 */
export function LabMark({ id }: { id: MarkId }) {
  const { d, fill, width, stroke } = MARKS[id];

  return (
    <svg
      aria-hidden="true"
      className="text-accent h-10 w-24 shrink-0"
      focusable="false"
      preserveAspectRatio="xMinYMid meet"
      viewBox={`0 0 ${width} ${MARK_HEIGHT}`}
    >
      {fill === "baseline" ? (
        <path
          d={`${d}L${width} ${MARK_HEIGHT}L0 ${MARK_HEIGHT}Z`}
          fill="currentColor"
          fillOpacity={0.1}
        />
      ) : null}
      <path
        d={d}
        fill={fill === "self" ? "currentColor" : "none"}
        fillOpacity={fill === "self" ? 0.12 : undefined}
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={stroke}
      />
    </svg>
  );
}
