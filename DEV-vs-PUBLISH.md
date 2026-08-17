# Development vs Publishing Configuration

## Overview

The `@kareyes/aether-ui` library uses a **watch-build approach** during monorepo development and **dist-first** when published to npm.

This setup provides fast feedback during development while maintaining a production-ready published package.

## How It Works

### Development Mode (Monorepo)

When developing in the monorepo (`apps/web` consuming `packages/aether-ui`):

**Option 1: Manual build (one-time)**
```bash
moon run aether-ui:build
moon run web:dev
```

**Option 2: Watch mode (recommended for active aether-ui development)**
```bash
# Terminal 1: Watch and rebuild aether-ui on changes
moon run aether-ui:watch

# Terminal 2: Run web dev server
moon run web:dev
```

The watch mode (`svelte-package --watch`):
- Automatically rebuilds `dist/` when source files change
- Fast incremental builds
- Vite HMR picks up the changes and reloads the browser

### Publishing Mode (npm)

When publishing to npm (`pnpm publish`):

1. **prepublishOnly Hook** (`packages/aether-ui/package.json`):
   ```json
   "prepublishOnly": "pnpm run build:package"
   ```
   - Automatically runs before publishing
   - Builds library to `dist/` using `@sveltejs/package`

2. **Package Exports** (`packages/aether-ui/package.json`):
   ```json
   "exports": {
     ".": {
       "types": "./dist/index.d.ts",
       "svelte": "./dist/index.js",
       "default": "./dist/index.js"
     }
   }
   ```
   - Published package exports from `dist/`
   - External consumers use pre-built files

3. **Files Array** (`packages/aether-ui/package.json`):
   ```json
   "files": ["dist"]
   ```
   - Only `dist/` is included in the published package
   - Source files are not published

## Key Benefits

### During Development
- ✅ Fast incremental builds with watch mode
- ✅ Vite HMR updates browser on changes
- ✅ Type checking works across workspace
- ✅ No SvelteKit `$lib` alias conflicts
- ✅ Reliable and stable

### For Publishing
- ✅ Production-ready dist/ output
- ✅ Type declarations included
- ✅ Peer dependencies externalized
- ✅ ESM-only output
- ✅ No source files in published package

## Workflow

### Development

**For web app development** (not changing aether-ui):
```bash
# Build aether-ui once
moon run aether-ui:build

# Start web app
moon run web:dev
```

**For library development** (changing aether-ui components):
```bash
# Terminal 1: Watch mode rebuilds on save
moon run aether-ui:watch

# Terminal 2: Web app auto-reloads on aether-ui changes
moon run web:dev
```

**Type checking:**
```bash
moon run :typecheck
```

### Publishing
```bash
# Build is automatic via prepublishOnly
cd packages/aether-ui
pnpm publish

# Or manually build
moon run aether-ui:build
```

## Moon Tasks

### packages/aether-ui
- `moon run aether-ui:build` — One-time build to dist/
- `moon run aether-ui:watch` — Watch mode, rebuilds on changes
- `moon run aether-ui:dev` — Run aether-ui's Storybook dev server
- `moon run aether-ui:typecheck` — Type check source files

### apps/web
- `moon run web:dev` — Start web app dev server
- `moon run web:build` — Production build (includes aether-ui:build)
- `moon run web:typecheck` — Type check web app

## Technical Details

### Why Watch Mode Instead of Source-First?

We use watch mode instead of direct source imports because:

1. **SvelteKit `$lib` alias conflicts**: When multiple SvelteKit packages are in a monorepo, the `$lib` alias (used internally in components) creates resolution conflicts. Each package's `$lib` should point to its own `src/lib`, but Vite's alias resolution is global.

2. **Reliability**: Using the built output is the standard approach recommended by SvelteKit and works consistently.

3. **Fast enough**: With watch mode, rebuilds are incremental and fast (usually <2s), and Vite's HMR still works.

### What Gets Published

When you run `pnpm publish`, the package includes:
- `dist/` — compiled Svelte components and utilities
- `dist/**/*.d.ts` — TypeScript declarations
- `package.json` — metadata and exports
- `README.md`, `LICENSE` — documentation

Source files (`src/`) are **not** included.

### External Consumers

Developers who install from npm get:
- Pre-built components from `dist/`
- No need to configure Svelte in their bundler
- Tree-shakeable ESM modules
- Full TypeScript support

## Troubleshooting

### Changes not showing up in web app
- Make sure aether-ui build completed: `moon run aether-ui:build`
- Or run in watch mode: `moon run aether-ui:watch`
- Check that dist/ was generated

### Type errors in apps/web
- Run `moon run aether-ui:typecheck` to check source types
- Ensure aether-ui was built: `moon run aether-ui:build`
- Check tsconfig references are correct

### Build fails before publish
- Check that all source files compile
- Run `moon run aether-ui:build` manually to debug
- Check for TypeScript errors

### Published package broken
- Verify exports point to `dist/` not `src/`
- Check that prepublishOnly ran successfully
- Inspect published package: `npm pack` then extract tarball
