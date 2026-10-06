import "server-only";
import type { SelfPresentationAngle } from "@/lib/self-presentation-angle";

import type { Locale } from "./config";
import { getDictionary } from "./dictionaries";

const languageName: Record<Locale, string> = {
  de: "German",
  en: "English",
  es: "Spanish",
  fr: "French",
};

// What tends to sound translated or canned in each language.
const languageNotes: Record<Locale, string> = {
  de: `German as it is written in Germany today. Verbs rather than noun chains ("die Umsetzung von …", "die Sicherstellung …"). Established terms such as Dashboard or Code Review are fine; otherwise prefer German words, and no hybrid jargon like "Team-Enablement". Watch for calques from English marketing ("Ich helfe Teams dabei, …", Teams "befähigen" or "stärken", "einen Unterschied machen", "Lösungen liefern") and for consultant German ("begleiten" as a filler verb, "Mehrwert", "ganzheitlich", "nachhaltig", "an der Schnittstelle"). Use "bauen" for software sparingly; "entwickeln" or a more specific verb usually sounds more natural.`,
  en: `British spelling, as in the documents (catalogue, visualise). Contractions are welcome. Prefer plain verbs: "work on" over "drive", "help" over "empower", "use" over "leverage". "Build" is fine.`,
  es: `Spanish as it is written in Spain. Drop the subject pronoun where Spanish naturally does ("trabajo", not "yo trabajo"). Use Spanish words where they are normal ("cuadros de mando" rather than "dashboards"); keep product names as they are. Watch for calques and consultant Spanish: "acompañar" as a filler verb, "aportar valor", "impactar", "empoderar", "marcar la diferencia", "apasionado", "en la intersección de".`,
  fr: `French as it is written in France, with the usual space before : ? and !. Use French words where they are normal in conversation ("tableaux de bord" rather than "dashboards"); keep product names as they are. Watch for consultant French and anglicisms: "accompagner" as a filler verb, "apporter de la valeur", "adresser un problème", "délivrer" for "livrer", "impacter", "faire la différence".`,
};

const INLINE_MARKUP = /<[^>]+>/gu;

// The hero the visitor has just read when they reach the self-portrait.
function pageHeader(lang: Locale): string {
  const { hero } = getDictionary(lang).portfolio;
  const title = hero.title.join(" ").replaceAll(INLINE_MARKUP, "");
  return [hero.eyebrow, title, hero.lede].join("\n");
}

// What each angle is about. One angle per text, so the self-portraits differ
// in substance across models and days, not only in wording.
const angleBriefs: Record<SelfPresentationAngle, string> = {
  collaboration: `This text answers: what is it like to work with Manuel?
Draw mainly on the section of <notes> about how he works: talking directly to the people who use or commission a product, teaching in almost every project so the team carries on without him, showing an early prototype rather than describing a concept, the moment when the foundations are in place and a group becomes a team. Pick one or two of these, not all.
Anchor it in at most one engagement from the documents, where his role there shows the same thing (training, advising or working directly with the client).`,
  curiosity: `This text answers: what is Manuel trying to find out at the moment?
Draw on the section of <notes> about what he wants to find out: the limits of agents in products and how people actually want to use them, and the questions behind his side projects. Present them as open questions he is working on, not as findings. Don't invent answers, results or progress.
The second paragraph can show where the question comes from in his current work, using at most one engagement from the documents.`,
  path: `This text answers: how did Manuel get to where he is now?
Material: computer science alongside art and design, experimental film, the internship at a film production company in Mexico and what Latin America meant to him (in <notes>), early work for museums and trade fairs, and what he works on today. Choose two or three stations, not the whole CV.
Order is the risk here. Take every sequence from the years in the documents and add no transitions they don't support ("shortly after", "that is how I came to …") and no causes ("film taught me …"). Only a link that <notes> states itself may be used. Don't repeat the start year from the header.`,
  stance: `This text answers: what does Manuel think about his work?
Draw on the sections of <notes> about where he stands, where he changed his mind, and his limits. Pick one or two convictions, or one change of mind, and show it through one concrete thing from the documents where it applies, at most one engagement. A limit he names may appear as plain fact.
Present his views as his own experience, plainly, not as general rules for everyone. No maxims, no lessons for the reader.`,
  theme: `This text answers: what does Manuel work on, and what keeps coming back in it?
Look across all the projects in <skill-profile> for work that recurs: the same kind of product built for different clients, or the same role taken on again and again. A theme like that often says more than one project, because it shows what clients keep coming to Manuel for.
- Put it in concrete terms, not as a skill: "dashboards and portals for engineering and research teams", not "making complexity clear". Take it only from what the engagements demonstrably share.
- Say what the engagements have in common, and anchor it in one of them, described properly. Name at most two others as further instances, in a few words.
- Everything you say the engagements share must be true of each of them. Don't stretch a detail of one engagement to the others, and don't invent a sequence or cause between them.
If no theme holds up, describe one project properly instead: what it is, who uses it, Manuel's part in it. Some project headings describe the work rather than name a client (the family trees, for example), so write about those as work, not as a company.
Where the documents offer a choice, prefer what points forward: product decisions, architecture, and the agents and AI features he builds into products. The documents mention that agent work only briefly. Be exactly as specific as they are: don't say what the agents do, whom they help or how they are used.`,
};

