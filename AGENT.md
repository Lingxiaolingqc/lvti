# LVTI Project Handoff

## Current State

This workspace contains a working static LVTI website. It does not require a build step and can be opened directly from `index.html`.

Implemented files:

- `index.html`: app entry point.
- `src/styles.css`: responsive mobile-first styling.
- `src/app.js`: complete static app logic.
- `src/data/lvtiAxes.json`: axis metadata.
- `src/data/lvtiScale.json`: 5-point answer scale.
- `src/data/lvtiQuestions.json`: 40 bilingual LVTI questions.
- `src/data/lvtiResults.json`: 16 result codes with names and taglines.

The app is a bilingual self-test for LVTI, the Love View Type Indicator. Users answer 40 questions and receive one of 16 types based on four axes:

- `R/P`: Romantic vs Practical
- `S/F`: Stable vs Free
- `D/I`: Direct vs Indirect
- `E/C`: Emotional vs Calm

## Implemented Behavior

- Start screen with English/Chinese language toggle.
- Upgraded cover screen with test introduction, test facts, four-axis preview, and start/continue button.
- Opening the site should show the cover/entrance screen first, not jump directly into questions or results.
- Language switching should be a single choice control. English and Chinese should not be displayed as parallel duplicated UI.
- One-question-at-a-time test flow.
- The question bank may contain more than 40 questions. Each test session should randomly select 40 questions.
- Random selection must remain balanced: 10 questions per axis and 5 questions per pole.
- Selected question IDs should persist during a session so refresh/back navigation does not change the test.
- 5-point answer scale.
- Progress indicator.
- Back and next navigation.
- Local progress persistence through `localStorage`.
- Result calculation after all 40 questions are answered.
- Result screen with type code, nickname, tagline, axis breakdown, strengths, blind spots, communication style, conflict style, ideal dynamic, and compatibility notes.
- Native Web Share API support with clipboard fallback.
- Retake flow that clears test progress but keeps language.

## Scoring Rules

Each answer value is:

- Strongly disagree: `-2`
- Disagree: `-1`
- Neutral: `0`
- Agree: `1`
- Strongly agree: `2`

Each question has:

- `axis`
- `positivePole`
- `reverse`
- bilingual text

Axis positive poles:

- `RP`: `R`
- `SF`: `S`
- `DI`: `D`
- `EC`: `E`

If the final score for an axis is `>= 0`, the positive pole wins. If it is `< 0`, the opposite pole wins. This means ties produce `R`, `S`, `D`, and `E`.

Confidence labels:

- `0-4`: slight
- `5-10`: clear
- `11-20`: strong

## Important Implementation Note

The app currently embeds question/result data directly in `src/app.js` so it can run by opening `index.html` without a local server. The JSON files in `src/data/` are also present as editable model records, but `app.js` does not currently load them dynamically.

Reason: the environment used for the initial implementation did not have `node` or `npm`, so a Vite/React app could not be scaffolded or verified. The static version was chosen to make the product usable immediately.

## Verification Already Done

The following checks were performed:

- Confirmed project files exist.
- Parsed all JSON data files.
- Confirmed data counts:
  - 4 axes
  - 5 scale values
  - 40 questions
  - 16 result records
- Ran a runtime smoke test for `src/app.js` using DOM/localStorage stubs.

`git status` was attempted, but this directory is not currently a Git repository.

## Known Gaps

- No Vite/React project has been created yet.
- No automated browser tests exist.
- The app has not been visually tested in a real browser from this agent session.
- `src/data/lvtiResults.json` only stores code, name, and tagline. Full generated profile content is currently produced programmatically in `src/app.js`, not stored fully in JSON.
- The result copy is generic per trait combination, not the full hand-written 16-profile draft from the planning conversation.
- The static app and JSON records duplicate some model data.

## Recommended Next Steps

1. Open `index.html` in a browser and manually test the full flow.
2. If Node/npm are available, convert this into a Vite React + TypeScript app.
3. Move all model data out of `src/app.js` into JSON or TypeScript data modules.
4. Replace the generated result copy with the full hand-written 16 result profiles from the planning conversation.
5. Add automated tests for scoring and model validation.
6. Add real browser QA for mobile and desktop widths.
7. Refine type names and Chinese copy after a small user test.

## Suggested React/Vite Migration Shape

If continuing with the original plan, create:

- `src/types/lvti.ts`
- `src/lib/scoring.ts`
- `src/lib/validation.ts`
- `src/lib/storage.ts`
- `src/lib/i18n.ts`
- `src/components/LanguageToggle.tsx`
- `src/components/StartScreen.tsx`
- `src/components/TestScreen.tsx`
- `src/components/ProgressBar.tsx`
- `src/components/QuestionCard.tsx`
- `src/components/ScaleButtonGroup.tsx`
- `src/components/ResultScreen.tsx`
- `src/components/AxisBreakdown.tsx`
- `src/components/ResultSection.tsx`
- `src/components/ShareButton.tsx`

Keep behavior compatible with the current static version unless intentionally changing product scope.

## Product Scope To Preserve

Keep LVTI v1 as:

- Bilingual: English and Chinese.
- User chooses one display language at a time; do not show both languages together in normal UI.
- Has a clear entrance/cover page before the test starts.
- Self-test only.
- No accounts.
- No backend.
- No friend voting.
- No public profile pages.
- No saved result links.
- No psychological diagnosis claims.
