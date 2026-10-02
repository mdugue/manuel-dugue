# manuel.fyi

Personal site of Manuel Dugué, an independent product engineer in Dresden. It is live at [manuel.fyi](https://manuel.fyi), runs on Next.js 16 (App Router, Cache Components, React Compiler) and is deployed on Vercel.

## What's in here

- **Portfolio** (`app/[lang]/page.tsx`, `app/components/portfolio/`): hero, documents, the "Lab" with side projects, and two AI-written sections.
- **AI sections**: a self-portrait and social proof, generated through the [Vercel AI Gateway](https://vercel.com/ai-gateway) with the [AI SDK](https://ai-sdk.dev). Visitors can switch between the models in `i18n/ai-models.ts`. Results are cached per locale, model and prompt revision for 24 h (`lib/ai-cache.ts`).
- **Documents**: the CV, skill profile, imprint and privacy policy are Markdown files in `public/{en,de,fr,es}/`. Each one is rendered three ways: as a page, as a modal over the portfolio and as a PDF (`@react-pdf/renderer`). Requests with `Accept: text/markdown` get the raw Markdown.
- **i18n**: English, German, French and Spanish. `proxy.ts` negotiates the locale, and UI strings live in `i18n/dictionaries/*.json`.

## Development

Requires Node.js 26 (see `.nvmrc`) and npm. Do not use Bun: Next.js 16.3 fails to build under the Bun runtime.

```sh
npm ci
npm run dev     # http://localhost:3000
```

The AI sections need AI Gateway credentials. Run `vercel env pull` to get an OIDC token for the linked project, or set `AI_GATEWAY_API_KEY`.

| Script          | What it does                                    |
| --------------- | ----------------------------------------------- |
| `npm run build` | Production build (also generates `.next/types`) |
| `npm run lint`  | Ultracite check: oxlint (type-aware) + oxfmt    |
| `npm run fix`   | Ultracite autofix                               |
| `npm run tsc`   | Type-check with TypeScript 7                    |

The type-aware lint rules read the typed routes in `.next/types`, so on a fresh clone run `npm run build` once before linting. CI runs build, lint and type-check on Node 26 and on Node 24, the version Vercel deploys with.

## Working with agents

`AGENTS.md` (also read through `CLAUDE.md`) has the project rules for coding agents. Vendored agent skills live in `.agents/skills/` and are pinned in `skills-lock.json`. To refresh them, use the `update-skills` skill. Edits to the skill profile go through the `skill-profile` skill, which keeps all four locales in sync.

## License

The code is licensed under the [Apache License 2.0](LICENSE). The content is not: the documents in `public/`, the texts in `i18n/dictionaries/` and the prompt texts are © Manuel Dugué, all rights reserved. Build your own site from the code, with your own content. See [`NOTICE`](NOTICE).
