# Accessibility

## Goal

Make the portfolio comfortable to navigate with a keyboard, predictable for screen reader users, and covered by automated tests that catch regressions in the app shell, navigation, and interactive components.

## Implemented Baseline

- The skip link is the first focusable control and targets `#main-content`.
- The main landmark is programmatically focusable so skip-link activation moves focus reliably.
- The mobile menu opens as a modal dialog, moves focus to the close button, traps `Tab` and `Shift+Tab`, closes on `Escape`, and restores focus to the menu button.
- Active navigation items expose `aria-current="location"`.
- Assistive labels live in `src/i18n/locales/en.json` and `src/i18n/locales/es.json`.
- The hero is a labelled section inside `main`, not a nested page banner.
- Experience roles use headings under the section heading.
- Reduced-motion users get instant section scrolling and immediate focus timing.
- App shell, drawer, skip link, focus management, language toggle, screenshot gallery, and key components are covered by Vitest and jest-axe.

## Screen Reader Contract

The expected high-level page outline is:

1. Skip link to main content.
2. Main navigation with brand, section links, language controls, theme switch, and mobile menu trigger.
3. Main landmark with a single `h1`, followed by labelled portfolio sections.
4. Contact closing section with contact actions.
5. Contentinfo footer.

Interactive controls should announce their purpose, state, and destination without requiring visual context.

Approximate English screen-reader flow:

```text
Link: Skip to main content
Navigation landmark: Main navigation
Button: Open mobile menu, collapsed
Link: Go to about section, Wilberto Pacheco
Links: Impact, Products, Experience, Skills, Process, Contact
Group: Toggle language
Button: ES - Switch to Spanish
Button: EN - Switch to English, pressed
Switch: Switch to Dark Mode, off
Main landmark
Heading level 1: Wilberto Pacheco Batista
Region: Call to action
Links: View professional impact, Let's talk, Download Resume
Region: Social media links
Links: Visit LinkedIn profile, Visit GitHub profile, Visit X profile
Regions: Results with impact, What I've built, Professional trajectory, Technical capabilities, How I work, Education and certifications
Contentinfo
```

## Keyboard Contract

- `Tab` starts on the skip link, then moves through navigation controls and page actions in visual order.
- `Enter` on the skip link moves focus to the main landmark.
- `Enter` or `Space` on the mobile menu button opens the drawer.
- When the drawer opens, focus moves into it.
- `Tab` and `Shift+Tab` cycle inside the drawer until it closes.
- `Escape` closes the drawer and returns focus to the menu button.

## Automated Coverage

- `tests/unit/App.spec.js`: skip link, main landmark, footer, single `h1`, locale sync, and app-level axe.
- `tests/unit/Navigation.spec.js`: drawer open/close, focus entry, focus trap, Escape focus return, `aria-current`, and axe.
- `tests/unit/MobileMenuDrawer.spec.js`: dialog semantics, inner mobile navigation, active link state, and axe.
- `tests/unit/composables/useMobileMenu.spec.js`: scroll lock, outside click, Escape, focus entry, and tab trap.
- `tests/unit/composables/useSectionScroll.spec.js`: fixed-nav scroll offset, heading focus, and reduced-motion behavior.
- `tests/unit/LanguageToggle.spec.js`: labelled language controls, pressed state, keyboard focus, and axe.
- `tests/unit/PortfolioScreenshotGallery.spec.js`: labelled screenshots, carousel controls, disabled states, active dot state, and axe.

## Manual QA Checklist

- Navigate from page load with only `Tab`, `Shift+Tab`, `Enter`, `Space`, and `Escape`.
- Confirm the skip link appears on focus and moves focus to the main landmark.
- Open the mobile menu at a narrow viewport and verify focus stays inside the drawer until close.
- Confirm the current section is announced as current by a screen reader.
- Toggle language and verify `document.documentElement.lang` and accessible labels change.
- Enable reduced motion and verify section navigation does not animate.
- Run a spot check with VoiceOver, NVDA, or another screen reader for the main outline and drawer behavior.

## Validation

Run these commands before handoff:

```sh
npm run test:run
npm run build
npm run lint:check
```
