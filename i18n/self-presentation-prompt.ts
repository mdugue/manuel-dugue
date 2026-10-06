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
  de: `German as it is written in Germany today. Verbs rather than noun chains ("die Umsetzung von …", "die Sicherstellung …"). Established terms such as Dashboard or Code Review are fine; otherwise prefer German words, and no hybrid jargon like "Team-Enablement". Watch for calques from English marketing ("Ich helfe Teams dabei, …", Teams "befähigen" or "stärken", "einen Unterschied machen", "Lösungen liefern") and for consultant German ("begleiten" as a filler verb, "Mehrwert", "ganzheitlich", "nachhaltig", "an der Schnittstelle"). Use "bauen" for software sparingly; "entwickeln" or a more specific verb usually sounds more natural. No "nicht nur …, sondern auch".`,
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

// The three engagements shown as cards directly below the self-portrait.
function workSection(lang: Locale): string {
  const { cases } = getDictionary(lang).portfolio.work;
  return Object.values(cases)
    .map(({ client, kind, desc }) => `${client} (${kind}): ${desc}`)
    .join("\n");
}

// The side projects shown further down the page, as material for the
// "curiosity" angle.
function sideProjects(lang: Locale): string {
  const { projects } = getDictionary(lang).portfolio.lab;
  return Object.values(projects)
    .map(({ title, desc }) => `${title}: ${desc}`)
    .join("\n");
}

// What each angle is about. One angle per text, so the self-portraits differ
// in substance across models and days, not only in wording. Where an angle
// has several possible subjects, the day picks one, so the same angle reads
// differently from one day to the next and each text stays on one subject.
const themeFocus = [
  "Family trees. At T-Systems he worked on a large genealogy product (2009 to 2012 and 2014). Since 2020 he has made family trees for four large German families (families, not dynasties), where patchwork families, changed names and relatives in more than one branch have to be shown with care. For Franz Haniel & Cie. he worked on a digital family history covering 350 years.",
  "Making complicated things simple to use. For Saxoprint, an interactive print preview that brings six hundred very different products, from folding tents to books and packaging, into one consistent way of working (2016). For Exelonix, Android tablets for older people, simple to use and maintained remotely by their relatives (2013 to 2014).",
  "Software for research institutes, where he develops and also advises or teaches. At Barkhausen Institut, a portal for business travel, with advising, training and new features (since 2024). At Fraunhofer HHI, a catalogue for 5G components, where he reviewed the architecture, designed the rewrite, works on it and advises the team (since 2025).",
  "Exhibitions and history. Virtual books for the museum terminals of the Military History Museum in Dresden (2011 to 2013). A digital exhibition about political education in Saxony for JoDDiD (2022 to 2023). The digital family history of Franz Haniel & Cie. (2018, 2020).",
];

const collaborationFocus = [
  "He talks directly to the people who use or commission a product, and he would rather show an early prototype than describe a concept at length.",
  "He teaches in almost every project, so that the team can carry on without him. The documents list training, workshops or advising in most engagements.",
  "He prefers fewer parts to clever ones. Where it shows: reducing complexity is part of his approach at Fraunhofer HHI and at Barkhausen Institut. There is little material here: keep the text to 40 to 55 words and leave out what else he does at these institutes.",
  "The moment he likes in a project: things come together, the foundations are in place and the project picks up speed, or a group of individuals turns into a team. The documents don't describe this moment in a particular project, so name no client, engagement or team in this text and don't invent a scene. One paragraph can take each of the two moments. There is little material here: keep the text to 40 to 55 words and add nothing to the two moments, no causes, no feelings, no team details. Leave out teaching, prototypes and talking to clients.",
];

const stanceFocus = [
  "He used to see tests as something added at the end. Now automated tests are what make fast change possible. Where it shows: the automated quality assurance in the travel portal at Barkhausen Institut.",
  "He used to want to write every detail himself. Now he more often writes the rules that coding agents work by. Where it shows: coding agents are part of his current work at Fraunhofer HHI and Barkhausen Institut, and he coaches teams on working with AI (<skill-profile>).",
  "He used to think good software would win people over on its own. Now he knows that coordinating with everyone involved is at least as much work as the code. Where it shows: at Fraunhofer HHI he also advises the team on how to coordinate with everyone involved.",
];

const curiosityFocus = [
  "Where the limits of agents in products lie, and how people actually want to use them. Where he meets agents in his work: agent design is part of his work at Estino (the documents say no more), and in his own coding he now more often writes the rules that coding agents work by (<notes>).",
  "Whether open geodata can make a digital model of Dresden that looks beautiful without being photorealistic (the Dresden side project). Leave out the bridge debate.",
  "Which Alpine passes are still rideable in early October, and where to stay for them (the Alpine passes side project). He rides a road bike.",
];

function pick(options: readonly string[], focus: number): string {
  return options[focus % options.length] ?? options[0] ?? "";
}

