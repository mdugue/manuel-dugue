# AI Claim Cards Redesign Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Replace the stacked AI quote cards with a horizontally scrollable snap carousel, extract shared 3D tilt physics from ClaimCard, upgrade Vercel AI SDK to v6, and wire all three cards to real LLM providers.

**Architecture:** A pure CSS scroll-snap container replaces the CardStack drag-rotation component. A `useTiltPhysics` hook extracts the spring-based 3D tilt from ClaimCard so both ClaimCard and each quote card share the effect. The Vercel AI SDK v6 replaces the direct `openai` package, with `@ai-sdk/openai`, `@ai-sdk/anthropic`, and `@ai-sdk/google` provider packages generating quotes for all three cards. KV caching is preserved.

**Tech Stack:** Next.js 16, React 19, motion/react, Tailwind CSS 4, AI SDK 6, `@ai-sdk/openai`, `@ai-sdk/anthropic`, `@ai-sdk/google`, `@vercel/kv`

---

### Task 1: Upgrade AI SDK and Install Provider Packages

**Files:**
- Modify: `package.json`
- Modify: `bun.lock` (auto-generated)

**Step 1: Install AI SDK v6 and provider packages, remove direct openai**

Run:
```bash
bun remove openai && bun add ai@latest @ai-sdk/openai @ai-sdk/anthropic @ai-sdk/google
```

Expected: `package.json` shows `"ai": "^6.x"`, three `@ai-sdk/*` packages added, `openai` removed.

**Step 2: Verify install succeeded**

Run: `bun run tsc`

Expected: Type errors in `landing-page-quote.tsx` (references removed `openai` package). This is expected and will be fixed in Task 3.

**Step 3: Commit**

```bash
git add package.json bun.lock
git commit -m "chore: upgrade AI SDK to v6, add provider packages, remove openai"
```

---

### Task 2: Extract useTiltPhysics Hook

**Files:**
- Create: `app/use-tilt-physics.ts`
- Modify: `app/claim-card.tsx`

**Step 1: Create the hook**

Create `app/use-tilt-physics.ts`:

```ts
"use client";

import {
  type SpringOptions,
  useMotionValue,
  useSpring,
} from "motion/react";
import { useCallback, useRef } from "react";

interface TiltPhysicsOptions {
  maxRotation?: number;
  hoverScale?: number;
  springConfig?: SpringOptions;
}

const defaultSpring: SpringOptions = {
  damping: 30,
  stiffness: 100,
  mass: 2,
};

export function useTiltPhysics({
  maxRotation = 12,
  hoverScale = 1.04,
  springConfig = defaultSpring,
}: TiltPhysicsOptions = {}) {
  const ref = useRef<HTMLElement>(null);
  const rotateX = useSpring(useMotionValue(0), springConfig);
  const rotateY = useSpring(useMotionValue(0), springConfig);
  const scale = useSpring(1, springConfig);

  const onMouseMove = useCallback(
    (e: React.MouseEvent<HTMLElement>) => {
      if (!ref.current) return;
      const rect = ref.current.getBoundingClientRect();
      const offsetX = e.clientX - rect.left - rect.width / 2;
      const offsetY = e.clientY - rect.top - rect.height / 2;
      rotateX.set((offsetY / (rect.height / 2)) * -maxRotation);
      rotateY.set((offsetX / (rect.width / 2)) * maxRotation);
    },
    [rotateX, rotateY, maxRotation],
  );

  const onMouseEnter = useCallback(() => {
    scale.set(hoverScale);
  }, [scale, hoverScale]);

  const onMouseLeave = useCallback(() => {
    scale.set(1);
    rotateX.set(0);
    rotateY.set(0);
  }, [scale, rotateX, rotateY]);

  return {
    ref,
    style: {
      rotateX,
      rotateY,
      scale,
      transformPerspective: 800,
    },
    handlers: { onMouseMove, onMouseEnter, onMouseLeave },
  };
}
```

**Step 2: Refactor ClaimCard to use the hook**

Replace the entire contents of `app/claim-card.tsx` with:

