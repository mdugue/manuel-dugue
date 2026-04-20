import { z } from 'zod'

export const socialProofSchema = z.object({
  testimonials: z
    .array(
      z.object({
        q: z
          .string()
          .describe(
            'One short sentence, at most two. Roughly 15 to 30 words total. Dry, editorial, slightly self-deprecating. No bullet points, no emojis, no corporate hype.',
          ),
        name: z
          .string()
          .describe(
            'A plausible-sounding fictional person whose name itself contains an unmistakable fictional marker (e.g. "Fictional Client A", "Entirely Invented …", "Probably Fake …"). Localise the marker to the output language.',
          ),
        role: z
          .string()
          .describe(
            'A credible role and sector clue, with a hedging invented-industry phrasing (e.g. "Head of Product, plausibly-named SaaS"; "CTO, statistically-likely scale-up"). Never mention a real company name.',
          ),
      }),
    )
    .length(3),
})

export type SocialProofObject = z.infer<typeof socialProofSchema>
