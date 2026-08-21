import tailwindcss from '@tailwindcss/vite';
import { defineConfig } from 'vite';
import { sveltekit } from '@sveltejs/kit/vite';

export default defineConfig({
  plugins: [tailwindcss(), sveltekit()],
  optimizeDeps: {
    exclude: ['@kareyes/aether-ui']
  }

  // NB: no build.rollupOptions.external here. The published package is built by
  // svelte-package (`build:package`), not by vite, so externalising svelte /
  // @lucide/svelte only affected this preview app - and broke its SSR bundle,
  // which then tried to `import` raw .svelte files at runtime under node.
});
