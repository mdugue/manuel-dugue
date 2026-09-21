---
name: update-skills
description: >-
  Update, refresh, re-add, or reinstall this repo's agent skills (the ones
  vendored under .agents/skills/ and pinned in skills-lock.json via skills.sh).
  Use this whenever the user wants to update skills, refresh a skill to its
  latest version, bump skill versions, add a new skill from a GitHub repo, or
  asks why `skills update` "doesn't work" — even if they don't mention skills.sh
  or npx by name. This project runs on Node.js/npm: always drive the skills CLI
  with `npx skills@latest`, never `bunx`.
---

# Updating this repo's skills

This project's agent skills are **vendored** — the actual files live under
`.agents/skills/<name>/` and are symlinked into `.claude/skills/<name>/`. The
set installed from [skills.sh](https://www.skills.sh/) is pinned in
`skills-lock.json` (each entry records its `source`, e.g. `vercel/ai`).

Two skills are **local**, authored in this repo, and deliberately *not* in the
lockfile: `skill-profile` and `update-skills` (this one). Never try to refresh
those from a remote — they have no upstream.

## Why `npx`, not `bunx`

This project runs on Node.js with npm (`package-lock.json`, plain `next`
scripts) — see the Runtime note in `AGENTS.md`. Use `npx -y skills@latest ...`
so the toolchain stays consistent and the permission allowlist
(`Bash(npx skills:*)`) covers it. The CLI is not a project dependency, so it
never touches `package.json` or `package-lock.json`.

## `npx skills update` vs. re-adding

Try the in-place update first — it refreshes every lockfile entry that has a
`skillPath`:

```sh
npx -y skills@latest update -y -p
```

It sometimes skips a skill with "Multiple current paths match" (the vendored
folder plus its `.claude/skills/` symlink both resolve to it). For those, or if
`update` reports nothing to do, fall back to the reliable path:
**re-add each skill individually from its source.**

## The refresh procedure

For each skill you want to refresh, look up its `source` in `skills-lock.json`
and re-add it by **naming the exact skill**. Naming the skill matters: several
of these sources are multi-skill repos (e.g. `vercel-labs/agent-skills` ships a
dozen skills), and an unscoped add pulls in *all* of them plus stray artifacts.

```sh
npx -y skills@latest add https://github.com/<owner>/<repo> --skill <skill-name> -y
```

**Example** — refresh just the AI SDK best-practices skill:

```sh
npx -y skills@latest add https://github.com/vercel-labs/agent-skills --skill vercel-react-best-practices -y
```

One skill per command — `--skill` takes a single name, not a
comma-separated list (an unrecognized list silently matches nothing). To
refresh several skills from the same repo, loop the command over each name.

### Mapping skills to sources

`source` values in the lockfile are `owner/repo` shorthand; expand them to the
full GitHub URL for the `add` command. Current mapping:

| skill | source repo |
|---|---|
| ai-sdk | vercel/ai |
| deploy-to-vercel | vercel-labs/agent-skills |
| react-pdf | molefrog/skills |
| skill-creator | anthropics/skills |
| ultracite | haydenbleasel/ultracite |
| vercel-composition-patterns | vercel-labs/agent-skills |
| vercel-react-best-practices | vercel-labs/agent-skills |
| vercel-react-view-transitions | vercel-labs/agent-skills |
| web-design-guidelines | vercel-labs/agent-skills |

Always re-read `skills-lock.json` rather than trusting this table — it's a
snapshot and the lockfile is the source of truth.

## After refreshing: review and clean up

Re-adding can introduce more than you asked for. Always inspect before
committing:

1. **`git status`** — confirm only the intended skills changed.
2. **Prune extras.** A multi-skill add may create skill directories that aren't
   in `skills-lock.json` (e.g. `vercel-optimize`, `vercel-react-native-skills`).
   Remove the ones you didn't want, in *both* `.agents/skills/` and the
   `.claude/skills/` symlink.
3. **Delete stray artifacts** — the CLI sometimes drops an `Archive.zip` into a
   skill folder. Remove it.
4. **Don't hand-edit** vendored skill files or `skills-lock.json`. Let the CLI
   own them; manual edits desync the `computedHash` and corrupt the lockfile.

## Adding a brand-new skill

Same command, with a source the user provides:

```sh
npx -y skills@latest add https://github.com/<owner>/<repo> --skill <skill-name> -y
```

Then run the same review-and-cleanup pass. The CLI updates `skills-lock.json`
and creates the `.claude/skills/` symlink automatically.
