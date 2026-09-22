/**
 * Signature marks for the Lab section — one per side project, each traced from
 * that project's own data rather than drawn by hand. The paths are baked, so
 * this page ships no geometry pipeline; the note above each constant says where
 * it came from.
 *
 * One drawing language across all three: a single line weight, no panel behind
 * it, and the only tonal value is a gradient that belongs to the line itself —
 * under it where the subject has ground beneath it, along it where the subject
 * is a path.
 *
 * They are illustrations, not live readouts: nothing here needs to change when
 * the source projects gain a pass, a building or a theme.
 */

const PLATE_W = 96;
const PLATE_H = 40;
const STROKE = 1.3;

/** Passo dello Stelvio, east ramp — `data/generated/profiles.json` in
 *  mdugue/alpen, key `passo-dello-stelvio:0`: 25.1 km, 2156 hm, 7.4 % average,
 *  909 m → 2779 m, resampled to 52 evenly spaced points. */
const STELVIO =
  "M0 39L1.9 38.9L3.8 38.7L5.6 38.3L7.5 37.3L9.4 37.3L11.3 36.5L13.2 36.1L15.1 35.5L16.9 34.8L18.8 34.5L20.7 33.7L22.6 32.6L24.5 31.5L26.4 31.6L28.2 30.5L30.1 30L32 29.2L33.9 28.5L35.8 28.4L37.6 27.7L39.5 26.2L41.4 26.3L43.3 25L45.2 23.6L47.1 22.7L48.9 22.3L50.8 22.7L52.7 21.5L54.6 19.6L56.5 18.9L58.4 18.2L60.2 17.5L62.1 16.1L64 15.6L65.9 15.1L67.8 13.8L69.6 12.8L71.5 11.6L73.4 10.1L75.3 10L77.2 8.2L79.1 8.2L80.9 7.3L82.8 6.8L84.7 5.3L86.6 4.6L88.5 4.6L90.4 3.2L92.2 1.8L94.1 1.9L96 1.4";

/** A 244 m slice of the Neumarkt from the LoD2 CityJSON tile 33410_5656_2_sn
 *  that mdugue/bridge renders: the upper envelope of 143 building objects,
 *  sampled by intersecting 76 vertical lines with every face. The Frauenkirche
 *  (object `DESNATPU1000DFTR`, whose attributes carry `"name": "Frauenkirche"`,
 *  plus its 62 parts) is one of them — 92 m against the block's 20-odd, so it
 *  carries the mark without being drawn any differently. */
const NEUMARKT =
  "M0 31.3L1.3 31.3L1.3 30.8L2.5 30.8L2.5 30.2L3.8 30.2L3.8 29.1L5.1 29.1L5.1 28.7L6.3 28.7L6.3 28.7L7.6 28.7L7.6 28.7L8.8 28.7L8.8 28.7L10.1 28.7L10.1 28.7L11.4 28.7L11.4 28.7L12.6 28.7L12.6 28.7L13.9 28.7L13.9 28.7L15.2 28.7L15.2 28.7L16.4 28.7L16.4 28.6L17.7 28.6L17.7 28.6L18.9 28.6L18.9 28.6L20.2 28.6L20.2 28.6L21.5 28.6L21.5 28.6L22.7 28.6L22.7 29.6L24 29.6L24 29.6L25.3 29.6L25.3 29.6L26.5 29.6L26.5 29.4L27.8 29.4L27.8 29.3L29.1 29.3L29.1 29.1L30.3 29.1L30.3 29.5L31.6 29.5L31.6 30.5L32.8 30.5L32.8 30.8L34.1 30.8L34.1 30.8L35.4 30.8L35.4 30.9L36.6 30.9L36.6 31.1L37.9 31.1L37.9 26.1L39.2 26.1L39.2 20.2L40.4 20.2L40.4 22.3L41.7 22.3L41.7 21.4L42.9 21.4L42.9 18.1L44.2 18.1L44.2 16.7L45.5 16.7L45.5 7.9L46.7 7.9L46.7 3.5L48 3.5L48 8.9L49.3 8.9L49.3 17.1L50.5 17.1L50.5 18.8L51.8 18.8L51.8 22.7L53.1 22.7L53.1 20.4L54.3 20.4L54.3 21.2L55.6 21.2L55.6 24.9L56.8 24.9L56.8 26.9L58.1 26.9L58.1 28.9L59.4 28.9L59.4 28.9L60.6 28.9L60.6 28.9L61.9 28.9L61.9 29.8L63.2 29.8L63.2 30L64.4 30L64.4 31.2L65.7 31.2L65.7 30.9L66.9 30.9L66.9 30L68.2 30L68.2 30L69.5 30L69.5 30L70.7 30L70.7 29.4L72 29.4L72 28.3L73.3 28.3L73.3 27.2L74.5 27.2L74.5 26.1L75.8 26.1L75.8 25.7L77.1 25.7L77.1 27.2L78.3 27.2L78.3 28.6L79.6 28.6L79.6 28.5L80.8 28.5L80.8 28.4L82.1 28.4L82.1 23.9L83.4 23.9L83.4 23.1L84.6 23.1L84.6 22.5L85.9 22.5L85.9 23.2L87.2 23.2L87.2 24.1L88.4 24.1L88.4 28.4L89.7 28.4L89.7 28.4L90.9 28.4L90.9 28.4L92.2 28.4L92.2 28.5L93.5 28.5L93.5 28.6L94.7 28.6L94.7 28.7L96 28.7";

