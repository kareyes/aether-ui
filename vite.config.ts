import tailwindcss from '@tailwindcss/vite';
import { defineConfig } from 'vitest/config';
import { sveltekit } from '@sveltejs/kit/vite';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { storybookTest } from '@storybook/addon-vitest/vitest-plugin';
import type { TestProjectConfiguration } from 'vitest/config';

const dirname = typeof __dirname !== 'undefined' ? __dirname : path.dirname(fileURLToPath(import.meta.url));

// Storybook browser tests - only include when STORYBOOK_TEST env is set
// Run with: STORYBOOK_TEST=1 pnpm test:unit --project=storybook
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

  build: {
    rollupOptions: {
      external: [
        'svelte',
        'svelte/internal',
        '@lucide/svelte',
        'tailwindcss'
      ]
    }
  },
  test: {
    expect: { requireAssertions: true },
    projects: [
      {
        extends: './vite.config.ts',
        test: {
          name: 'server',
          environment: 'node',
          include: ['src/**/*.{test,spec}.{js,ts}'],
          exclude: ['src/**/*.svelte.{test,spec}.{js,ts}']
        }
      },
      ...(process.env.STORYBOOK_TEST ? [storybookProject] : [])
    ]
  }
});
