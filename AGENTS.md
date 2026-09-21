<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->

**Before writing Next.js code, call the `nextjs_docs` tool from next-devtools-mcp
to locate the version-matched docs, then read the relevant guide from
`node_modules/next/dist/docs/`. Do this automatically without being asked.**

## Runtime

This project runs on **Node.js**, not Bun. Next.js 16.3 fails under the Bun
runtime (`Expected CommonJS module to have a function wrapper` during
"Collecting page data"), so `dev`/`build`/`start` use plain `next` and npm is
the package manager. Do not reintroduce `bun --bun`, `Bun.*` APIs, or a
`bunVersion` pin in `vercel.json` until that is fixed upstream.

## Lint & format

Linting is `oxlint` (config in `.oxlintrc.json`: Next.js, React, jsx-a11y,
import and promise plugins, type-aware rules via `oxlint-tsgolint`) and
formatting is `oxfmt` (`.oxfmtrc.json`). `npm run lint` checks both,
`npm run fix` applies auto-fixes and formats. There is no Biome, ESLint or
Prettier. The type-aware rules read `.next/types` (typed routes), so run
`next build` or `next dev` once before linting a fresh clone. TypeScript is
version 7 (the Go-based compiler); `npm run tsc` type-checks.
