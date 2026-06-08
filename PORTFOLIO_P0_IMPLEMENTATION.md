# P0 Portfolio Implementation Notes

Source diagnosis: `PORTFOLIO_PRODUCT_DESIGN_AUDIT.md`

## Goal

Reposition the portfolio so it reads as a senior product-minded engineering profile in the first minute. The implementation moves the strongest proof upward, makes experience easier to scan, treats featured side projects as product case studies, and compresses lower-conversion credentials into one supporting section.

## Implemented Decisions

### Senior Hero

Problem: the previous hero described a generic full stack engineer and used CTAs that led to CV-style sections.

Change: the hero now states senior-level product engineering positioning, highlights modernization and end-to-end ownership, and routes visitors to impact and products before the resume download.

Rationale: hiring managers and senior engineers should understand the professional value proposition before reading details.

### Impact Section

Problem: the strongest signals were buried in long experience bullets.

Change: a new impact section presents four proof points: years of experience, technical leadership, modernization, and products shipped across mobile and web.

Rationale: proof points give recruiters and hiring teams a fast seniority scan without making them parse the whole timeline.

### Scannable Experience

Problem: long responsibility lists mixed scope, implementation, and outcomes.

Change: experience data now supports summaries, scope tags, key achievements, and stack chips while preserving `responsibilities` fallback compatibility.

Rationale: senior evaluation depends on scope, decision-making, and measurable outcomes more than exhaustive task lists.

### Portfolio Case Studies

Problem: featured projects had strong substance but read like project cards.

Change: featured projects now expose problem, user, solution, role, and outcome fields. Smaller projects remain visible as experiments.

Rationale: CiudadanoUSA and Renderlog are better evidence of product judgment when presented as end-to-end case studies.

### Compact Credentials

Problem: education, languages, and certifications occupied too much visual weight for their conversion value.

Change: those signals now live in one compact credentials section with concise language, smaller visuals, and support-level hierarchy.

Rationale: credentials matter, but the senior story should be led by impact, experience, and products.

## Accessibility and i18n

- All new public copy is stored in `src/i18n/locales/es.json` and `src/i18n/locales/en.json`.
- Spanish remains the editorial lead, with matching English structures to keep tests and content helpers predictable.
- New sections use semantic headings, list roles where useful, keyboard-reachable links, and existing focus styles.
- Tests cover rendering and `jest-axe` accessibility checks for new components.

## Validation

Run before handoff:

```sh
npm run test:run
npm run build
npm run lint:check
```
