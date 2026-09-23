/** Where a dead address most likely meant to go. */
export type RouteGuess =
  | "contact"
  | "curriculum-vitae"
  | "home"
  | "lab"
  | "legal"
  | "privacy"
  | "skill-profile";

/**
 * Spellings people and old links use for each destination, across the four
 * locales — normalised: lowercase, no accents, letters and digits only.
 */
const KNOWN: Record<string, RouteGuess> = {
  about: "home",
  accueil: "home",
  apropos: "home",
  avisolegal: "legal",
  competences: "skill-profile",
  confidentialite: "privacy",
  contact: "contact",
  contacto: "contact",
  curriculo: "curriculum-vitae",
  curriculum: "curriculum-vitae",
  curriculumvitae: "curriculum-vitae",
  cv: "curriculum-vitae",
  datenschutz: "privacy",
  datenschutzerklaerung: "privacy",
  datenschutzerklarung: "privacy",
  dsgvo: "privacy",
  gdpr: "privacy",
  habilidades: "skill-profile",
  home: "home",
  impressum: "legal",
  imprint: "legal",
  index: "home",
  inicio: "home",
  kompetenzen: "skill-profile",
  kompetenzprofil: "skill-profile",
  kontakt: "contact",
  lab: "lab",
  labor: "lab",
  laboratoire: "lab",
  laboratorio: "lab",
  lebenslauf: "curriculum-vitae",
  legal: "legal",
  legalnotice: "legal",
  mentionslegales: "legal",
  perfil: "skill-profile",
  perfildehabilidades: "skill-profile",
  privacidad: "privacy",
  privacy: "privacy",
  privacypolicy: "privacy",
  profil: "skill-profile",
  profildecompetences: "skill-profile",
  profile: "skill-profile",
  projects: "lab",
  projekte: "lab",
  projets: "lab",
  proyectos: "lab",
  resume: "curriculum-vitae",
  rgpd: "privacy",
  skillprofil: "skill-profile",
  skillprofile: "skill-profile",
  skills: "skill-profile",
  sobremi: "home",
  start: "home",
  startseite: "home",
  ubermich: "home",
  uebermich: "home",
  vita: "curriculum-vitae",
};

/** One typo per four characters, never more than two — enough for
 *  "curriculum-vita" or "impresum", too little to turn "xyz" into anything. */
const CHARS_PER_TYPO = 4;
const MAX_TYPOS = 2;

/** Known spellings at least this long also count as a prefix, which catches
 *  file names like "lebenslauf-manuel-dugue.pdf". */
const MIN_PREFIX_LENGTH = 5;

const FILE_EXTENSION = /\.(?:aspx?|html?|md|pdf|php)$/u;
const COMBINING_MARK = /\p{M}/gu;
const NOT_ALPHANUMERIC = /[^a-z0-9]/gu;

function decode(segment: string): string {
  try {
    return decodeURIComponent(segment);
  } catch {
    return segment;
  }
}

function normalise(segment: string): string {
  return decode(segment)
    .toLowerCase()
    .replace(FILE_EXTENSION, "")
    .normalize("NFD")
    .replaceAll(COMBINING_MARK, "")
    .replaceAll(NOT_ALPHANUMERIC, "");
}

/** Levenshtein distance, two rows at a time. */
function editDistance(a: string, b: string): number {
  let previous = Array.from({ length: b.length + 1 }, (_, j) => j);
  for (let i = 1; i <= a.length; i += 1) {
    const current = [i];
    for (let j = 1; j <= b.length; j += 1) {
      const substitution = a[i - 1] === b[j - 1] ? 0 : 1;
      current[j] = Math.min(
        (previous[j] ?? 0) + 1,
        (current[j - 1] ?? 0) + 1,
        (previous[j - 1] ?? 0) + substitution
      );
    }
    previous = current;
  }
  return previous[b.length] ?? Math.max(a.length, b.length);
}

function guessSegment(segment: string): RouteGuess | null {
  const key = normalise(segment);
  if (!key) {
    return null;
  }
  const exact = KNOWN[key];
  if (exact) {
    return exact;
  }
  const spellings = Object.entries(KNOWN);
  const [longestPrefix] = spellings
    .filter(
      ([spelling]) =>
        spelling.length >= MIN_PREFIX_LENGTH && key.startsWith(spelling)
    )
    .toSorted(([a], [b]) => b.length - a.length);
  if (longestPrefix) {
    return longestPrefix[1];
  }
  const budget = Math.min(MAX_TYPOS, Math.floor(key.length / CHARS_PER_TYPO));
  let best: { cost: number; guess: RouteGuess } | null = null;
  for (const [spelling, guess] of spellings) {
    const cost = editDistance(key, spelling);
    if (cost <= budget && (best === null || cost < best.cost)) {
      best = { cost, guess };
    }
  }
  return best?.guess ?? null;
}

/**
 * Best guess for a path that matched no route, from its segments after the
 * locale — the first one that resembles a known page wins. `null` when nothing
 * comes close; a wrong suggestion is worse than none.
 */
export function guessRoute(path: string): RouteGuess | null {
  const segments = path.split("/").filter(Boolean).slice(1);
  for (const segment of segments) {
    const guess = guessSegment(segment);
    if (guess) {
      return guess;
    }
  }
  return null;
}
