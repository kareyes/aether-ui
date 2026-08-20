import { defineConfig } from '@playwright/test';

export default defineConfig({
	webServer: {
		command: 'bun run build && bun run preview',
		port: 4173,
		// `bun run build` is a full SvelteKit SSR + client build (~60s cold),
		// which overruns playwright's 60s default before preview ever listens.
		timeout: 180_000,
		reuseExistingServer: !process.env.CI
	},
	testDir: 'e2e'
});
