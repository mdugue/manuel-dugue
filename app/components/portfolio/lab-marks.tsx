/**
 * Signature marks for the Lab section — one per side project, each traced from
 * that project's own data rather than drawn by hand. The paths are baked, so
 * this page ships no geometry pipeline; the note above each constant says where
 * it came from.
 *
 * All three share one 96×40 plate and one composition: a hero the row is about,
 * and fainter real neighbours around it that carry the plate's full width. That
 * way nothing has to be stretched to fill the box — the Frauenkirche is taller
 * than it is wide and stays that way, standing in the block it actually stands
 * in.
 *
 * They are illustrations, not live readouts: nothing here needs to change when
 * the source projects gain a pass, a building or a theme.
 */

const PLATE_W = 96;
const PLATE_H = 40;

/* ── alpen ─────────────────────────────────────────────────────────────────
 * Three climbs from `data/generated/profiles.json`, drawn to one shared scale
 * (the Stelvio's 25.1 km and 1870 m of relief), so the shorter ones really are
 * shorter. Hero: Passo dello Stelvio, east ramp — 25.1 km, 2156 hm, 7.4 %.
 * Behind it: Mont Ventoux (21.8 km, 7.1 %) and the Mortirolo (11.5 km, 11.4 %),
 * whose wall of a gradient is why it ends early and high.
 */
const STELVIO =
  "M0 39L2 38.9L3.9 38.7L6 38.3L8 37.3L10.7 36.9L12.4 35.8L15 35.5L16.1 35.1L18.5 34.5L20.1 33.7L22.8 32.6L24.4 31.5L25.6 31.6L28.3 30.5L30.5 30L32.7 28.4L34.7 28.7L36.4 27.3L38.6 26.7L41.2 26.3L43.2 25L45.7 23.6L47.2 22.7L49.2 22.9L50.7 22.7L53.3 20.9L55.2 19.6L57 18.9L58.8 18.2L61.6 16.5L63.6 15.6L65.3 15.1L67.4 13.8L69 13.1L71.2 11.6L73.8 10.1L75.4 10L77.7 8.2L78.8 8.2L81.2 6.6L84 6.1L85.8 5.6L87.9 4.6L90.2 3.2L92.2 1.8L94.1 1.9L96 1.4";
const VENTOUX =
  "M0 38.5L2.8 38.9L5.1 38.6L8.5 38.1L9.8 37.8L13.3 37.3L16.8 36.3L18.7 35.8L20.9 35.2L24.4 33.4L27.1 31.6L30 30.3L32.4 29.3L35.4 27.3L37.7 26.5L40.5 25L43.3 23.6L46.3 22L48.8 20.8L50.9 19.9L53.9 18.2L56.3 17.5L59 16.1L61.7 15.4L64.8 14.1L67.4 12.9L70 12.4L72.4 11L75.3 10.1L77.7 9L80.1 8.8L83.5 7";
const MORTIROLO =
  "M0 39L1.5 38.5L2.8 37.4L4.2 37L5.6 35.3L7.2 33.9L8.6 33.4L9.7 32.9L11.3 32L13 30L14.1 29.5L16 28.4L17 27.2L18.4 26.4L19.9 25.6L21.3 24.5L22.7 23.3L23.8 22.7L25.5 21.6L26.9 21L29 19.6L29.7 19.3L31.3 18.6L32.9 17.5L34.2 17.1L35.5 16.1L37 15.4L38.3 14.7L39.8 14.1L41.4 13.3L42.7 12.6L44 12.3";

/* ── bridge ────────────────────────────────────────────────────────────────
 * A 244 m slice of the Neumarkt, from the LoD2 CityJSON tile 33410_5656_2_sn
 * that mdugue/bridge renders — upper envelopes sampled by intersecting vertical
 * lines with every face. Hero: the Frauenkirche (object `DESNATPU1000DFTR`,
 * whose attributes carry `"name": "Frauenkirche"`, plus its 62 parts) — 54 m
 * wide, 92 m to the tip of the lantern, drawn only over its own footprint.
 * Behind it: the 80 buildings that share the slice, at the same metric scale.
 */
