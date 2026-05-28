<script lang="ts">
	import { mode, toggleMode } from "mode-watcher";
	import { Sun, Moon } from "@lucide/svelte";
	import { cn } from "$lib/utils.js";
	import { darkModeSwitchVariants } from "./dark-mode-variants.js";
	import type { DarkModeSwitchProps } from "./dark-mode-types.js";

	let {
		variant = "default",
		size = "default",
		showIcons = true,
		disabled = false,
		class: className,
	}: DarkModeSwitchProps = $props();

	const styles = $derived(darkModeSwitchVariants({ variant, size }));

	const isDark = $derived(mode.current === "dark");

	// Calculate thumb position based on size
	const thumbOffset = $derived.by(() => {
		switch (size) {
			case "sm":
				return isDark ? "translate-x-5" : "translate-x-0.5";
			case "lg":
				return isDark ? "translate-x-8" : "translate-x-0.5";
			default:
				return isDark ? "translate-x-7" : "translate-x-0.5";
		}
	});
</script>

<button
	type="button"
	role="switch"
	aria-checked={isDark}
	onclick={toggleMode}
	{disabled}
	class={cn(styles.root(), className)}
	aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
>
	<!-- Icons container -->
	{#if showIcons}
		<span class={cn(styles.iconContainer())}>
			<Sun
				class={cn(
					styles.icon(),
					"text-amber-500",
					isDark ? "opacity-50" : "opacity-100",
				)}
			/>
			<Moon
				class={cn(
					styles.icon(),
					"text-slate-300",
					isDark ? "opacity-100" : "opacity-50",
				)}
			/>
		</span>
	{/if}

	<!-- Thumb -->
	<span class={cn(styles.thumb(), thumbOffset)}>
		{#if isDark}
			<Moon class={cn(styles.icon(), "text-primary")} />
		{:else}
			<Sun class={cn(styles.icon(), "text-amber-500")} />
		{/if}
	</span>
</button>
