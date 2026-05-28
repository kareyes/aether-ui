<script lang="ts">
	import { mode, setMode } from "mode-watcher";
	import { Sun, Moon, Monitor, Check } from "@lucide/svelte";
	import { cn } from "$lib/utils.js";
	import { darkModeDropdownVariants } from "./dark-mode-variants.js";
	import type {
		DarkModeDropdownProps,
		ThemeMode,
	} from "./dark-mode-types.js";
	import * as DropdownMenu from "$lib/components/ui/dropdown-menu/index.js";

	let {
		variant = "default",
		size = "default",
		showLabel = false,
		labels = {
			light: "Light",
			dark: "Dark",
			system: "System",
		},
		align = "end",
		side = "bottom",
		class: className,
	}: DarkModeDropdownProps = $props();

	const styles = $derived.by(() => darkModeDropdownVariants({ variant, size }));

	// Get the actual stored mode (light, dark, or system)
	let currentMode = $state<ThemeMode>("system");

	// Derive the displayed mode based on $mode
	const displayMode = $derived.by(() => mode.current);

	const modeOptions = $derived.by(() => [
		{ value: "light", label: labels.light ?? "Light", icon: Sun },
		{ value: "dark", label: labels.dark ?? "Dark", icon: Moon },
		{
			value: "system",
			label: labels.system ?? "System",
			icon: Monitor,
		},
	]);

	function handleModeChange(newMode: ThemeMode) {
		currentMode = newMode;
		setMode(newMode);
	}

	const CurrentIcon = $derived.by(() => (displayMode === "dark" ? Moon : Sun));
	const currentLabel = $derived.by(() => (displayMode === "dark" ? labels.dark : labels.light));
</script>

<DropdownMenu.Root>
	<DropdownMenu.Trigger>
		{#snippet child({ props })}
			<button
				type="button"
				class={cn(styles.trigger(), className)}
				aria-label="Toggle theme"
				{...props}
			>
				<CurrentIcon class={styles.icon()} />
				{#if showLabel}
					<span>{currentLabel}</span>
				{/if}
			</button>
		{/snippet}
	</DropdownMenu.Trigger>

	<DropdownMenu.Content {align} {side} class={styles.content()}>
		{#each modeOptions as option (option.value)}
			<DropdownMenu.Item
				class={styles.item()}
				onclick={() => handleModeChange(option.value as ThemeMode)}
			>
				<option.icon class={styles.itemIcon()} />
				<span>{option.label}</span>
				{#if currentMode === option.value}
					<Check class={cn(styles.itemIcon(), "ml-auto")} />
				{/if}
			</DropdownMenu.Item>
		{/each}
	</DropdownMenu.Content>
</DropdownMenu.Root>