const FRAUENKIRCHE =
  "M37.4 28L37.8 28L37.8 26.7L38.1 26.7L38.1 26.3L38.5 26.3L38.5 25.2L38.8 25.2L38.8 22.8L39.2 22.8L39.2 22.3L39.5 22.3L39.5 20.5L39.9 20.5L39.9 19.5L40.2 19.5L40.2 19.4L40.6 19.4L40.6 20.5L40.9 20.5L40.9 22.3L41.3 22.3L41.3 22.8L41.6 22.8L41.6 23.7L42 23.7L42 22.5L42.3 22.5L42.3 20.4L42.7 20.4L42.7 19.4L43.1 19.4L43.1 18.7L43.4 18.7L43.4 18.1L43.8 18.1L43.8 17.6L44.1 17.6L44.1 17.3L44.5 17.3L44.5 16.9L44.8 16.9L44.8 16.6L45.2 16.6L45.2 15L45.5 15L45.5 9L45.9 9L45.9 7.9L46.2 7.9L46.2 7.6L46.6 7.6L46.6 4.9L46.9 4.9L46.9 2.4L47.3 2.4L47.3 4.2L47.6 4.2L47.6 7.5L48 7.5L48 7.8L48.4 7.8L48.4 8.5L48.7 8.5L48.7 15L49.1 15L49.1 16.6L49.4 16.6L49.4 16.8L49.8 16.8L49.8 17.1L50.1 17.1L50.1 17.5L50.5 17.5L50.5 17.9L50.8 17.9L50.8 18.5L51.2 18.5L51.2 19.1L51.5 19.1L51.5 20.1L51.9 20.1L51.9 21.4L52.2 21.4L52.2 22.6L52.6 22.6L52.6 23.1L52.9 23.1L52.9 22.5L53.3 22.5L53.3 21L53.7 21L53.7 20L54 20L54 18.9L54.4 18.9L54.4 20L54.7 20L54.7 21L55.1 21L55.1 22.5L55.4 22.5L55.4 23.7L55.8 23.7L55.8 24.4L56.1 24.4L56.1 25.1L56.5 25.1L56.5 25.8L56.8 25.8L56.8 26.4L57.2 26.4L57.2 26.8L57.5 26.8L57.5 27.1L57.9 27.1L57.9 27.4L58.2 27.4L58.2 27.8L58.6 27.8";
const NEUMARKT =
  "M0 31.2L1.8 31.2L1.8 30.6L3.6 30.6L3.6 29.1L5.3 29.1L5.3 28.7L7.1 28.7L7.1 28.7L8.9 28.7L8.9 28.7L10.7 28.7L10.7 28.7L12.4 28.7L12.4 28.7L14.2 28.7L14.2 28.7L16 28.7L16 28.6L17.8 28.6L17.8 28.6L19.6 28.6L19.6 28.6L21.3 28.6L21.3 28.6L23.1 28.6L23.1 29.6L24.9 29.6L24.9 29.6L26.7 29.6L26.7 29.4L28.4 29.4L28.4 29.1L30.2 29.1L30.2 29.6L32 29.6L32 30.8L33.8 30.8L33.8 30.8L35.6 30.8L35.6 30.9L37.3 30.9L37.3 30.7L39.1 30.7L39.1 29.8L40.9 29.8L40.9 29.5L42.7 29.5L42.7 29.3L44.4 29.3L44.4 29.3L46.2 29.3L46.2 29.2L48 29.2L48 29.2L49.8 29.2L49.8 29.2L51.6 29.2L51.6 28.9L53.3 28.9L53.3 28.9L55.1 28.9L55.1 28.4L56.9 28.4L56.9 28.9L58.7 28.9L58.7 28.9L60.4 28.9L60.4 28.9L62.2 28.9L62.2 29.8L64 29.8L64 31.2L65.8 31.2L65.8 30L67.6 30L67.6 30L69.3 30L69.3 30L71.1 30L71.1 28.9L72.9 28.9L72.9 27.3L74.7 27.3L74.7 25.7L76.4 25.7L76.4 26.8L78.2 26.8L78.2 28.6L80 28.6L80 28.5L81.8 28.5L81.8 24L83.6 24L83.6 22.8L85.3 22.8L85.3 23L87.1 23L87.1 24.4L88.9 24.4L88.9 28.4L90.7 28.4L90.7 28.4L92.4 28.4L92.4 28.6L94.2 28.6L94.2 28.7L96 28.7";