/** The route of `SAMPLE_RUN` — `genOutBack(4.1, 140)` in mdugue/activity-card,
 *  one of the fixtures Effort renders its own sample cards from. Run the full
 *  width of the mark: the fixture is a shape from a generator rather than a
 *  recorded track, so there is no real geometry for the scaling to falsify. */
const TRACK =
  "M1.6 27.5L3.4 29.2L6 31.7L9.4 34.3L13.4 36L17.8 36.3L22.1 35L26.1 32.6L29.3 30L31.8 28.1L33.4 27.3L34.3 27.5L34.9 28.2L35.6 28.3L36.6 27.3L38.3 24.7L40.8 21.1L44.2 17.2L48.2 13.9L52.5 12L56.9 11.5L60.9 11.8L64.2 12.2L66.7 11.8L68.3 10.2L69.4 7.6L70 4.7L70.6 2.5L71.6 1.6L73.2 2.3L75.7 4.3L78.9 6.7L82.9 8.6L87.2 9.5L91.6 9.2L94.4 11L92.8 10.5L90.4 11.1L87.1 13.3L83.2 16.6L78.9 20.5L74.5 24L70.4 26.3L67 27.2L64.4 27.1L62.6 26.7L61.6 27L60.9 28.5L60.3 31.1L59.4 34.2L57.9 36.9L55.5 38.4L52.3 38.3L48.5 36.8L44.1 34.6L39.8 32.8L35.7 31.9L32.2 32.2L29.5 33.1L27.7 33.9L26.5 33.8L25.9 32.1L25.3 29.1L24.4 25.3L22.9 21.7L20.7 19.1L17.6 17.9L13.7 17.8L9.4 18.1L5 17.9L2.9 17.4";

/**
 * `ground` marks a subject that stands on something — a climb, a street. Its
 * line closes to the baseline and the gradient sits under it. A `path` has no
 * underside, so the gradient runs along the stroke instead.
 */
const MARKS = {
  alpen: { d: STELVIO, kind: "ground" },
  bridge: { d: NEUMARKT, kind: "ground" },
  effort: { d: TRACK, kind: "path" },
} as const;

export type MarkId = keyof typeof MARKS;

/**
 * A project's signature. Purely decorative — the heading and description beside
 * it carry the meaning, so it stays out of the accessibility tree.
 */
export function LabMark({ id }: { id: MarkId }) {
  const { d, kind } = MARKS[id];
  const gradientId = `lab-mark-${id}`;
  const onGround = kind === "ground";

  return (
    <svg
      aria-hidden="true"
      className="text-accent h-10 w-24 shrink-0"
      focusable="false"
      preserveAspectRatio="xMidYMid meet"
      viewBox={`0 0 ${PLATE_W} ${PLATE_H}`}
    >
      <defs>
        <linearGradient
          id={gradientId}
          x1="0"
          x2={onGround ? "0" : "1"}
          y1="0"
          y2={onGround ? "1" : "0"}
        >
          {onGround ? (
            <>
              <stop offset="0" stopColor="currentColor" stopOpacity={0.22} />
              <stop offset="1" stopColor="currentColor" stopOpacity={0.02} />
            </>
          ) : (
            <>
              <stop offset="0" stopColor="currentColor" stopOpacity={0.2} />
              <stop offset="0.55" stopColor="currentColor" stopOpacity={0.7} />
              <stop offset="1" stopColor="currentColor" stopOpacity={1} />
            </>
          )}
        </linearGradient>
      </defs>

      {onGround ? (
        <path
          d={`M0 ${PLATE_H}${d.replace("M", "L")}L${PLATE_W} ${PLATE_H}Z`}
          fill={`url(#${gradientId})`}
        />
      ) : null}

      <path
        d={d}
        fill="none"
        stroke={onGround ? "currentColor" : `url(#${gradientId})`}
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={STROKE}
      />
    </svg>
  );
}
