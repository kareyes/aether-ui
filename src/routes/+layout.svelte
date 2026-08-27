<script lang="ts">
	import "../app.css";
	import favicon from "$lib/assets/favicon.svg";
	import { DarkModeToggle } from "$lib";
	import { ModeWatcher } from "mode-watcher";
	import { page } from "$app/state";
	import { THEMES, syncTheme, theme } from "./theme.svelte.js";

	let { children } = $props();

	// The chosen theme is applied app-wide, so every demo page is a test of it
	// against a real component rather than a curated showcase. The picker in the
	// nav switches between them; /pelican explains what a theme is.
	$effect(syncTheme);

	// Auto-discover every demo route so the nav stays in sync as pages are added.
	const pages = import.meta.glob("./**/+page.svelte");
	const routes = Object.keys(pages)
		.map((path) => {
			const href = path
				.replace(/^\.\//, "/")
				.replace(/\/?\+page\.svelte$/, "");
			return { href: href === "" ? "/" : href };
		})
		.sort((a, b) => a.href.localeCompare(b.href));

	const label = (href: string): string =>
		href === "/"
			? "Home"
			: href.slice(1).replace(/-/g, " ").replace(/\//g, " · ");
</script>

<svelte:head>
	<link rel="icon" href={favicon} />
</svelte:head>
<ModeWatcher />
<div class="relative min-h-screen">
	<nav
		class="border-border bg-background/80 sticky top-0 z-50 flex items-center gap-3 border-b px-4 py-2 backdrop-blur"
	>
		<span class="text-sm font-semibold">aether-ui</span>
		<ul class="flex flex-1 flex-wrap gap-1">
			{#each routes as route (route.href)}
				{@const active = page.url.pathname === route.href}
				<li>
					<a
						href={route.href}
						aria-current={active ? "page" : undefined}
						class="block rounded-md px-3 py-1.5 text-sm capitalize transition-colors {active
							? 'bg-primary text-primary-foreground'
							: 'text-muted-foreground hover:bg-muted hover:text-foreground'}"
					>
						{label(route.href)}
					</a>
				</li>
			{/each}
		</ul>
		<label class="flex shrink-0 items-center gap-2 text-xs">
			<span class="sr-only">Theme</span>
			<select
				bind:value={theme.active}
				class="rounded-md border border-border bg-card px-2 py-1 text-xs text-foreground"
			>
				{#each THEMES as option (option.id)}
					<option value={option.id}>{option.label}</option>
				{/each}
			</select>
		</label>
		<DarkModeToggle animation="scale" showTooltip={true} />
	</nav>

	{@render children?.()}
</div>
