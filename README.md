# manuel.fyi

Personal site of Manuel Dugué, an independent product engineer in Dresden. It is live at [manuel.fyi](https://manuel.fyi), runs on Next.js 16 (App Router, Cache Components, React Compiler) and is deployed on Vercel.

## What's in here

- **Portfolio** (`app/[lang]/page.tsx`, `app/components/portfolio/`): hero, documents, the "Lab" with side projects, and two AI-written sections.
- **AI sections**: a self-portrait and social proof, generated through the [Vercel AI Gateway](https://vercel.com/ai-gateway) with the [AI SDK](https://ai-sdk.dev). Visitors can switch between the models in `i18n/ai-models.ts`. The self-portrait draws on the CV, the skill profile and the notes (`public/{locale}/notes.md`), and each model writes it from a different angle that moves on daily (`lib/self-presentation-angle.ts`). Results are cached per locale, model and prompt revision for 24 h (`lib/ai-cache.ts`).
- **Documents**: the CV, skill profile, imprint and privacy policy are Markdown files in `public/{en,de,fr,es}/`. Each one is rendered three ways: as a page, as a modal over the portfolio and as a PDF (`@react-pdf/renderer`). Requests with `Accept: text/markdown` get the raw Markdown.
- **i18n**: English, German, French and Spanish. `proxy.ts` negotiates the locale, and UI strings live in `i18n/dictionaries/*.json`.

## Development

Requires Bun 1.4.3 (pinned in `packageManager` in `package.json`). Bun installs the dependencies, runs Next.js (`bun --bun`) and type-checks; on Vercel the Functions run on Bun too (`bunVersion` in `vercel.json`).

```sh
bun install
bun run dev     # http://localhost:3000
```

The AI sections need AI Gateway credentials. Run `vercel env pull` to get an OIDC token for the linked project, or set `AI_GATEWAY_API_KEY`.

| Script              | What it does                                    |
| ------------------- | ----------------------------------------------- |
| `bun run build`     | Production build (also generates `.next/types`) |
| `bun run lint`      | Ultracite check: oxlint (type-aware) + oxfmt    |
| `bun run fix`       | Ultracite autofix                               |
| `bun run typecheck` | Type-check with `bun check`                     |

The type-aware lint rules read the typed routes in `.next/types`, so on a fresh clone run `bunx next typegen` (or `bun run build`) once before linting or type-checking. CI generates the route types, then runs the type-check, lint and build in that order so it fails fast.

## Working with agents

`AGENTS.md` (also read through `CLAUDE.md`) has the project rules for coding agents. Vendored agent skills live in `.agents/skills/` and are pinned in `skills-lock.json`. To refresh them, use the `update-skills` skill. Edits to the skill profile go through the `skill-profile` skill, which keeps all four locales in sync.

## License

The code is licensed under the [Apache License 2.0](LICENSE). The content is not: the documents in `public/`, the texts in `i18n/dictionaries/` and the prompt texts are © Manuel Dugué, all rights reserved. Build your own site from the code, with your own content. See [`NOTICE`](NOTICE).
