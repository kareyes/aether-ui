<script lang="ts">
	import Root from "./progress.svelte";
	import { cn } from "$lib/utils.js";
	import type { ProgressVariant, ProgressSize, ProgressRadius, ProgressAnimation } from "./progress.svelte";

	type Props = {
		/** Progress value (0–max). Pass null for indeterminate/loading state. */
		value?: number | null;
		/** Maximum value. Defaults to 100. */
		max?: number;
		/** Text label for the progress bar */
		label?: string;
		/** Show the computed percentage (or formatted value) */
		showValue?: boolean;
		/** Custom value formatter. Receives (value, max), returns a display string. */
		valueFormat?: (value: number, max: number) => string;
		/**
		 * Where to render the label and value.
		 * - `'above'` — label left, value right, above the track (default)
		 * - `'inside'` — both overlaid inside the track itself
		 */
		labelPosition?: "above" | "inside";
		/** Indicator fill color */
		variant?: ProgressVariant;
		/** Track height */
		size?: ProgressSize;
		/** Track corner radius */
		radius?: ProgressRadius;
		/** Indicator animation style */
		animation?: ProgressAnimation;
		/** Extra CSS classes on the wrapping div */
		class?: string;
		/** Extra CSS classes on the track element */
		trackClass?: string;
	};

	let {
		value = 0,
		max = 100,
		label,
		showValue = false,
		valueFormat,
		labelPosition = "above",
		variant = "default",
		size = "default",
		radius = "default",
		animation = "none",
		class: className,
		trackClass,
	}: Props = $props();

	const isIndeterminate = $derived(value == null);
	const percentage = $derived(isIndeterminate ? null : Math.round((100 * (value ?? 0)) / (max ?? 1)));
	const displayValue = $derived(
		isIndeterminate
			? "Loading…"
			: valueFormat
				? valueFormat(value ?? 0, max)
				: `${percentage}%`
	);

	const hasText = $derived(label || showValue);
</script>

<div class={cn("w-full", labelPosition === "above" ? "space-y-1.5" : "", className)}>
	{#if hasText && labelPosition === "above"}
		<div class="flex items-center justify-between text-sm">
			{#if label}
				<span class="text-foreground font-medium">{label}</span>
			{/if}
			{#if showValue}
				<span class="text-muted-foreground ml-auto tabular-nums">{displayValue}</span>
			{/if}
		</div>
	{/if}

	{#if labelPosition === "inside" && hasText}
		<div class="relative w-full">
			<Root {value} {max} {variant} {size} {radius} {animation} class={cn("min-h-5", trackClass)} />
			<div class="pointer-events-none absolute inset-0 flex items-center px-2.5 gap-2">
				{#if label}
					<span class="truncate text-xs font-medium leading-none text-white drop-shadow-sm">{label}</span>
				{/if}
				{#if showValue}
					<span class="ml-auto shrink-0 text-xs font-medium leading-none text-white drop-shadow-sm tabular-nums">{displayValue}</span>
				{/if}
			</div>
		</div>
	{:else}
		<Root {value} {max} {variant} {size} {radius} {animation} class={trackClass} />
	{/if}
</div>
