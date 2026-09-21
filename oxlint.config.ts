import { defineConfig } from "oxlint";
import core from "ultracite/oxlint/core";
import next from "ultracite/oxlint/next";
import react from "ultracite/oxlint/react";

export default defineConfig({
  extends: [core, next, react],
  ignorePatterns: [
    ...(core.ignorePatterns ?? []),
    ".agents",
    ".claude/skills",
    "public",
  ],
  options: {
    // Type-aware rules (no-floating-promises, no-misused-promises, …) run via
    // oxlint-tsgolint. They read .next/types (typed routes), so run
    // `next build` or `next dev` once before linting a fresh clone.
    typeAware: true,
  },
  overrides: [
    {
      // mdast node keys have no stable id; index keys are fine for a
      // one-shot PDF render.
      files: ["app/components/markdown-pdf.tsx"],
      rules: { "react/no-array-index-key": "off" },
    },
  ],
  rules: {
    // Next.js conventions (create-next-app, docs) use function declarations
    // for pages, layouts and components; keep that instead of arrow consts.
    "func-style": "off",
    "react/function-component-definition": "off",
    // dangerouslySetInnerHTML is only used for JSON-LD and trusted i18n copy.
    "react/no-danger": "off",
    // Typed routes and narrowing from zod/guards need `as`; the rule bans
    // every narrowing assertion outright.
    "typescript/no-unsafe-type-assertion": "off",
    // React 19's ReactNode includes Promise, so every component/render helper
    // would have to become async under this rule.
    "typescript/promise-function-async": "off",
    // `if (maybeString)` is idiomatic here; the rule demands explicit
    // `!== undefined && !== ""` checks everywhere.
    "typescript/strict-boolean-expressions": "off",
    "typescript/switch-exhaustiveness-check": [
      "error",
      { considerDefaultExhaustiveForUnions: true },
    ],
  },
});