```tsx
"use client";

import { motion } from "motion/react";

import AnimatedHeadline from "./animated-headline";
import TypingAnimation from "./typing-animation";
import { useTiltPhysics } from "./use-tilt-physics";

const typingPhrases = [
  "consumers, experts, agents, bots, ...",
  "React, GraphQL, A11Y, ...",
  "teaching, analyzing, coding, ...",
  "arctic code vault contributer",
];

export default function ClaimCard() {
  const { ref, style, handlers } = useTiltPhysics({
    maxRotation: 12,
    hoverScale: 1.04,
  });

  return (
    <motion.hgroup
      className="relative z-10 mx-auto w-full max-w-2xl cursor-default rounded-2xl border border-teal-300/50 bg-linear-to-tr from-teal-500 to-teal-200 px-6 py-10 text-center text-white shadow-2xl md:rounded-3xl md:px-24 md:py-16 md:text-xl dark:from-teal-700 dark:to-teal-600 dark:text-gray-900"
      onMouseEnter={handlers.onMouseEnter}
      onMouseLeave={handlers.onMouseLeave}
      onMouseMove={handlers.onMouseMove}
      ref={ref}
      style={style}
    >
      <div className="absolute inset-0 overflow-hidden rounded-2xl md:rounded-3xl">
        <div
          className="absolute top-1/4 left-1/4 h-1/2 w-1/2 bg-teal-100 opacity-75"
          style={{ filter: "blur(100px)", zIndex: -1 }}
        />
      </div>
      <small className="block font-display text-teal-500/80 dark:text-teal-700">
        – since 2008 –
      </small>
      <AnimatedHeadline>
        handcrafting <br />
        web experiences <br />
        for everybody
      </AnimatedHeadline>
      <p className="bg-linear-to-bl from-amber-100 to-amber-200 font-inline text-gradient dark:from-teal-900 dark:to-teal-700">
        <TypingAnimation
          phrases={typingPhrases}
          startOnView={false}
          typeDuration={70}
        />
      </p>
    </motion.hgroup>
  );
}
```

**Step 3: Verify ClaimCard still works**

Run: `bun run tsc`

Expected: No type errors related to `claim-card.tsx`.

**Step 4: Commit**

```bash
git add app/use-tilt-physics.ts app/claim-card.tsx
git commit -m "refactor: extract useTiltPhysics hook from ClaimCard"
```

---

### Task 3: Rewrite Quote Generation with AI SDK v6

**Files:**
- Modify: `app/landing-page-quote.tsx` (rewrite to use AI SDK v6 with all 3 providers)

**Step 1: Rewrite landing-page-quote.tsx**

Replace `app/landing-page-quote.tsx` with a unified approach. The file should export one async component per provider. Each uses AI SDK's `generateText` with KV caching:

```tsx
"use cache";
import { generateText } from "ai";
import { anthropic } from "@ai-sdk/anthropic";
import { google } from "@ai-sdk/google";
import { openai } from "@ai-sdk/openai";
import { kv } from "@vercel/kv";
import { cacheLife } from "next/cache";
import Link from "next/link";
import { OpenAiIcon, GoogleIcon } from "@/brand-icons";
import { Sparkles } from "lucide-react";
import skillProfile from "@/content/skill-profile";
import GPTTooltip from "@/gpt-tooltip";
import type { Locale } from "@/i18n-config";
import type { SheetContent } from "@/types/content";

function sheetContentToText(content: SheetContent): string {
  return content
    .map((section) => {
      const entries = section.entries
        .map((entry) => {
          const parts: string[] = [];
          if (entry.date) parts.push(entry.date);
          if (entry.title) parts.push(entry.title);
          if (entry.content) parts.push(entry.content);
          return parts.join(": ");
        })
        .join("\n");
      return `${section.sectionTitle}\n${entries}`;
    })
    .join("\n\n");
}

function buildPrompt(locale: Locale, document: string): string {
  return locale === "en"
    ? `You are an AI that has just read Manuel Dugué's skill profile. Write a brief, thoughtful endorsement of Manuel as a web developer. Write in plain text only. Use real line breaks for paragraphs; do not write "\\n". No HTML or Markdown.

Input
${document}

