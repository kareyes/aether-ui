# Themes

`src/lib/styles/theme.css` is the base token layer and ships as
`aether-ui/styles`. A **theme** is a scoped re-declaration of that layer —
never a second copy of `theme.css`, never a component rewrite. Each one lives
in this directory, is exported from `package.json`, and costs nothing until its
class is on the page.

| Theme | The world it comes from | Reach for it when |
|---|---|---|
| [Pelican](./PELICAN.md) | a farming game's wooden menus — parchment panels, ink outlines, four seasons | the product should feel handmade and playful |
| **Ledger** | green-bar continuous-form payroll paper — banded rows, sprocket margins, red ink for negatives | dense figures are the point: payroll runs, audit logs, reconciliation |
| **Blueprint** | reprographic drafting — a diazo whiteprint by day, a cyanotype by night | the screen is a schematic: pipelines, test runs, infrastructure |
| **Bundy** | the enamelled punch clock bolted beside the door | a wall tablet hit with a thumb and read across a room |
| **Sampaguita** | the jasmine garland that opens after dark | an employee chose to open this screen: self-service, onboarding, sign-in |
| **Capiz** | oyster-shell panes set in a wooden window grid | the surface itself should read as glass — translucent panels over a live ground |
| **Alloy** | anodized aluminium milled from a single billet | the product should feel like a precision instrument: tight, neutral, one accent |
| **Reticle** | a heads-up display — amber phosphor on smoked glass | the screen is a readout: monitoring, telemetry, live operations |

Three come with a caveat. Bundy inflates every hit target to 52px, which is
right on a kiosk and wrong on an admin table. Sampaguita removes hard edges
entirely, which is calm on a self-service page and too soft for a screen someone
operates all day. Capiz makes `--card`, `--muted` and `--accent` translucent and
blurs what is behind them: it needs a ground to be glass *over* — put
`.capiz-lagoon` (or your own image) on the page shell, or the theme just looks
washed out — and `backdrop-filter` puts every panel on the compositor, which is
worth measuring before using it on a long virtualised table.

Reticle and Alloy are the two safe defaults in this set: Alloy for dense
operator screens, Reticle where the data is live.

## Using one

Put the class on `<html>`, next to mode-watcher's `.dark`:

```html
<html class="theme-ledger">        <!-- light -->
<html class="theme-ledger dark">   <!-- dark  -->
```

`<html>` rather than a wrapper div, because dialogs, popovers, dropdowns and
toasts portal to `<body>` — a nested scope leaves every overlay un-themed.
Scoping to a subtree still works for everything that renders in place.

Import the theme **after** the base tokens:

```css
@import "tailwindcss";
@import "aether-ui/styles";
@import "aether-ui/styles/ledger";
```

Order matters. The theme class and `.dark` are both one class deep, so the light
palette only beats the base dark palette by coming later in the sheet;
`.theme-ledger.dark` (two classes) then beats both.

### Fonts

No theme bundles its faces — a package stylesheet should not force a request to
`fonts.googleapis.com` on every consumer. Each theme's file header carries the
`<link>` for its own faces, and every font token names a platform fallback
stack, so a theme degrades rather than breaks without them.

| Theme | Display | Utility / body |
|---|---|---|
| Pelican | Pixelify Sans | Silkscreen |
| Ledger | Zilla Slab | IBM Plex Mono |
| Blueprint | Barlow Condensed | Share Tech Mono |
| Bundy | Archivo Black | Azeret Mono |
| Sampaguita | Newsreader | Karla |
| Capiz | Urbanist | Be Vietnam Pro |
| Alloy | Schibsted Grotesk | Spline Sans Mono |
| Reticle | Chakra Petch | Martian Mono |

## What a theme re-declares

Two blocks: the scope class carries the light palette, and
`.<theme>.dark, .dark .<theme>, .<theme> .dark` carries the dark one. Between
them they cover every role token the base `:root` declares — surfaces,
`--primary` / `--destructive` / `--warning` / `--success` / `--info` with their
foregrounds, `--chart-*`, `--sidebar-*`, `--header` / `--footer`, `--code-*`,
`--illustration-*`, and the `--status-*` scale with its `-label` companions.

Each theme also declares its own `--<name>-*` palette locals. Those split in
two: **fixed hues**, which are the palette's identity and read the same in both
modes, and **mode-reactive chrome** (insets, grooves, shadows, scrims), which
must appear in *both* blocks.

### The reds

`--danger`, `--danger-foreground`, `--status-danger` and `--aether-danger` have
to be re-declared inside the scope, even though they are just aliases of
`--destructive` in the base `:root`. That declaration is substituted on the
element the `:root` block matched — scope a theme to a subtree and that element
sits above it, so the alias keeps the base red while everything else moves. The
result is a theme shipping two different reds.

## Adding one

1. Write `<name>.css` here, following the two-block structure above.
2. Hang structural chrome off `data-slot`, not off component edits. Where a
   variant must opt out — ghost buttons have no ground to bevel — use the
   `data-variant` hook rather than matching class strings from CSS.
3. Add `<name>.test.ts` beside it. It is about fifteen lines: call
   `describeThemeContract` from [`theme-contract.ts`](./theme-contract.ts) with
   the theme's name and its mode-invariant token list, then assert whatever is
   specific to the theme.
4. Export it from `package.json` as `./styles/<name>` and
   `./styles/themes/<name>.css`.
5. Register it in `src/routes/theme.svelte.ts` and import it in `src/app.css`
   so the preview app's nav picker can reach it.

`theme-contract.ts` enforces the rules that are easy to get wrong: only
overriding names `:root` already declares (an invented token has no `--color-*`
alias, so no utility ever reads it), giving every mode-reactive token a value in
both blocks (the light palette outranks `.dark` on source order, so a
light-only literal survives into dark mode), pairing every role token with its
foreground, re-pointing the derived reds, and referencing no token the theme
does not declare.

## Contrast

Every palette in this directory clears WCAG AA (4.5:1) on each
foreground/background pair it defines, in both modes — including the role
colours used as text on the page ground, which is the pair that usually slips.

**This is asserted, not reviewed.** `describeThemeContract` measures both pair
families on every theme (`contrast.ts`), so a palette that drops under the bar
fails its own test with the ratio named. It was a prose claim until it stopped
being true: Pelican shipped `--warning` at 1.69:1, `--info` at 2.52:1 and
`--success` at 2.97:1 as text on parchment, plus `--muted-foreground` at 3.86:1
and a night `--destructive` at 4.18:1 on `--card`, while this paragraph said
otherwise.

Values deepened to get there: Bundy's punch orange, Sampaguita's stamen gold,
Capiz's sand, Alloy's info blue, and Pelican's crop/sky/coin. Keep new palettes
to the same bar.

Where a hue is the palette's *identity* and cannot also carry text, split it
rather than compromising either job — a `-deep` companion for the role token, the
lit value for fills, and the role's foreground flipped to the light surface.
Reticle's `phosphor` / `phosphor-deep` and Pelican's `crop` / `crop-deep` are
the two worked examples.

Capiz needs one extra check the others do not. Its surface tokens carry an
alpha, so a pair only holds over the ground it was measured on — `--background`,
or the sidebar for the `--sidebar-*` fills. Over an arbitrary photograph none of
it holds; put images behind a pane, not under body text.

## Seeing them

`bun run dev` in this package. Every demo route wears the theme chosen in the
nav picker, so each page doubles as a test of the theme against a component that
knows nothing about it. The choice is stored under `aether-ui:theme` and applied
before first paint from `src/app.html`.
