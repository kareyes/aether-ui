import tailwindcss from '@tailwindcss/vite';
import { defineConfig } from 'vitest/config';
import { sveltekit } from '@sveltejs/kit/vite';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { storybookTest } from '@storybook/addon-vitest/vitest-plugin';
import type { TestProjectConfiguration } from 'vitest/config';

const dirname = typeof __dirname !== 'undefined' ? __dirname : path.dirname(fileURLToPath(import.meta.url));

// Storybook browser tests - only include when STORYBOOK_TEST env is set
// Run with: bun run test:storybook
const storybookProject: TestProjectConfiguration = {
  extends: true,
  plugins: [
    storybookTest({
      configDir: path.join(dirname, '.storybook')
    })
  ],
  test: {
    name: 'storybook',
    browser: {
      enabled: true,
      headless: true,
      provider: 'playwright',
      instances: [{ browser: 'chromium' }]
    },
    setupFiles: ['.storybook/vitest.setup.ts']
  }
};

// More info at: https://storybook.js.org/docs/next/writing-tests/integrations/vitest-addon
export default defineConfig({
  plugins: [tailwindcss(), sveltekit()],
    optimizeDeps: {
    exclude: ['@kareyes/aether-ui']
  },

  // NB: no build.rollupOptions.external here. The published package is built by
  // svelte-package (`build:package`), not by vite, so externalising svelte /
  // @lucide/svelte only affected this preview app - and broke its SSR bundle,
  // which then tried to `import` raw .svelte files at runtime under node.
  // Unit tests run on bun's test runner (`bun run test:unit`); vitest is kept
  // solely for the Storybook browser-test project below.
  test: {
    // No requireAssertions here: storybook smoke stories render without a play
    // function and make no assertions, which that flag would fail. Unit tests
    // run on bun's runner and are unaffected either way.
    projects: [...(process.env.STORYBOOK_TEST ? [storybookProject] : [])]
  }
});