Hard rules
- Total ≤120 words. Exactly two paragraphs; 1–2 sentences per paragraph.
- Emphasize soft skills, values, and collaboration; minimize technical jargon. Avoid clichés/buzzwords. No emojis, no exclamation marks, no lists.
- Mention clients/organizations only if present in the input. Prefer well-known names when available.
- Reference only facts from the input; if details are missing, stay generic; do not invent names.
- Characters: no special symbols (# @ / * ~ ^ | < > [ ] { } _ = + % " '). Use only letters (incl. diacritics), numbers, spaces, commas, and periods.`
    : `Du bist eine KI, die gerade Manuel Dugués Skill Profile gelesen hat. Schreibe eine kurze, durchdachte Empfehlung von Manuel als Webentwickler. Schreibe ausschließlich als Reintext. Verwende echte Zeilenumbrüche; schreibe „\\n" nicht wörtlich. Kein HTML oder Markdown.

Input
${document}

Strikte Regeln
- Insgesamt ≤120 Wörter. Genau zwei Absätze; pro Absatz 1–2 Sätze.
- Betone Soft Skills, Werte und Zusammenarbeit; technischen Jargon minimal halten. Floskeln/Buzzwords vermeiden. Keine Emojis, keine Ausrufezeichen, keine Listen.
- Kunden/Organisationen nur nennen, wenn sie im Input stehen. Bevorzuge bekannte Namen.
- Nur belegte Fakten aus dem Input; fehlen Details, allgemein bleiben; keine Namen erfinden.
- Zeichen: keine Sonderzeichen (# @ / * ~ ^ | < > [ ] { } _ = + % " '). Verwende nur Buchstaben (inkl. Umlaute), Zahlen, Leerzeichen, Kommas und Punkte.`;
}

async function cachedGenerate(
  cacheKey: string,
  model: Parameters<typeof generateText>[0]["model"],
  prompt: string,
): Promise<string> {
  const cached = await kv.get<string>(cacheKey);
  if (cached) return cached;

  const { text } = await generateText({ model, prompt });
  await kv.set(cacheKey, text, { ex: 60 * 60 });
  return text;
}

export async function GPTQuote({ locale }: { locale: Locale }) {
  cacheLife("days");
  const document = sheetContentToText(skillProfile.en);
  const prompt = buildPrompt(locale, document);
  const text = await cachedGenerate(
    `quote:gpt-5-mini:${locale}`,
    openai("gpt-5-mini"),
    prompt,
  );

  return (
    <figure className="h-full">
      <blockquote className="whitespace-break-spaces font-medium text-amber-50">
        {text}
      </blockquote>
      <figcaption className="mt-3 flex items-center gap-1 text-right text-sm text-white/70">
        <span className="ml-auto flex items-center gap-1">
          – <OpenAiIcon className="inline size-4" />{" "}
          {locale === "de" ? "GPT 5 zu meinem " : "GPT 5 after reading my "}
          <GPTTooltip locale={locale}>
            <Link
              className="underline decoration-white/40 hover:decoration-white"
              href={`/${locale}/skill-profile`}
              prefetch={false}
            >
              Skill Profile
            </Link>
          </GPTTooltip>
        </span>
      </figcaption>
    </figure>
  );
}

export async function ClaudeQuote({ locale }: { locale: Locale }) {
  cacheLife("days");
  const document = sheetContentToText(skillProfile.en);
  const prompt = buildPrompt(locale, document);
  const text = await cachedGenerate(
    `quote:claude-sonnet:${locale}`,
    anthropic("claude-sonnet-4-5-20250929"),
    prompt,
  );

  return (
    <figure className="h-full">
      <blockquote className="whitespace-break-spaces font-medium text-amber-50">
        {text}
      </blockquote>
      <figcaption className="mt-3 flex items-center gap-1 text-right text-sm text-white/70">
        <span className="ml-auto flex items-center gap-1">
          – <Sparkles className="inline size-4" />{" "}
          {locale === "de" ? "Claude zu meinem " : "Claude after reading my "}
          <Link
            className="underline decoration-white/40 hover:decoration-white"
            href={`/${locale}/skill-profile`}
            prefetch={false}
          >
            Skill Profile
          </Link>
        </span>
      </figcaption>
    </figure>
  );
}

