<script lang="ts">
	import { mode, toggleMode } from "mode-watcher";
	import { Sun, Moon } from "@lucide/svelte";
	import { cn } from "$lib/utils.js";
	import { darkModeToggleVariants } from "./dark-mode-variants.js";
	import type { DarkModeToggleProps } from "./dark-mode-types.js";

	let {
		variant = "default",
		size = "default",
		shape = "square",
		showTooltip = false,
		lightModeTooltip = "Switch to dark mode",
		darkModeTooltip = "Switch to light mode",
		animation = "rotate",
		class: className,
		disabled = false,
		...restProps
	}: DarkModeToggleProps = $props();

	const styles = $derived(darkModeToggleVariants({ variant, size, shape }));

	const isDark = $derived(mode.current === "dark");

	const animationClasses = $derived.by(() => {
		switch (animation) {
			case "rotate":
				return isDark ? "rotate-0" : "-rotate-90";
			case "scale":
				return isDark ? "scale-100" : "scale-90";
			case "fade":
				return "";
			case "none":
			default:
				return "";
		}
	});

	const tooltipText = $derived(isDark ? darkModeTooltip : lightModeTooltip);
</script>

<button
	type="button"
	onclick={toggleMode}
	{disabled}
	class={cn(styles.root(), className)}
	aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
	title={showTooltip ? tooltipText : undefined}
	{...restProps}
>
	{#if isDark}
		<Moon class={cn(styles.icon(), animationClasses)} />
	{:else}
		<Sun class={cn(styles.icon(), animationClasses)} />
	{/if}
</button>
