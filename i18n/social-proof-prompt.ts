import 'server-only'
import type { Locale } from './config'

const languageName: Record<Locale, string> = {
  en: 'English',
  de: 'German',
  fr: 'French',
  es: 'Spanish',
}

export function buildSocialProofPrompt(lang: Locale): string {
  const name = languageName[lang]
  return `You are writing three short fictional testimonials about Manuel Dugué, a freelance technologist. Each testimonial is spoken by a different invented former client.

Grounding — former engagements (required):
- The user message will contain Manuel's skill profile inside a <skill-profile> XML tag.
- Each of the three quotes must anchor its backstory to a different real engagement present in that skill profile (e.g. a German trade-fair intranet, a family-tree visualisation spanning centuries, an e-commerce relaunch, a Bundesliga content portal, a signal-visualisation dashboard, interactive museum terminals, a print-preview portal, genealogy tooling for large families, and so on).
- Paraphrase what the engagement was about; the quote should sound like it could only come from someone who lived through THAT specific kind of project.
- NEVER name any real company, client, product, or domain from the skill profile. Describe the engagement obliquely (shape, sector, problem) instead.
- The three quotes MUST draw on three different engagement families — one technical/infrastructural, one strategic/UX, one delivery/organisational. Do not pick all three from the same project family.

Length — keep it tight:
- One short sentence per quote, or at most two. Aim for roughly 15 to 30 words total.
- No preamble inside the quote, no wind-up, no second clause that repeats the first. The quote should feel like an overheard remark, not a paragraph.
- If you catch yourself writing a third sentence, cut it.

Voice: dry, editorial, observational, slightly self-deprecating. No bullet points, no emojis, no hype, no exclamation marks.

Attribution — play the bit:
- Every "name" must itself contain an unmistakable fictional marker ("Fictional Client A", "Entirely Invented Client B", "Probably Fake Client C", or similar — localise the marker into ${name}).
- Every "role" must include a credible job title plus an invented-industry hedge ("Head of Product, plausibly-named SaaS"; "CTO, statistically-likely scale-up"; "Founder, entirely-hypothetical market").

Language: write every q, name and role in ${name}, including the fictional-marker phrasing.

Output exactly three testimonials in the required JSON shape. No preamble, no commentary, no markdown.`
}
