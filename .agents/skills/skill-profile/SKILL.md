---
name: skill-profile
description: Use this skill whenever the user wants to edit, extend, or translate the Skill Profile document at public/{en,de,fr,es}/skill-profile.md — adding a new client or project, removing a discontinued engagement, updating the stack, tweaking the opener, adjusting the What-I-do table, editing an award or education entry, or harmonising any of the four locales. Trigger on phrases like "skill profile", "CV project", "add a project", "new client", "new engagement", "update my stack", "add an award", "skill-profile.md", or when the user asks to edit any file under public/{en,de,fr,es}/skill-profile.md. Enforce the established voice (fascinated, short, dry), the italic-colon project template, the sort rule (ongoing first by start year, then closed by latest activity), and the four-locale sync contract even when the user edits only one language. Keep using this skill whenever further edits to the skill profile come up — do not downgrade to free-form editing just because one request feels small.
---

# Skill Profile maintenance

Guardrails, conventions, and the exact template for editing the Skill Profile document. This skill exists because the document is rendered as both a web page (`react-markdown` + `remarkGfm`) and as a PDF (`@react-pdf/renderer`) — and because the four locales must stay in sync.

## Files

| Locale | Path                                  |
| ------ | ------------------------------------- |
| EN     | `public/en/skill-profile.md`          |
| DE     | `public/de/skill-profile.md`          |
| FR     | `public/fr/skill-profile.md`          |
| ES     | `public/es/skill-profile.md`          |

The CV is a separate document (`public/{lang}/curriculum-vitae.md`) — do not touch it unless the user explicitly asks.

Rendering pipeline, for reference: `app/[lang]/skill-profile/page.tsx` (web), `app/[lang]/skill-profile/pdf/route.tsx` (PDF). Supported markdown is GFM — tables, headings H1–H4, bullet lists, bold, italic, inline code, links, thematic breaks. **H1 is hidden in both renderers.** Avoid HTML escapes.

## Document structure (canonical order)

1. `# Skill Profile` (or locale-equivalent H1)
2. **Opener** — 1–2 short sentences directly under the H1, no heading. Leads with "Product engineer" / "Ingénieur produit" / "Ingeniero de producto" / "Product Engineer" (German). Names the year "since 2008" and the T-shape.
3. **Profile table** — Title, Born, Nationality, Languages, Personal interests.
4. **What I do table** — 5 rows, agentic first: Agentic & AI / Build / Architect / Visualise / Coach (localised).
5. **Stack today table** — 6 rows, agentic first: Agentic & AI / Languages / Frameworks / Runtime & data / Practices / Tools.
6. **Projects** — H2. Recent projects get full H3 entries; everything 2008–2014 lives in the "Earlier work" subsection.
7. **Education** — H2. Diploma, Research project, Minor, Internship, Abitur.
8. **Awards** — H2. Each award is its own H3 with year in the heading.

## Sort rule for projects

**Ongoing first, then closed by latest activity.**

- Ongoing engagements (marked "since YYYY" / "seit YYYY" / "depuis YYYY" / "desde YYYY") come first, ordered by **start year descending** — newer starts on top.
- Closed engagements come next, ordered by the **most recent year of activity descending**.
- Within the same year, preserve the existing relative order unless there's a reason to change.

When adding a project, walk the list and decide exactly where it slots before editing. If adding a 2024 closed project, it goes after the last ongoing entry (currently Estino, since 2018) and before the most recent closed entry (Wildstyle Network — last 2023).

## Project entry template

Use this exact shape. Every row below the context paragraph is **optional** — omit rows that don't apply (that's the whole point of this template, so non-tech projects degrade gracefully).

