# Aether

A modern, accessible Svelte 5 UI component library built with Tailwind CSS v4.

## Features

- **40+ Components** - Comprehensive set of UI components for building modern web applications
- **Svelte 5** - Built with the latest Svelte 5 runes and snippets
- **Tailwind CSS v4** - Styled with Tailwind CSS v4 using CSS variables for theming
- **Accessible** - Built on top of [bits-ui](https://bits-ui.com) for robust accessibility
- **Dark Mode** - Full dark mode support out of the box
- **TypeScript** - Fully typed components with TypeScript support
- **Customizable** - Easy to customize with CSS variables and Tailwind classes


## Documentation

https://aether-ui-svelte.web.app/


## Installation

First install the peer dependencies — the two packages you own and this
library shares with your app:

```bash
bun add svelte tailwindcss
```

Everything else (`@lucide/svelte`, `bits-ui`, `tailwind-merge`, …) is a regular
dependency and installs automatically. Then pick one of the two install paths
below.

### Option A - from a GitHub Release (no token)

Every release attaches a `.tgz` you can install straight from the URL. Nothing
to configure, no access token:

```bash
bun add https://github.com/kareyes/aether-ui/releases/download/0.0.20/kareyes-aether-ui-0.0.20.tgz
```

Replace the tag and filename with the version you want - see
[Releases](https://github.com/kareyes/aether-ui/releases). Release tags are
unprefixed (`0.0.20`, not `v0.0.20`); the asset URL contains the tag, so the
two have to agree. Because the URL
pins one exact build, upgrading means changing the URL; there is no semver
range resolution.

### Option B - from GitHub Packages (requires a token)

This path supports normal semver ranges, but GitHub Packages requires every
consumer to authenticate, even though the repository is public.

Create a `.npmrc` in your project root:

```
@kareyes:registry=https://npm.pkg.github.com
//npm.pkg.github.com/:_authToken=YOUR_GITHUB_TOKEN
```

> **Note**: You need a GitHub Personal Access Token with `read:packages` scope. Generate one at https://github.com/settings/tokens

```bash
bun add @kareyes/aether-ui
```

### Configure Styles

Add the following to your main CSS file (e.g., `src/app.css`):

```css
@import "tailwindcss";
@import "@kareyes/aether-ui/styles";

/* Scan Aether components for Tailwind classes */
@source "../node_modules/@kareyes/aether-ui/dist/**/*.{svelte,js}";
```

### Import `app.css` in Layout

**File:** `src/routes/+layout.svelte`

```svelte
<script lang="ts">
  import "../app.css";
  
  let { children } = $props();
</script>

{@render children()}
```

**Changes:**
- Add `import "../app.css";` at the top of the script section

---



## Upgrading

### From 0.0.19 or earlier

**`pnpm update` / `npm update` will not move you.** The published range uses a
`0.0.x` version, where caret does not mean what it usually does:

```
^0.0.19  ->  >=0.0.19 <0.0.20     # 0.0.20 is outside the range
```

Bump the version explicitly:

```bash
bun add  @kareyes/aether-ui@0.0.20
pnpm add @kareyes/aether-ui@0.0.20
npm  install @kareyes/aether-ui@0.0.20
```

Or, on the token-free path, change the URL to the new tag:

```bash
bun add https://github.com/kareyes/aether-ui/releases/download/0.0.20/kareyes-aether-ui-0.0.20.tgz
```

### Why 0.0.20 matters if you are on svelte below 5.56.4

This package ships `.svelte` files as source, so **your** svelte compiles them.
Releases up to 0.0.19 contained optional parameters (`function open(newConfig?:
Config)`). Svelte before 5.56.4 strips the type but leaves the `?` behind,
emitting `function open(newConfig?)` - not valid JavaScript - and your build
fails with `Expected ',', got '?'` pointing inside `node_modules`.

It takes two conditions, so you may be unaffected today and break later:

| condition | breaks when |
| --- | --- |
| your `svelte` | older than 5.56.4 |
| your `esrap` (a svelte dependency) | 2.2.12 or newer |

A lockfile pinning an older `esrap` masks the problem entirely - until anything
re-resolves it. 0.0.20 fixes this in the source, so it is safe on any svelte
5.x and the trap goes away for good.

## Quick Start

```svelte
<script>
  import { Button, Card, Input } from '@kareyes/aether-ui';
</script>

<Card title="Welcome to Aether" description="A beautiful UI component library">
    <Input placeholder="Enter your name..." />

    {#snippet footer()}
    <Button>Get Started</Button>
    {/snippet}
</Card>


```

## Components

### Layout & Structure
- **Card** - Container for grouping related content
- **Separator** - Visual divider between content
- **Sidebar** - Navigation sidebar with collapsible groups
- **Tabs** - Tabbed interface for organizing content

### Forms & Inputs
- **Button** - Primary action element with variants
- **ButtonGroup** - Group related buttons together
- **Checkbox** - Single or grouped checkboxes
- **ComboBox** - Searchable dropdown select
- **DatePicker** - Date and date range selection
- **Field** - Form field wrapper with label and error states
- **FileInput** - File upload with drag & drop support
- **Input** - Text input with variants
- **InputGroup** - Input with addons and buttons
- **InputOTP** - One-time password input
- **Label** - Form labels
- **NumberSpinner** - Numeric input with increment/decrement
- **RadioGroup** - Radio button groups
- **Select** - Dropdown selection
- **Slider** - Range slider input
- **Switch** - Toggle switch
- **Textarea** - Multi-line text input

### Feedback & Overlays
- **Alert** - Informational messages
- **AlertDialog** - Confirmation dialogs
- **Dialog** - Modal dialogs
- **Popover** - Floating content panels
- **Sheet** - Slide-out panels
- **Sonner** - Toast notifications
- **Tooltip** - Hover tooltips

### Data Display
- **Accordion** - Expandable content sections
- **Avatar** - User avatars with fallback
- **Badge** - Status indicators and labels
- **Breadcrumb** - Navigation breadcrumbs
- **Calendar** - Calendar display
- **DataTable** - Data tables with sorting and pagination
- **Skeleton** - Loading placeholders
- **Spinner** - Loading spinners
- **Stepper** - Multi-step progress indicator
- **Table** - Basic table components

### Navigation
- **Command** - Command palette / search
- **DropdownMenu** - Dropdown menus
- **NavigationMenu** - A collection of links for navigating websites

## Theming

Aether uses CSS variables for theming. You can customize the theme by overriding these variables:

```css
:root {
  --primary: oklch(0.488 0.243 264.376);
  --primary-foreground: oklch(0.97 0.014 254.604);
  --secondary: oklch(0.97 0 0);
  --secondary-foreground: oklch(0.205 0 0);
  --background: oklch(1 0 0);
  --foreground: oklch(0.145 0 0);
  /* ... see theme.css for all variables */
}

.dark {
  --primary: oklch(0.488 0.243 264.376);
  --background: oklch(0.145 0 0);
  --foreground: oklch(0.985 0 0);
  /* ... dark mode overrides */
}
```

## Utilities

### `cn()` - Class Name Utility

Merge Tailwind classes with proper precedence:

```svelte
<script>
  import { cn } from '@kareyes/aether-ui/utils';
</script>

<div class={cn("p-4 bg-primary", someCondition && "bg-secondary")}>
  Content
</div>
```

## Requirements

### Peer dependencies — you install these

They are shared with your app, so this package deliberately does not bundle its
own copy:

| package | range | notes |
| --- | --- | --- |
| `svelte` | `^5.0.0` | verified from **5.20.0** up; older 5.x releases fail to compile some components |
| `tailwindcss` | `^4.0.0` | v4 only — configuration is CSS-based, there is no `tailwind.config.js` |

### Bundled dependencies — installed for you

Declared as regular dependencies, so you do not list them yourself. Notably
`@lucide/svelte` (used by 69 shipped components), `bits-ui`, `@tanstack/table-core`,
`@internationalized/date`, `svelte-sonner`, `mode-watcher`, `tailwind-merge`,
`tailwind-variants`, `clsx` and `tw-animate-css`.

Installing them explicitly is unnecessary and risks pinning a version that
conflicts with the one this package expects.



## Development

```bash
# Install dependencies
bun install

# Start development server
bun run dev

# Run Storybook
bun run storybook

# Build the package
bun run build:package

# Run tests
bun run test
```

> **Note**: use `bun run test`, not `bun test` — the bare form invokes bun's
> test runner directly and bypasses the project's scripts.

### Migrating an existing clone from pnpm

This repo used pnpm until 0.0.20. If you cloned before that, your working copy
still has a pnpm-shaped `node_modules` that bun will not reuse:

```bash
git pull
rm -rf node_modules          # pnpm's symlink farm; bun will not adopt it
bun install                  # writes/uses bun.lock
```

`pnpm-lock.yaml` is deleted in git, so `git pull` removes it for you. If a
stale copy survives (it was untracked locally, say), delete it — nothing reads
it any more.

Notes on the new setup:

- `bunfig.toml` sets `linker = "isolated"`, giving a pnpm-style symlinked
  `node_modules`. Bun's default hoisted layout breaks vite-plugin-svelte here,
  so leave it alone.
- Unit tests run on **bun's** test runner and import from `bun:test`. There is
  no vitest in this repo; `bun run test:e2e` adds playwright on top.
- Playwright browsers are not installed automatically:

  ```bash
  bunx playwright install
  sudo npx playwright install-deps    # Linux only, for the system libraries
  ```

- CI installs with `bun install --frozen-lockfile`, so commit `bun.lock`
  whenever dependencies change.

## License

MIT