/* ── effort ────────────────────────────────────────────────────────────────
 * The three legs of the `SAMPLE_TRI` fixture in mdugue/activity-card, the
 * IRONMAN 70.3 the app renders its own sample cards from. Hero: the 90 km bike
 * leg, `genLoop(0.7, 140)`. Beside it the 1.9 km swim and the 21.1 km run.
 * Each keeps its own proportions — a trace that has been stretched is a
 * different route — but they are laid out as a row rather than in the fixture's
 * shared coordinates, which would leave two thirds of the plate empty.
 */
const TRI_BIKE =
  "M61.6 21L61.4 20.1L61 19.1L60.3 18.1L59.4 16.9L58.4 15.6L57.2 14.2L55.9 12.8L54.6 11.5L53.3 10.2L52.1 9L50.9 8L49.9 7.3L48.9 6.7L48 6.4L47.1 6.4L46.4 6.5L45.6 6.8L44.9 7.3L44.1 7.8L43.3 8.4L42.5 8.9L41.6 9.5L40.6 10L39.7 10.4L38.7 10.9L37.7 11.3L36.8 11.8L35.9 12.4L35.2 13L34.6 13.8L34.2 14.8L34 15.8L34 17L34.2 18.3L34.6 19.6L35.2 20.9L36 22.2L36.8 23.3L37.8 24.2L38.7 25L39.7 25.6L40.6 26L41.4 26.2L42.1 26.3L42.8 26.4L43.3 26.4L43.7 26.5L44.1 26.7L44.4 27.1L44.8 27.7L45.2 28.4L45.6 29.2L46.2 30.1L46.8 31.1L47.7 32L48.7 32.8L49.8 33.4L51.1 33.6L52.5 33.6L53.9 33.1L55.4 32.3L56.8 31.2L58.2 29.7L59.4 28.1L60.4 26.2L61.2 24.3L61.7 22.5L62 20.7L62 19.2L61.9 18.5Z";
const TRI_SWIM =
  "M2 18.8L2.8 18.2L3.6 17.8L4.4 17.5L5.2 17.4L5.9 17.2L6.5 17.1L7.1 16.9L7.6 16.7L8 16.3L8.4 15.9L8.7 15.3L8.9 14.7L9.2 14.1L9.3 13.5L9.5 13.1L9.6 12.8L9.8 12.7L10 12.8L10.2 13.1L10.5 13.6L10.8 14.3L11.2 15.1L11.6 16L12.1 16.8L12.7 17.6L13.3 18.3L14 18.8L14.8 19.3L15.6 19.6L16.4 19.8L17.2 20L18 20.2L18.8 20.5L19.6 20.8L20.4 21.3L21 21.9L21.7 22.6L22.2 23.4L22.7 24.2L23.2 25.1L23.5 25.8L23.8 26.5L24.1 27L24.3 27.3L24.5 27.3L24.6 27.2L24.8 26.8L25 26.3L25.1 25.8L25.4 25.2L25.6 24.6L26 24L26.3 23.6L26.8 23.3L27.3 23L27.9 22.9L28.5 22.7L29.2 22.6L30 22.4";