```markdown
### {Client or product name}{, City if not obvious} — {years}

{One-line context: what it is, who it's for, the problem.} {Optional single fascination sentence — quiet enthusiasm, not a pitch.}

*Role:* {dry verb/noun list: concept, UX, architecture audit, training, …}

*Approach:* {only when methodology was the deliverable — e.g. "RSC-first rewrite for agent-friendly access"; omit otherwise}

*Stack:* {only when tech is relevant; proper-case list, periods end the line}

*Topics:* {for training/workshop projects instead of Stack}

[domain.tld](https://domain.tld)
```

**Rules for the labels:**

- Italic + colon: `*Role:*` — NOT bold em-dash.
- Each labelled row is its own paragraph (blank line above and below).
- Drop the row entirely if it would be empty. Never print an empty label.
- Link lines are bare paragraphs with the bare link — no `*Link:*` prefix, no leading label. Multiple links join with ` · `.
- Localised labels:
  - DE: `*Rolle:*`, `*Ansatz:*`, `*Stack:*`, `*Themen:*`
  - FR: `*Rôle :*`, `*Approche :*`, `*Stack :*`, `*Thèmes :*` (note the non-breaking space before `:` in French)
  - ES: `*Rol:*`, `*Enfoque:*`, `*Stack:*`, `*Temas:*`

## Earlier work subsection

Pre-2015 projects live in one bulleted list under a single H3. This keeps the PDF compact and the tone confident.

```markdown
### Earlier work — 2008–2014

- **{Client, City — years}.** {One-sentence context.} *{comma-separated tech list}.* [optional-link.tld](https://...)
- ...
```

Locale headings:
- DE: `### Frühere Arbeiten — 2008–2014`
- FR: `### Travaux antérieurs — 2008–2014`
- ES: `### Trabajos anteriores — 2008–2014`

## Locale sync contract

**When the user edits one locale, every change propagates to the other three.** Structural edits (adding/removing a project, reordering, changing a table column) ALWAYS touch all four files. Pure copy tweaks in one language may stay local, but flag to the user and ask whether they want parity before leaving the others untouched.

When translating:

- **Translate fascination sentences, don't transliterate.** Each locale gets a version that sounds native.
- **Keep tech names in English** (Next.js, Drizzle ORM, PostgreSQL, Playwright, Vercel AI SDK, Claude Code, Cursor, MCP, Agent Skills, SGLang, OpenRouter).
- **"Agentic & AI" is partially translated**: `Agentic & KI` (DE), `Agentic & IA` (FR), `Agentic & IA` (ES). We kept "Agentic" in English because no established German/French/Spanish term exists yet.
- **"since 2008"** becomes `seit 2008` / `depuis 2008` / `desde 2008`.
- **Cities with exonyms**: Munich is OK, but the company's registered address wins for proper nouns. We use `Duisburg` in all four locales (not `Duisbourg`), `Dresden` / `Dresde`, `München` / `Munich` / `Múnich`, `Hamburg` / `Hambourg` / `Hamburgo` by locale.

## Opener templates

Drop-in starting points; tune rather than rewrite when small updates are needed.

- EN: `Product engineer building user-facing, agent-friendly web products since 2008. Deep in React, Next.js and TypeScript; broad across UX, information design, architecture, AI engineering and training.`
- DE: `Product Engineer — baut seit 2008 nutzerzentrierte, agent-freundliche Web-Produkte. Tief in React, Next.js und TypeScript; breit aufgestellt in UX, Informationsdesign, Architektur, AI Engineering und Schulung.`
- FR: `Ingénieur produit — je construis depuis 2008 des produits web orientés utilisateur, pensés pour cohabiter avec des agents. Ancré en React, Next.js et TypeScript ; à l'aise en UX, design d'information, architecture, AI engineering et formation.`
- ES: `Ingeniero de producto — construyo desde 2008 productos web orientados al usuario y pensados para convivir con agentes. Profundo en React, Next.js y TypeScript; amplio en UX, diseño de información, arquitectura, AI engineering y formación.`

## Tone: fascinated, short, dry