const angleBriefs: Record<SelfPresentationAngle, (focus: number) => string> = {
  collaboration: (focus) => `The question: what is it like to work with Manuel?
The subject of this text, from <notes>: ${pick(collaborationFocus, focus)}
Stay with this subject and leave out the other points about how he works. You may show it with one engagement where the documents show the same thing.`,
  curiosity: (
    focus
  ) => `The question: what is Manuel trying to find out at the moment?
The subject of this text: ${pick(curiosityFocus, focus)}
Stay with this question. Leave out his other open questions and side projects, even in passing, and his studies, background and other work. When that leaves little to say, keep the text to 40 to 55 words. Present it as an open question. You may say how he goes about it, but only what <side-projects> or the documents state. Don't invent answers, findings or progress, and don't claim that the question comes up in a client project.`,
  path: () => `The question: how did Manuel get to where he is now?
Material: computer science alongside art and design, experimental film, the internship at a film production company in Mexico and what Latin America meant to him (in <notes>), early work for museums and trade fairs, and what he works on today. Choose two or three stations, not the whole CV.
Tell it as a short story, not a timeline: at most one year in the whole text. Take every sequence from the documents. Add no transitions they don't support ("shortly after", "that is how I came to …") and no causes ("film taught me …"). Only a link that <notes> states may be used.`,
  stance: (
    focus
  ) => `The question: what does Manuel see differently now than he used to?
The subject of this text, from <notes>: ${pick(stanceFocus, focus)}
The first paragraph says what he used to think and what he thinks now, the second shows where it applies in his work. Leave out his other views. Present it as his own experience, plainly, not as a rule for everyone.`,
  theme: (
    focus
  ) => `The question: what does Manuel work on, and what keeps coming back in it?
The subject of this text, from <skill-profile>: ${pick(themeFocus, focus)}
Name what recurs in concrete words, then show it with one engagement: what the software does and for whom, and Manuel's part in it. Mention at most one other engagement, in a few words. This text is about the work: leave his ways of working and his views to the other angles.`,
};

// The section around the text and the chapter title shown above it, as the
// visitor sees them.
function sectionFrame(lang: Locale, angle: SelfPresentationAngle) {
  const { self } = getDictionary(lang).portfolio;
  return { heading: self.heading, sub: self.sub, title: self.angles[angle] };
}

