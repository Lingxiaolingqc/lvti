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

It is for self-reflection and entertainment.
