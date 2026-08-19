# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## What This Is

`@kareyes/aether-ui` is a **Svelte 5 UI component library** built with Tailwind CSS v4. It is packaged and published from `src/lib/` via `svelte-package`, while `src/routes/` provides a SvelteKit dev app for previewing components.

## Commands

The package manager is **bun** (not pnpm/npm).

```bash
bun install             # Install dependencies
bun run dev             # Start dev server (component preview app)
bun run build:package   # Build the publishable library to dist/
bun run watch:package   # Build library in watch mode
bun run check           # Run svelte-check (type checking)
bun run test:unit       # Run unit tests (bun's test runner)
bun run test:e2e        # Run Playwright tests
bun run test:storybook  # Run Storybook browser tests (vitest)
bun run storybook       # Start Storybook on port 6006
```

Linting/formatting uses **Biome** (not ESLint/Prettier):
```bash
bunx biome check src/   # Lint
bunx biome format src/  # Format
```

### Package manager notes

- Use `bun run test`, never bare `bun test` — the latter invokes bun's test
  runner directly and bypasses the project's scripts.
- `bunfig.toml` sets `linker = "isolated"` (pnpm-style symlinked
  `node_modules`). Bun's default hoisted layout breaks vite-plugin-svelte:
  `.svelte` files under `src/lib` reach rollup uncompiled and `vite build`
  fails on TypeScript syntax. Do not remove this setting.
- `overrides` in `package.json` pin transitive versions to the set the old
  pnpm lockfile resolved. A fresh resolution of the current ranges breaks
  `vite build` (under pnpm too). Treat dependency upgrades as deliberate,
  separately verified work.
- Playwright browsers are not installed by postinstall; run
  `bunx playwright install` before `bun run test:e2e`.

### Test runners

Unit tests use **bun's test runner** and import from `bun:test`. Vitest is
retained only for the Storybook browser-test project in `vite.config.ts`.

## Architecture

### Component Pattern

Every component follows a two-API pattern:

1. **Primitive/compositional API** — individual sub-components exported from `index.ts` (e.g. `BreadcrumbPrimitives.Root`, `BreadcrumbPrimitives.List`, etc.)
2. **Declarative single-component API** — a convenience `*Impl` wrapper (e.g. `BreadcrumbImpl` exported as `Breadcrumb`) that accepts data props and renders the full structure internally

Both APIs are re-exported from `src/lib/index.ts` — primitives as `*Primitives` namespaces and shorthands as direct named exports.

### Component File Structure

Each component lives in `src/lib/components/ui/<name>/`:
- `<name>.svelte` — root element; exports `*Variants` (via `tailwind-variants`) and TypeScript types in `<script lang="ts" module>`
- `<name>-*.svelte` — sub-components (e.g. `breadcrumb-list.svelte`, `breadcrumb-link.svelte`)
- `<name>-impl.svelte` — declarative wrapper that assembles sub-components from data props
- `index.ts` — exports `Root`, sub-components, the `*Impl` shorthand, all variant types, and named aliases

### Styling

- **Tailwind Variants (`tv`)** is used for all variant logic, declared in `<script lang="ts" module>` blocks so they are importable as named exports
- **`cn()`** from `src/lib/utils.ts` (clsx + tailwind-merge) is used for class merging
- Tailwind CSS v4 — no `tailwind.config.js`; config is in CSS

### State and Props

- All components use **Svelte 5 runes** (`$props()`, `$derived()`, `$state()`)
- `WithElementRef<T>` (from `src/lib/utils.ts`) adds a bindable `ref` prop to all element-wrapping components
- `data-slot="<name>"` attribute is set on root elements for CSS targeting

### Library Exports

The published package (`dist/`) has four entry points:
- `.` → all components and primitives
- `./utils` → utility functions
- `./icons` → icon re-exports
- `./forms` → form integration (formsnap + superforms)

### Dev/Preview App

`src/routes/<component-name>/+page.svelte` files demonstrate each component. Import from `$lib` (which maps to `src/lib/index.ts`).

### Dependencies

- **bits-ui** — headless UI primitives used internally for complex interactive components (select, dialog, etc.)
- **tailwind-variants** — variant management
- **@tanstack/table-core** — powers the DataTable component
- **svelte-sonner** — toast notifications (Sonner component)
- **mode-watcher** — dark mode utilities