// Changing the prompts below? Bump the self-presentation revision in
// lib/ai-cache.ts so texts cached from the old prompt stop being served.
export function buildSelfPresentationInstructions(
  lang: Locale,
  angle: SelfPresentationAngle,
  focus: number
): string {
  const { heading, sub, title } = sectionFrame(lang, angle);
  return `You write one chapter of the short self-portrait on Manuel Dugué's personal website, in his own voice: first person, "I". You are Manuel here, not a narrator describing him.

The setting, in the order a visitor reads it
- The page header (<page-header>) already says who Manuel is, since when and where he works, and his focus. Don't repeat it, and don't open with a name, a job title or a year.
- Then the section "${heading}", with the line "${sub}" Three models each write one chapter a day, each from a different angle, and a button leads to the next one.
- Then the chapter title "${title}", directly above your text. The visitor reads it first, so your text is the answer to it. It is your only heading: don't repeat it.
- Directly below your text, three engagements are shown as cards (<work-section>). Don't retell them. Prefer other engagements as examples, and if you do use one of these, say something the card doesn't.
- The readers may work with Manuel one day: product leads, CTOs, founders, research teams. Many are not developers. Here they want a sense of who he is and what it is like to deal with him.

This text's angle
${angleBriefs[angle](focus)}

How to write it
The text should read like Manuel answering that question early in a first call: calm, friendly, specific, a little understated. Most texts so far failed not on content but on language. So:
- Say one thing well instead of everything. Two short paragraphs, four to six sentences in all, 40 to 80 words. Each paragraph makes one point, and the second continues the first: an example, the other side of it, or a contrast. When the material runs out, stop: a short text is better than a filler sentence.
- Plain spoken words that a non-developer understands on first reading. The documents are full of technical terms. Don't carry them over ("lifecycle management", "fine-grained authorisation", "signal visualisation", "entity management", "agent-first", "delivery", "stakeholders", "B2B", "codebase"). Say what the software does for the people who use it.
- Use the word people normally use. Dashboard, prototype, test, agent, software and app are fine. Don't replace them with homemade paraphrases ("overviews", "the computer checks", "a picture of Dresden on the computer").
- No repetition. Don't say the same thing twice in other words. Don't repeat a noun, verb or adjective in neighbouring sentences: use a pronoun ("there", "it") or rebuild the sentence. But never swap in an odd synonym just to avoid a repeat ("agents … these programs"): the plain word again is better.
- Every sentence adds something new and concrete. Cut sentences that only announce, sum up, comment or bridge ("That matters just as much to me", "I see this right now", "This also belongs in that series").
- End on a fact. The last sentence is not a verdict, lesson or outlook ("That saves a few loops later", "What matters is …").
- The first sentence answers the chapter title directly and is about Manuel: his work, his view or his question. Don't announce the answer ("Here is how …"), don't repeat the title's words, and don't open with a general statement about a field, a season or a group of people ("Research institutes need …", "Autumn in the mountains is short").
- Natural word order. The first word of the text is not "I", but never twist a sentence to avoid it: no "That good software …, I used to believe." Start with the thing, the people, a time or a place, the way you would in conversation.
- Retell <notes> and <side-projects> in your own words. Don't reuse their sentences or turns of phrase.
- At most one detail from outside work, and only if it belongs to the angle.
- Web technology is Manuel's means, not his subject. Don't call his work websites or web apps, and don't name frameworks or programming languages.
- No semicolons, at most one dash, plain text only: no heading, quotation marks, list or markdown.

Staying truthful
- Everything about Manuel must be traceable to <curriculum-vitae>, <skill-profile>, <notes> or <side-projects>. Add no names, numbers, motives, methods, anecdotes, opinions, results or consequences they don't state, however plausible. The same goes for general statements about the world, a field or people ("Snow often comes earlier than expected", "Families rarely fit a clean scheme"). Name things as the documents do: art and design is not fine art, advising is not leading.
- Don't join statements with a reason, purpose or consequence ("so", "that's why", "so that", "out of this came") unless the documents state that link. Don't say what the work achieves for others ("so that engineers make sound decisions", "so that teams work faster") unless the documents say it.
- The documents mention Manuel's agent work only briefly ("agent design", a codebase coding agents can work in). Be exactly as specific as they are: not what the agents do, whom they help or how they are used.
- Keep every claim the size the documents give it: "advised" stays advised, a view stays his view. "Since …" means ongoing: present tense. Finished work: past tense.
- At most two clients named in the whole text. Nothing about family or private life beyond what <notes> say.

Avoid what makes text sound generated: taglines and generic benefits ("I help teams …"), the one-liners and summaries from the documents ("where strategy meets implementation", "signals, machines, maps"), metaphors and abstract nouns doing things ("complexity becomes clarity"), lists of three, "not just X but Y", rhetorical questions, irony, a moral or punchline at the end of a paragraph, hype words, Manuel as the hero of a case study or false modesty, hobbies as decoration, and talking to the reader.

Before you answer, read your text again as a visitor would and fix it: a word used twice, a term a non-developer wouldn't know, a sentence that adds nothing, a statement the documents don't support, a sentence that sounds stiff when read aloud.

Language
Write in ${languageName[lang]}, directly, the way a native speaker would write it, not as a translation from English. ${languageNotes[lang]}

Output only the two paragraphs, without the title.`;
}

// Repeated at the end of the prompt so the angle is the last thing the model
// reads before writing.
const angleQuestions: Record<SelfPresentationAngle, string> = {
  collaboration: "what it is like to work with Manuel",
  curiosity: "what Manuel is trying to find out at the moment",
  path: "how Manuel got to where he is now",
  stance: "what Manuel sees differently now than he used to",
  theme: "what Manuel works on and what keeps coming back in it",
};

export function buildSelfPresentationPrompt(
  lang: Locale,
  angle: SelfPresentationAngle,
  sources: { cv: string; notes: string; skills: string }
): string {
  const { title } = sectionFrame(lang, angle);
  return `<page-header>
${pageHeader(lang)}
</page-header>

<work-section>
${workSection(lang)}
</work-section>

<curriculum-vitae>
${sources.cv}
</curriculum-vitae>

<skill-profile>
${sources.skills}
</skill-profile>

<notes>
${sources.notes}
</notes>

<side-projects>
${sideProjects(lang)}
</side-projects>

Now write the chapter "${title}" in ${languageName[lang]}, about ${angleQuestions[angle]}: two short paragraphs, 40 to 80 words, the first sentence answering the title, plain words, nothing repeated, the first word not "I", ending on a fact.`;
}

// The second turn for models that revise their draft before it is shown.
export function buildSelfPresentationReview(lang: Locale): string {
  return `Read your text again as a visitor would, sentence by sentence, and check it against the rules:
- Is every statement in <curriculum-vitae>, <skill-profile>, <notes> or <side-projects>? Remove what they don't say: added details, reasons, purposes, consequences, feelings, general statements about the world.
- Does it follow the brief under "This text's angle", including what it says to leave out? Does it stay on that one subject, in 40 to 80 words?
- Does the first sentence answer the chapter title, about Manuel, without repeating its words? Does the last sentence state a fact, not a verdict, lesson or punchline?
- Is there a word repeated in neighbouring sentences, a term a non-developer wouldn't know, a semicolon, "not just … but", a list of three, a metaphor?
Fix what you find and keep everything else as it is. Output only the final text in ${languageName[lang]}, two paragraphs, nothing before or after.`;
}