export async function GeminiQuote({ locale }: { locale: Locale }) {
  cacheLife("days");
  const document = sheetContentToText(skillProfile.en);
  const prompt = buildPrompt(locale, document);
  const text = await cachedGenerate(
    `quote:gemini-2.0-flash:${locale}`,
    google("gemini-2.0-flash"),
    prompt,
  );

  return (
    <figure className="h-full">
      <blockquote className="whitespace-break-spaces font-medium text-sky-50">
        {text}
      </blockquote>
      <figcaption className="mt-3 flex items-center gap-1 text-right text-sm text-white/70">
        <span className="ml-auto flex items-center gap-1">
          – <GoogleIcon className="inline size-4" />{" "}
          {locale === "de" ? "Gemini zu meinem " : "Gemini after reading my "}
          <Link
            className="underline decoration-white/40 hover:decoration-white"
            href={`/${locale}/skill-profile`}
            prefetch={false}
          >
            Skill Profile
          </Link>
        </span>
      </figcaption>
    </figure>
  );
}
```

**Step 2: Verify types compile**

Run: `bun run tsc`

Expected: No type errors in `landing-page-quote.tsx`.

**Step 3: Commit**

```bash
git add app/landing-page-quote.tsx
git commit -m "refactor: rewrite quote generation with AI SDK v6 and all 3 providers"
```

---

### Task 4: Build Horizontal Scroll-Snap Carousel and Tilt Quote Cards

**Files:**
- Modify: `app/ai-quote-stack.tsx` (rewrite with scroll carousel and tilt cards)
- Create: `app/tilt-quote-card.tsx` (client component wrapping QuoteCard with tilt physics)
- Delete: `app/card-stack.tsx`
- Delete: `app/quote-stack-client.tsx`

**Step 1: Create the TiltQuoteCard client component**

Create `app/tilt-quote-card.tsx`:

```tsx
"use client";

import { motion } from "motion/react";
import type { ReactNode } from "react";
import { useTiltPhysics } from "./use-tilt-physics";

export default function TiltQuoteCard({
  children,
  gradient,
  border,
}: {
  children: ReactNode;
  gradient: string;
  border: string;
}) {
  const { ref, style, handlers } = useTiltPhysics({
    maxRotation: 8,
    hoverScale: 1.02,
  });

  return (
    <motion.div
      className={`relative h-full w-full cursor-default rounded-2xl border bg-linear-to-tl ${gradient} ${border} px-6 py-5 shadow-xl md:rounded-3xl md:px-10 md:py-8`}
      onMouseEnter={handlers.onMouseEnter}
      onMouseLeave={handlers.onMouseLeave}
      onMouseMove={handlers.onMouseMove}
      ref={ref}
      style={style}
    >
      <div className="absolute inset-0 overflow-hidden rounded-2xl md:rounded-3xl">
        <div
          className="absolute top-1/4 left-1/4 h-1/2 w-1/2 bg-white/20 opacity-60"
          style={{ filter: "blur(80px)", zIndex: -1 }}
        />
      </div>
      {children}
    </motion.div>
  );
}
```

**Step 2: Rewrite ai-quote-stack.tsx with horizontal scroll-snap**

Replace the entire contents of `app/ai-quote-stack.tsx`:

```tsx
"use cache";

import { Coffee, Sparkles } from "lucide-react";
import { GoogleIcon, OpenAiIcon } from "@/brand-icons";
import { cacheLife } from "next/cache";
import { Suspense } from "react";
import { ErrorBoundary } from "react-error-boundary";
import type { Locale } from "@/i18n-config";
import { GPTQuote, ClaudeQuote, GeminiQuote } from "@/landing-page-quote";
import TiltQuoteCard from "@/tilt-quote-card";

const cardWidth = "min(28rem, 85vw)";

export default async function AIQuoteStack({ locale }: { locale: Locale }) {
  cacheLife("hours");

  return (
    <div
      className="flex snap-x snap-mandatory gap-6 overflow-x-auto pb-4 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
      style={{
        paddingInline: `max(1rem, calc((100% - ${cardWidth}) / 2))`,
      }}
    >
      <QuoteCardSlide
        border="border-pink-500 dark:border-amber-700"
        gradient="from-fuchsia-500 to-pink-400 dark:from-amber-800 dark:to-yellow-500"
        loadingIcon={<OpenAiIcon className="inline size-4" />}
        loadingText={
          locale === "en"
            ? "GPT 5 reading my Skill Profile …"
            : "GPT 5 liest mein Skill Profile …"
        }
      >
        <GPTQuote locale={locale} />
      </QuoteCardSlide>

      <QuoteCardSlide
        border="border-orange-400 dark:border-indigo-700"
        gradient="from-amber-500 to-orange-400 dark:from-indigo-800 dark:to-violet-600"
        loadingIcon={<Sparkles className="inline size-4" />}
        loadingText={
          locale === "en"
            ? "Claude reading my Skill Profile …"
            : "Claude liest mein Skill Profile …"
        }
      >
        <ClaudeQuote locale={locale} />
      </QuoteCardSlide>

      <QuoteCardSlide
        border="border-blue-400 dark:border-emerald-700"
        gradient="from-sky-500 to-blue-400 dark:from-emerald-800 dark:to-teal-600"
        loadingIcon={<GoogleIcon className="inline size-4" />}
        loadingText={
          locale === "en"
            ? "Gemini reading my Skill Profile …"
            : "Gemini liest mein Skill Profile …"
        }
      >
        <GeminiQuote locale={locale} />
      </QuoteCardSlide>
    </div>
  );
}

