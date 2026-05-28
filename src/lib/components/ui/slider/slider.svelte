<script lang="ts">
	import { Slider as SliderPrimitive } from "bits-ui";
	import { cn, type WithoutChildrenOrChild } from "$lib/utils.js";
	import { sliderVariants, type SliderVariant, type SliderSize } from "./slider-variants.js";

	export interface SliderMark {
		value: number;
		label?: string;
	}

	type SliderProps = WithoutChildrenOrChild<SliderPrimitive.RootProps> & {
		/**
		 * Visual variant
		 * @default "default"
		 */
		variant?: SliderVariant;
		/**
		 * Size variant
		 * @default "default"
		 */
		size?: SliderSize;
		/**
		 * Show step indicators
		 * @default false
		 */
		showSteps?: boolean;
		/**
		 * Show marks at specific values
		 */
		marks?: SliderMark[];
		/**
		 * Show tooltip with current value
		 * @default false
		 */
		showTooltip?: boolean;
		/**
		 * Custom formatter for tooltip
		 */
		formatTooltip?: (value: number) => string;
		/**
		 * Additional CSS classes for the root element
		 */
		class?: string;
	};

	let {
		ref = $bindable(null),
		value = $bindable(),
		orientation = "horizontal",
		variant = "default",
		size = "default",
		showSteps = false,
		marks = [],
		showTooltip = false,
		formatTooltip = (val: number) => String(val),
		min = 0,
		max = 100,
		step = 1,
		class: className,
		...restProps
	}: SliderProps = $props();

	const styles = $derived(sliderVariants({ variant, size }));

	// Calculate step positions
	const stepPositions = $derived.by(() => {
		if (!showSteps || !step) return [];
		const positions: number[] = [];
		const stepValue = Array.isArray(step) ? step[0] : step;
		for (let i = min; i <= max; i += stepValue) {
			const percent = ((i - min) / (max - min)) * 100;
			positions.push(percent);
		}
		return positions;
	});

	// Check if a step is in range
	function isStepInRange(stepValue: number): boolean {
		if (!value) return false;
		if (Array.isArray(value)) {
			return stepValue >= value[0] && stepValue <= value[value.length - 1];
		}
		return stepValue <= value;
	}

	// Calculate mark positions
	const markPositions = $derived(
		marks.map((mark) => {
			const percent = ((mark.value - min) / (max - min)) * 100;
			// Clamp percentage to prevent marks from going outside the slider
			const clampedPercent = Math.max(0, Math.min(100, percent));
			return {
				...mark,
				percent: clampedPercent,
			};
		})
	);

	// Track thumb hover state for tooltip
	let isHovering = $state(false);
	let tooltipVisible = $state(false);

	function handleThumbMouseEnter() {
		if (showTooltip) {
			isHovering = true;
			tooltipVisible = true;
		}
	}

	function handleThumbMouseLeave() {
		isHovering = false;
		tooltipVisible = false;
	}

	// Get current value for tooltip
	const currentValue = $derived.by(() => {
		if (!value) return min;
		if (Array.isArray(value)) return value[0];
		return value;
	});

	const tooltipText = $derived(formatTooltip(currentValue));
</script>

<!--
Discriminated Unions + Destructing (required for bindable) do not
get along, so we shut typescript up by casting `value` to `never`.
-->
<SliderPrimitive.Root
	bind:ref
	bind:value={value as never}
	data-slot="slider"
	{orientation}
	{min}
	{max}
	{step}
	class={cn(styles.root(), className)}
	{...restProps}
>
	{#snippet children({ thumbs })}
		<span data-orientation={orientation} data-slot="slider-track" class={cn(styles.track())}>
			<SliderPrimitive.Range data-slot="slider-range" class={cn(styles.range())} />

			<!-- Step Indicators -->
			{#if showSteps}
				{#each stepPositions as position, i}
					{@const stepValue = min + i * (Array.isArray(step) ? step[0] : step)}
					{@const inRange = isStepInRange(stepValue)}
					<span
						class={cn(styles.step())}
						data-in-range={inRange}
						style={orientation === "horizontal"
							? `left: ${position}%`
							: `bottom: ${position}%`}
					></span>
				{/each}
			{/if}
		</span>

		{#each thumbs as thumb (thumb)}
			<SliderPrimitive.Thumb
				data-slot="slider-thumb"
				index={thumb}
				class={cn(styles.thumb())}
				onmouseenter={handleThumbMouseEnter}
				onmouseleave={handleThumbMouseLeave}
			>
				<!-- Tooltip -->
				{#if showTooltip && tooltipVisible}
					<span
						class={cn(styles.tooltip(), "bottom-full mb-2")}
						data-state={tooltipVisible ? "open" : "closed"}
					>
						{tooltipText}
					</span>
				{/if}
			</SliderPrimitive.Thumb>
		{/each}

		<!-- Marks container positioned absolutely relative to root -->
		{#if marks.length > 0}
			<div
				class={cn(styles.marks())}
				data-orientation={orientation}
			>
				{#each markPositions as mark}
					<div
						class={cn(styles.mark())}
						data-orientation={orientation}
						style={orientation === "horizontal"
							? `left: ${mark.percent}%;`
							: `bottom: ${mark.percent}%;`}
					>
						{#if mark.label}
							<span class={cn(styles.markLabel())}>{mark.label}</span>
						{/if}
					</div>
				{/each}
			</div>
		{/if}
	{/snippet}
</SliderPrimitive.Root>
