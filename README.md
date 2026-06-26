# LVTI

LVTI, short for **Love View Type Indicator**, is a bilingual self-test website for exploring a person's love-view type.

The test asks 40 lightweight relationship questions and calculates one of 16 LVTI types based on four dimensions:

- **R / P**: Romantic vs Practical
- **S / F**: Stable vs Free
- **D / I**: Direct vs Indirect
- **E / C**: Emotional vs Calm

The project is currently a static website, so it can run directly in a browser without a build step.

## Features

- Cover page with test introduction
- English / Chinese language selection
- 40-question one-by-one test flow
- 5-point answer scale
- Progress indicator
- Back and next navigation
- Local progress saving with `localStorage`
- Result page with type code, nickname, axis breakdown, strengths, blind spots, communication style, conflict style, ideal dynamic, and compatibility notes
- Share result button using Web Share API or clipboard fallback
- Retake test flow

## How To Run

Open `index.html` directly in a browser.

No installation is required for the current static version.

## Project Structure

```text
.
+-- index.html
+-- AGENT.md
+-- README.md
+-- src
    +-- app.js
    +-- styles.css
    +-- data
        +-- lvtiAxes.json
        +-- lvtiQuestions.json
        +-- lvtiResults.json
        +-- lvtiScale.json
```

## Code Guide

This section explains what each part of the code does.

### `index.html`

`index.html` is the browser entry point.

It does three things:

- Defines the basic HTML document.
- Loads `src/styles.css`.
- Creates `<main id="app">`, where the JavaScript app renders all screens.
- Loads `src/app.js`.

The app is static, so there is no server-side rendering and no framework build process.

### `src/styles.css`

`src/styles.css` contains all visual styling for the website.

Main style areas:

- Global theme variables such as colors, fonts, borders, and background.
- Top navigation and language picker styling.
- Cover page layout, including the intro area and the four-axis preview panel.
- Question screen layout, progress bar, answer buttons, and navigation buttons.
- Result screen layout, result sections, axis breakdown, and share/retake actions.
- Mobile responsive rules for small screens.

If you want to change how the website looks, this is the main file to edit.

### `src/app.js`

`src/app.js` contains the full app logic. It is currently written as plain JavaScript so the site can run by opening `index.html` directly.

Important sections:

- `LANGUAGES`, `AXIS_POSITIVE_POLE`, `AXIS_NEGATIVE_POLE`, `AXIS_COLORS`, and `STORAGE_KEYS` define app constants.
- `uiText` stores English and Chinese UI copy.
- `axes` defines the four LVTI dimensions and their localized labels.
- `questions` stores the 40 quiz questions used by the running app.
- `resultBase` stores the 16 type codes, names, and taglines.
- `results` expands `resultBase` into full result objects.
- `state` stores the current language, answers, progress, completion status, and active screen.

Main functions:

- `q(...)`: creates a question object.
- `makeResult(...)`: creates a result profile from a type code and base name/tagline.
- `describeCode(...)`: converts a type code into readable trait words.
- `strengthLines(...)`: generates result strengths based on the letters in the type code.
- `blindSpotLines(...)`: generates result blind spots based on the type code.
- `communicationLine(...)`, `conflictLine(...)`, `idealLine(...)`, and `compatibilityLine(...)`: generate result page text.
- `scoreLvti()`: calculates axis scores and final type code from the user's answers.
- `confidenceLabel(...)`: converts a score strength into `slight`, `clear`, or `strong`.
- `render()`: redraws the current screen.
- `topbar()`: renders the LVTI header and language selector.
- `mainContent()`: chooses whether to show the cover, test, or result screen.
- `startScreen()`: renders the cover/entrance page.
- `testScreen()`: renders the current question and answer choices.
- `resultScreen()`: renders the final LVTI result.
- `bindEvents()`: attaches click/change handlers after each render.
- `handleAction(...)`: handles start, back, next, retake, and navigation behavior.
- `shareResult()`: shares or copies the result text.
- `completedAll()`: checks whether all questions have been answered.
- `loadLanguage()`, `loadJson()`, `saveJson()`, `loadNumber()`, and `loadBoolean()`: handle localStorage persistence.
- `validateModel()`: checks that the question/result model has the expected shape.

### `src/data/lvtiAxes.json`

This file records the four LVTI axes:

- `RP`
- `SF`
- `DI`
- `EC`

Each axis has:

- an id
- two poles
- English and Chinese names
- English and Chinese guiding question

This file is useful as a clean model reference, especially if the project later moves to React or TypeScript.

### `src/data/lvtiScale.json`

This file records the 5-point answer scale:

- `-2`: strongly disagree
- `-1`: disagree
- `0`: neutral
- `1`: agree
- `2`: strongly agree

Each option has English and Chinese labels.

### `src/data/lvtiQuestions.json`

This file records the 40 LVTI questions in a structured format.

Each question has:

- `id`
- `axis`
- `positivePole`
- `reverse`
- English and Chinese text

The running app currently also embeds these questions in `src/app.js` for direct browser compatibility. If you edit questions, keep `src/app.js` and this JSON file in sync until the app is refactored to load data from files/modules.

### `src/data/lvtiResults.json`

This file records the 16 LVTI type codes with localized names and taglines.

The running app currently generates full result profiles in `src/app.js`, so this JSON file is a partial result catalog. A future improvement is to move all full result text into this file.

### `AGENT.md`

`AGENT.md` is a handoff file for future Codex sessions.

It explains:

- what has already been built
- current project behavior
- known limitations
- recommended next steps
- product rules that should be preserved

Use it when starting a new coding session so the next agent can continue without rediscovering the project from zero.

## Scoring Model

Each answer uses a 5-point scale:

```text
Strongly disagree = -2
Disagree = -1
Neutral = 0
Agree = +1
Strongly agree = +2
```

Each question maps to one LVTI axis and one positive pole. The app adds the answer score to the corresponding axis. The final type is built from the winning pole on each axis.

Tie fallback:

```text
RP = R
SF = S
DI = D
EC = E
```

Example result:

```text
RSDE = Romantic + Stable + Direct + Emotional
```

## Current Status

This is an early working version. The main product flow works, but the model and result copy should still be reviewed with real users.

Known next improvements:

- Replace generated result profile text with fully hand-written profiles for all 16 types
- Refine Chinese and English wording after user feedback
- Convert the static app to React + TypeScript if the project grows
- Add automated scoring and data validation tests
- Add a deploy target such as GitHub Pages

## Product Scope

LVTI v1 is intentionally simple:

- Self-test only
- No login
- No backend
- No database
- No friend voting
- No public profile pages
- No psychological diagnosis claims

It is for entertainment.