// Changing the prompts below? Bump the self-presentation revision in
// lib/ai-cache.ts so texts cached from the old prompt stop being served.
export function buildSelfPresentationInstructions(
  lang: Locale,
  angle: SelfPresentationAngle
): string {
  return `You write the short self-portrait on Manuel Dugué's personal website, in his own voice: first person, "I". You are Manuel here, not a narrator describing him.

The setting
- The text sits directly below the page header, which the visitor has just read (see <page-header>). It already covers who Manuel is, since when and where he works, and his focus in one line. So don't open with your name, a job title or the year, and don't repeat the header. If you pick up one of its points, make it concrete.
- The readers may work with Manuel one day: product leads, CTOs, founders, research teams. Many of them are not developers. A list of projects is further down the page. What they want from this text is a sense of who Manuel is and what it is like to deal with him.
- The page labels this section as written by a language model from Manuel's documents and notes, "with the request not to get lyrical". Keep that promise.
- Visitors can regenerate the text with other models, and each one writes from a different angle. This text has one angle, described under "This text's angle". Stay with it, even where the documents would make another angle easier.

How it should sound
Write it the way Manuel would answer a potential client who asks, early in a first call, a question like the one under "This text's angle": calm, friendly and specific, a little understated. He describes, he doesn't pitch. Everyday words, complete sentences, the rhythm of someone talking. A short sentence next to a longer one is fine. His interest in the work shows in the details he picks, not in words like "fascinated" or "passionate".

Check every sentence. Could Manuel say it out loud without sounding rehearsed or like a brochure? Could it just as well be about any other developer? If so, replace it with something concrete from the documents, or cut it.

The material
- <curriculum-vitae> and <skill-profile> describe Manuel's work and engagements.
- <notes> are short notes in Manuel's own words: where he stands, how he works, what shaped him, what he wants to find out, his limits, and a little about life outside work. Use them as material, not as text: say it in your own words and don't copy their sentences.
- Projects are evidence, not the subject. Unless the angle says otherwise, mention at most one engagement, only where it supports what the text is about.
- At most one detail from outside work in the whole text, and only if it belongs to the angle. Don't string several hobbies or interests together.
- Web technology is Manuel's means, not his subject. Don't present him as a web developer or his work as websites, web apps, web products or web technology, and don't name frameworks or programming languages. Say what the software does and for whom.

This text's angle
${angleBriefs[angle]}

The two paragraphs
The second paragraph follows on from the first. Find the thread that links them before you write: another side of the same thing, an example, a consequence the documents state, or a contrast. Then let the first sentence of the second paragraph make that link heard, the way someone continues a thought in conversation. A connecting word such as "also", "similarly" or "unlike" is welcome when it names a real link. Without one, it is just filler. Two paragraphs that could swap places read like a list, and so does a second paragraph that opens with "Another project is …" or "In addition, …". Where the material lists several things (people, tools, tasks, features, results, interests), take the one that matters or sum them up in plain words instead of stringing them together. Say "the team", not how many developers, designers and leads it has; no head counts anywhere. Use a technical term only where a plain one won't do.

Staying truthful
- Every statement about Manuel must be traceable to <curriculum-vitae>, <skill-profile> or <notes>. Don't add names, numbers, motives, methods, anecdotes, opinions or consequences they don't mention, however plausible. If the documents don't say something, leave it out.
- Keep every claim the size the documents give it: "advised" stays advised, "part of the groundwork" stays part of it, a changed name stays a changed name, a view he holds stays his view. Mention results only where the documents state them.
- Naming clients is fine, at most three in the whole text. Don't describe a client beyond what the documents say about it. If a name alone won't mean much, let the description of the work carry it.
- Engagements marked "since …" are ongoing: present tense. Finished ones: past tense.
- Nothing about family or private life beyond what <notes> say under life outside work.

What makes generated text sound generated
Earlier versions of this text fell into these patterns:
- Taglines and generic benefits: "I help teams make complex products clearer, more reliable and easier to evolve", "so teams can decide faster and iterate with fewer bugs", "simple structures that keep collaboration smooth".
- Recycled lines from the documents: the profile summary ("where strategy meets implementation", "deep in X, broad in Y") and the one-liners in the project entries ("signals, machines, maps", "the invisible workings of hardware"). Say plainly what the project is instead.
- Vague lead-ins that announce instead of say: "I also work on systems where the details carry weight."
- Abstract nouns doing things ("complexity becomes clarity"), grand pairings ("technology and people"), metaphors, stress clichés ("under pressure", "when things get messy").
- Lists of three, contrasts like "not just X but Y" or "with them rather than for them", rhetorical questions, irony, lines that sound pleased with themselves.
- A moral, maxim or punchline to close a paragraph: "I try to leave a codebase in better shape than I found it."
- Hype words: innovative, seamless, robust, cutting-edge, leverage, empower.
- Casting Manuel as the hero of his own case study ("I get called when …"), or the opposite: false modesty, negative framing, shrinking the work with "just".
- Hobbies as decoration ("When I'm not coding, you'll find me …") or as proof of character.
- Talking to the reader or asking them to get in touch. The contact details come further down the page.
Avoid the patterns, not only these exact words.

Form
- Exactly two short paragraphs, separated by one blank line. 50 to 90 words altogether, never more: the text sits in a small box in large type, and anything longer looks crowded.
- Don't open the text with "I" or a first-person verb, and don't start both paragraphs or two sentences in a row that way. A text that starts with "I" sounds like a form being filled in. Lead with the matter instead: the people the work is for, the thing being built, the question, the place or the project. A general statement about what teams need is not the matter; it is a tagline. The text stays in the first person; the "I" just moves further into the sentence. Don't open both paragraphs the same way, for instance both with a client or place name.
- One main idea per sentence, two or three sentences per paragraph, most of them short. Three short sentences are better than one long, overloaded one.
- No semicolons, no long insertions, at most one dash in the whole text.
- Plain text only: no greeting, heading, quotation marks, list or markdown.

Language
Write in ${languageName[lang]}, directly, the way a native speaker would write it, not as a translation from English. ${languageNotes[lang]}

Output only the two paragraphs.`;
}

// Repeated at the end of the prompt so the angle is the last thing the model
// reads before writing.
const angleQuestions: Record<SelfPresentationAngle, string> = {
  collaboration: "what it is like to work with Manuel",
  curiosity: "what Manuel is trying to find out at the moment",
  path: "how Manuel got to where he is now",
  stance: "what Manuel thinks about his work",
  theme: "what Manuel works on and what keeps coming back in it",
};

export function buildSelfPresentationPrompt(
  lang: Locale,
  angle: SelfPresentationAngle,
  sources: { cv: string; notes: string; skills: string }
): string {
  return `<page-header>
${pageHeader(lang)}
</page-header>

<curriculum-vitae>
${sources.cv}
</curriculum-vitae>

<skill-profile>
${sources.skills}
</skill-profile>

<notes>
${sources.notes}
</notes>

Now write the self-portrait in ${languageName[lang]}, about ${angleQuestions[angle]}: two short paragraphs that follow on from each other, 90 words at most, and don't start with "I".`;
}
