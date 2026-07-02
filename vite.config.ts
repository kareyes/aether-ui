import tailwindcss from "@tailwindcss/vite";
import { defineConfig } from "vite";
import { sveltekit } from "@sveltejs/kit/vite";

export default defineConfig({
	plugins: [tailwindcss(), sveltekit()],
	optimizeDeps: {
		exclude: ["aether-ui"],
	},
	ssr: {
		// @lucide/svelte ships uncompiled .svelte source (each icons/*.js just
		// re-exports ./*.svelte), so Vite must run it through vite-plugin-svelte
		// during SSR rather than externalizing it — otherwise esbuild tries to
		// build the raw .svelte files and fails ("N errors building <icon>.svelte").
		noExternal: ["@lucide/svelte"],
	},
	build: {
		rollupOptions: {
			external: ["svelte", "svelte/internal", "@lucide/svelte", "tailwindcss"],
		},
	},
});
