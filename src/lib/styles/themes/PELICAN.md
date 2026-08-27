# Pelican

A Stardew-flavoured theme for aether-ui: wooden menu frames, parchment panels,
ink outlines, and a four-season accent set. Wood and coin by day, lamp-lit wood
on a night field after dark.

It is a theme, not a fork. Every component in the library renders it unchanged
— `pelican.css` re-declares the token layer inside a `.theme-pelican` scope and
adds a chrome pass keyed on `data-slot`, the attribute component roots already
carry.

## Using it

```css
/* app.css */
@import "tailwindcss";
@import "aether-ui/styles";
@import "aether-ui/styles/pelican"; /* after the base tokens — see below */
@source "../node_modules/aether-ui/dist/**/*.{svelte,js}";
```

```html
<html class="theme-pelican">      <!-- day -->
<html class="theme-pelican dark"> <!-- night, alongside mode-watcher -->
```

**Put the class on `<html>`.** Dialogs, sheets, selects, dropdowns, tooltips and
toasts portal to `<body>`; a scope nested inside the app shell leaves every
overlay un-themed. Scoping to a subtree is supported and works for everything
that renders in place — useful for a preview pane, not for an app.

**Import order matters.** `.theme-pelican` and `.dark` are both one class deep,
so the day palette only outranks the base dark palette by coming later in the
sheet. `.theme-pelican.dark` is two classes and wins over both. Importing
Pelican *before* `aether-ui/styles` silently gives you a dark base palette with
Pelican chrome.

### Fonts

The stylesheet does not `@import` a font — a package sheet should not force
every consumer into a request to a third-party host. Add the faces yourself:

```html
<link rel="preconnect" href="https://fonts.googleapis.com" />
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
<link
	href="https://fonts.googleapis.com/css2?family=Pixelify+Sans:wght@400..700&family=Silkscreen:wght@400;700&display=swap"
	rel="stylesheet"
/>
```

Without them the theme falls back to the platform monospace stack — still
readable, no layout shift, just not pixelated. Self-hosting works the same way:
the theme only reads `--font-pelican-display` / `--font-pelican-utility`, so
point those at whatever you serve.

## What it re-declares

Two blocks: `.theme-pelican` (day) and `.theme-pelican.dark` (night). Both
override only names the base `:root` already declares — a theme can re-colour a
token but never invent one, because no `@theme inline` alias would point at it.

| Role | Day | Night |
|---|---|---|
| `--background` | parchment `#fff3d6` | night `#1a1626` |
| `--card` / `--popover` | light parchment | dark wood `#3a2a1b` |
| `--foreground` | ink `#2b1608` | parchment `#f2e3c0` |
| `--primary` | wood `#9c5f2c` | wood-light `#d9a066` |
| `--secondary` / `--accent` | parchment-2 `#f0dca8` | `#5a3f27` |
| `--muted` | parchment-3 `#e2c88e` | `#4a3524` |
| `--destructive` | heart `#c0342d` | `#ea6259` |
| `--success` | crop `#5e9e2e` | `#7cbe45` |
| `--warning` | coin `#f0b429` | `#f5c24c` |
| `--info` | sky `#4ba3dc` | `#6fb9e8` |
| `--border` / `--input` | ink | `#17100a` |
| `--ring` | sky | `#7cc5f0` |
| `--sidebar` / `--header` | wood, parchment text | `#2c1f14` |

Also re-themed: `--chart-*` (the four seasons, then wood), `--status-*`,
`--code-*`, and the `--illustration-*` palette. The base theme deliberately
pins the illustration accent to a fixed brand blue so it survives light/dark;
a theme is exactly the case that should move it, so Pelican does.

`--destructive` is deepened from the reference's `#d6453d`, which lands at
3.99:1 against parchment — under AA for a button label sitting on it.

### The reds

`--danger`, `--status-danger` and `--aether-danger` are declared in the base
`:root` as `var(--destructive)`. Custom properties are substituted where they
are *declared*, not where they are used, so those three froze to the base red
at `:root` — overriding `--destructive` in a scope does not reach them. Pelican
re-declares all three inside the scope. Any future theme has to do the same, and
`pelican.test.ts` asserts it.

## Chrome

Colour comes from the tokens; shape comes from a `data-slot` pass:

- **Panels** (card, popover, dialog, sheet, dropdown, select, command, table
  container, tooltip, empty, chatbox) — 3px ink border, 3px corners, a
  highlight along the top edge and a hard offset shadow.
- **Buttons** — beveled, with a 4px under-shadow they sink into when pressed.
  Keyed on `data-variant`, so `ghost` and `link` keep their flat ground.
- **Fields** (input, textarea, select trigger, OTP slot, command input) — an
  inset well of aged parchment behind an ink outline.
- **Checkbox / radio / switch / slider** — square wells and levers. The well
  fill is scoped to `[data-state="unchecked"]` so a checked control keeps its
  role colour.
- **Progress and slider tracks** — outlined rather than bordered (a 6px track
  has no room for a 3px border on each edge) and overlaid with the notch
  pattern of a skill bar.
- **Badges, avatars, table headers, tabs, accordions, toasts** — utility face,
  ink edges, square portraits, a wooden table header.
- **Alerts** — opaque parchment with a 12px edge in the state colour. The stock
  variants tint with `bg-<role>/10`, which over a grass field reads as grass.

These rules are two classes deep, so they beat the utilities baked into the
components — and also beat a caller's own `class` prop, which is one class. To
override locally, use `!` (`class="!rounded-full"`) or drop the theme scope on
that subtree.

## Opt-in helpers

Layout decisions the theme cannot infer from a `data-slot`. All are scoped to
`.theme-pelican` and inert outside it.

| Class | What it is |
|---|---|
| `.pelican-field` | the grass ground with its tile grid — for the page shell |
| `.pelican-frame` | the beveled wooden menu border, four nested rings and corner nails |
| `.pelican-slot` | an inventory slot |
| `.pelican-label` | a small-caps label in the utility face |

## Seeing it

`bun run dev` in `ui-packages/aether-ui`. The preview app wears Pelican on every
route, so each demo page doubles as a test of the theme against a component that
knows nothing about it. The switch in the nav takes it off again — the choice is
stored, and `app.html` applies it before first paint so neither setting flashes
— and the dark-mode toggle switches day and night. `/pelican` is the guided tour:
palette, every themed slot, and the opt-in compositions.
