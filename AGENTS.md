# Repository Agent Rules

## Purpose

This portfolio is a Vue 3, Vite, and Vue i18n personal site. Any AI tool working in this repo should preserve the portfolio's senior product narrative, bilingual content model, accessibility standards, and existing component patterns.

## Stack and Commands

- Runtime: Vue 3 with Vite.
- Content: Vue i18n locale files in `src/i18n/locales`.
- Tests: Vitest, Testing Library Vue, jest-axe.
- Styling: component-scoped CSS plus shared tokens in `src/assets/css/main.css`.
- Expected validation before handoff:
  - `npm run test:run`
  - `npm run build`
  - `npm run lint:check`

## Implementation Rules

- Follow established component patterns before introducing new abstractions.
- Keep public copy in locale JSON files; do not hardcode user-facing content in Vue templates unless it is a stable brand/name.
- Keep Spanish as the editorial source of truth, and maintain matching English structure for every public i18n change.
- Use semantic HTML, keyboard-friendly interactions, accessible names, and existing `jest-axe` patterns.
- Prefer scoped component styles and existing CSS variables (`--space-*`, `--text-*`, `--bg-*`, `--primary-color`, etc.).
- Do not add dependencies unless the change clearly requires them and the decision is documented.
- Document new helpers, non-obvious data shapes, and product/design decisions with succinct JSDoc or Markdown.
- Preserve backwards-compatible fallbacks when evolving i18n content structures used by existing components or tests.

## Product and Design Direction

- The portfolio should communicate seniority quickly: leadership, impact, modernization, product judgment, and end-to-end ownership.
- Prefer curated proof over exhaustive lists.
- Projects should read as products or case studies when they are featured.
- Education, languages, and certifications should support the story without overpowering the main narrative.

## Pull Request Notes

- Create PR descriptions from `.github/pull_request_template.md` when that template exists.
- Include a concise summary, tests run, documentation changes, and any product/design rationale that affects the site experience.