const TRI_RUN =
  "M68.3 9L68.8 10.7L69 13.7L69.4 16.2L70.1 17.4L71.3 17.4L73 17.4L74.8 18.8L76.5 21.7L77.9 24.8L78.8 26.8L79.3 26.9L79.5 25.9L79.9 25.3L80.6 26L81.8 27.7L83.4 28.8L85.2 28.3L87 26L88.4 23.2L89.3 21.3L89.7 20.9L90 21.1L90.3 20.5L91 18.4L91.7 16.7L91.2 13.9L90.9 12.6L90.6 13L89.9 13.8L88.7 13.6L87.1 12.2L85.3 10.4L83.6 9.7L82.1 10.9L81.2 13.4L80.7 15.8L80.5 16.9L80.1 16.7L79.5 16.6L78.3 17.9L76.7 20.7L74.9 24.1L73.1 26.4L71.7 26.9L70.7 26.4L70.2 26L70 27L69.7 29L69 30.7L68.5 31";

/**
 * A layer of a mark. `floor` names the x-range over which the line closes
 * against the plate's baseline to become a solid — a climb and a building have
 * ground under them, a GPS trace does not. The range matches the line's own
 * first and last x, so the solid is the line's own body, never a box around it.
 */
interface MarkLayer {
  d: string;
  floor?: readonly [number, number];
}

const MARKS = {
  alpen: {
    context: [{ d: VENTOUX }, { d: MORTIROLO }],
    hero: { d: STELVIO, floor: [0, PLATE_W] },
  },
  bridge: {
    context: [{ d: NEUMARKT, floor: [0, PLATE_W] }],
    hero: { d: FRAUENKIRCHE, floor: [37.4, 58.6] },
  },
  effort: {
    context: [{ d: TRI_SWIM }, { d: TRI_RUN }],
    hero: { d: TRI_BIKE },
  },
} as const satisfies Record<
  string,
  { context: readonly MarkLayer[]; hero: MarkLayer }
>;

export type MarkId = keyof typeof MARKS;

/** The line closed down to the baseline across its own footprint. */
function solidOf({ d, floor }: MarkLayer): string | null {
  if (!floor) {
    return null;
  }
  return `M${floor[0]} ${PLATE_H}${d.replace("M", "L")}L${floor[1]} ${PLATE_H}Z`;
}

function Layer({ layer, hero }: { layer: MarkLayer; hero: boolean }) {
  const solid = solidOf(layer);

  return (
    <>
      {solid ? (
        <path d={solid} fill="currentColor" fillOpacity={hero ? 0.22 : 0.13} />
      ) : null}
      <path
        d={layer.d}
        fill="none"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeOpacity={hero ? 1 : 0.34}
        strokeWidth={hero ? 1.2 : 0.75}
      />
    </>
  );
}

/**
 * A project's signature. Purely decorative — the heading and description beside
 * it carry the meaning, so it stays out of the accessibility tree.
 */
export function LabMark({ id }: { id: MarkId }) {
  const { context, hero } = MARKS[id];
  const washId = `lab-wash-${id}`;

  return (
    <svg
      aria-hidden="true"
      className="text-accent h-10 w-24 shrink-0"
      focusable="false"
      preserveAspectRatio="xMidYMid meet"
      viewBox={`0 0 ${PLATE_W} ${PLATE_H}`}
    >
      <defs>
        <linearGradient id={washId} x1="0" x2="0" y1="0" y2="1">
          <stop offset="0" stopColor="currentColor" stopOpacity={0.02} />
          <stop offset="1" stopColor="currentColor" stopOpacity={0.085} />
        </linearGradient>
      </defs>
      <rect fill={`url(#${washId})`} height={PLATE_H} width={PLATE_W} />
      <line
        stroke="currentColor"
        strokeOpacity={0.22}
        strokeWidth={0.5}
        x1="0"
        x2={PLATE_W}
        y1={PLATE_H - 0.4}
        y2={PLATE_H - 0.4}
      />
      {context.map((layer) => (
        <Layer hero={false} key={layer.d} layer={layer} />
      ))}
      <Layer hero={true} layer={hero} />
    </svg>
  );
}