- **At most one fascination sentence per project.** Skip it when forced. Examples of the right texture:
  - "5G components have a life of their own; the catalogue follows them through it."
  - "Signals, machines, maps — making the invisible workings of hardware readable."
  - "Watches measure time; an intranet measures a company — both rely on tiny gears meshing."
  - "Political education that survives being scrolled past."
  - "A window into the fire — translated into numbers the operator can read."
- **Avoid pitch-deck language.** No "mission-critical", "cutting-edge", "enterprise-grade", "synergies".
- **Avoid hedges.** No "Goal:", "Topic:", "Responsibilities:" as sentence starters — the bold labels already carry that weight.
- **Prefer verbs over nouns** in the `*Role:*` line: "Architecture audit, rewrite design, hands-on implementation." beats "Responsible for the architecture audit and the rewrite design."
- **One idea per sentence.** If a project needs three sentences to explain, reconsider which one is the story.

## Formatting rules (enforce automatically)

- En-dash `—` between the client and the year in every H3: `### Foo — 2024`. Never a hyphen `-`.
- En-dash `–` for year ranges: `2015–2017` (not `2015-2017`).
- URLs always use `https://` and the full hostname. Never bare `domain.tld` as the link target.
- Tech names use their canonical capitalisation: `PostgreSQL`, `Next.js`, `Node.js`, `TypeScript`, `GraphQL`, `Claude Code`, `Vercel AI SDK`. Never `postgresql`, `nextjs`, `nodejs`, `claude code`.
- Straight apostrophes and quotes in EN (`'`, `"`); locale-appropriate guillemets in FR (`«  »`) and ES (`«»`) where the existing file uses them.
- No trailing periods on link-only paragraphs.
- Education H3s for TU Dresden include the faculty: `Faculty of Computer Science, TU Dresden` / `Fakultät Informatik, TU Dresden` / `Faculté d'informatique, TU Dresde` / `Facultad de Informática, TU Dresde`.

## What to verify after any edit

1. Re-read the four locale files side by side for structural symmetry (same project order, same H3 titles modulo translation).
2. Confirm the sort rule holds after any insertion or date change.
3. Check every URL opens with `https://`.
4. Check every new tech name uses canonical capitalisation.
5. If the user has the repo running, ask them to open `/en/skill-profile` and `/en/skill-profile/pdf` and eyeball the PDF — page-break behaviour is the first thing that breaks.
6. Keep the commit message factual and tight: what changed per locale, in that order.

## When NOT to use this skill

- Editing the CV (`curriculum-vitae.md`) — that's a separate document with its own shape.
- Restructuring the renderer or PDF styles (`app/components/markdown-pdf.tsx`, `app/components/markdown-page.tsx`) — any layout improvement that would need styling changes warrants a separate task and a conversation with the user.
- Translating the skill profile into a new locale that isn't one of en/de/fr/es — needs `i18n/config.ts` updates and is a larger change.

## Common edits — at a glance

**Add a new project:**
1. Determine year(s) and whether ongoing or closed.
2. Find the insertion point per the sort rule.
3. Draft the entry in EN first using the template; add an optional fascination sentence only if it lands naturally.
4. Translate to DE, FR, ES — match the voice of each locale, keep tech names English.
5. Apply the same insertion across all four files.

**Remove a discontinued project:**
1. Delete the H3 block and any trailing blank line from all four locale files at the same insertion index.
2. If the project appeared in the opener as an example, update the opener too.

**Update the Stack today table:**
1. Match the order Agentic & AI → Languages → Frameworks → Runtime & data → Practices → Tools.
2. When a tech graduates from "new and interesting" to "everyday", consider whether it still earns a Stack-today row or whether it should only live on project entries.
3. Mirror additions/removals in all four locales.

**Tune the opener:**
1. Keep it 1–2 sentences.
2. Keep the anchor year "since 2008" / "seit 2008" / "depuis 2008" / "desde 2008".
3. Keep the T-shape phrasing: deep-in-X; broad-across-Y.