function QuoteCardSlide({
  children,
  gradient,
  border,
  loadingIcon,
  loadingText,
}: {
  children: React.ReactNode;
  gradient: string;
  border: string;
  loadingIcon: React.ReactNode;
  loadingText: string;
}) {
  return (
    <div
      className="shrink-0 snap-center"
      style={{ width: cardWidth }}
    >
      <Suspense
        fallback={
          <TiltQuoteCard border={border} gradient={gradient}>
            <div className="animate-pulse font-display text-amber-100/60">
              {loadingIcon} {loadingText}
            </div>
          </TiltQuoteCard>
        }
      >
        <ErrorBoundary
          fallback={
            <TiltQuoteCard border={border} gradient={gradient}>
              <QuoteError />
            </TiltQuoteCard>
          }
        >
          <TiltQuoteCard border={border} gradient={gradient}>
            {children}
          </TiltQuoteCard>
        </ErrorBoundary>
      </Suspense>
    </div>
  );
}

function QuoteError() {
  return (
    <div className="text-amber-50">
      <p className="mb-2">ohhhhhh noooooo</p>
      <p className="flex items-center gap-2 font-display text-sm">
        <Coffee className="size-4" /> Conversation limit reached. Try again
        later or{" "}
        <a className="underline" href="mailto:mail@manuel.fyi">
          contact me directly
        </a>
        .
      </p>
    </div>
  );
}
```

**Step 3: Delete unused files**

```bash
rm app/card-stack.tsx app/quote-stack-client.tsx
```

**Step 4: Remove the max-w-xl wrapper from the layout**

In `app/[locale]/layout.tsx`, the AI Quote section currently wraps AIQuoteStack in `<section className="px-4 py-8 md:py-16">`. No changes needed to layout — the carousel handles its own padding via `paddingInline`. But verify the section doesn't constrain width. The current `px-4 py-8` is fine — the scroll container manages its own horizontal space.

**Step 5: Verify types compile**

Run: `bun run tsc`

Expected: No type errors. No imports of deleted files remain.

**Step 6: Commit**

```bash
git add app/ai-quote-stack.tsx app/tilt-quote-card.tsx
git add -u  # stages deletions of card-stack.tsx and quote-stack-client.tsx
git commit -m "feat: replace card stack with scroll-snap carousel and tilt quote cards"
```

---

### Task 5: Update Layout Section Width

**Files:**
- Modify: `app/[locale]/layout.tsx`

**Step 1: Remove horizontal padding constraint on AI section**

The AI quote section needs full viewport width for the scroll container. Change the section in `layout.tsx`:

From:
```tsx
{/* AI Quote Section */}
<section className="px-4 py-8 md:py-16">
  <AIQuoteStack locale={locale} />
</section>
```

To:
```tsx
{/* AI Quote Section */}
<section className="py-8 md:py-16">
  <AIQuoteStack locale={locale} />
</section>
```

Remove `px-4` so the scroll container's own `paddingInline` handles centering.

**Step 2: Remove unused imports**

Check `layout.tsx` for any imports that reference deleted files. The `AIQuoteStack` import stays. No others should reference card-stack or quote-stack-client.

**Step 3: Verify types compile**

Run: `bun run tsc`

Expected: Clean compilation.

**Step 4: Commit**

```bash
git add app/[locale]/layout.tsx
git commit -m "fix: remove px-4 from AI section for full-width scroll carousel"
```

---

### Task 6: Lint and Final Verification

**Files:** None (verification only)

**Step 1: Run biome lint**

Run: `bun run lint:biome`

Expected: No errors. Fix any warnings.

**Step 2: Run ESLint**

Run: `bun run lint:eslint`

Expected: No errors. Fix any warnings.

**Step 3: Run type check**

Run: `bun run tsc`

Expected: Clean.

**Step 4: Run build**

Run: `bun run build`

Expected: Build succeeds. (API calls will fail without env vars, but the build should not error.)

**Step 5: Fix any issues found in steps 1-4**

**Step 6: Final commit if any fixes were needed**

```bash
git add -A
git commit -m "chore: lint fixes and cleanup"
```

**Step 7: Push**

```bash
git push -u origin claude/redesign-portfolio-website-IuCYg
```
