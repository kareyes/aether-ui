import tailwindcss from "@tailwindcss/vite";
import { defineConfig } from "vite";
import { sveltekit } from "@sveltejs/kit/vite";

export default defineConfig({
	plugins: [tailwindcss(), sveltekit()],
	optimizeDeps: {
		exclude: ["aether-ui"],
	},
	build: {
		rollupOptions: {
			external: ["svelte", "svelte/internal", "@lucide/svelte", "tailwindcss"],
		},
	},
});
