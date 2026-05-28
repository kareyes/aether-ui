<script lang="ts">
	import { cn } from "$lib/utils.js";
	import { numberSpinnerVariants } from "./number-spinner-variants.js";
	import type {
		NumberSpinnerVariant,
		NumberSpinnerSize,
		NumberSpinnerOrientation,
	} from "./number-spinner-variants.js";
	import { ChevronUp, ChevronDown, Plus, Minus } from "@lucide/svelte";
	import { Spinner } from '$lib/components/ui/spinner';
	import type { HTMLInputAttributes } from "svelte/elements";

	interface NumberSpinnerProps extends Omit<HTMLInputAttributes, "size" | "type"> {
		/**
		 * The current value (bindable)
		 */
		value?: number | null;
		/**
		 * Visual variant
		 * @default "default"
		 */
		variant?: NumberSpinnerVariant;
		/**
		 * Size variant
		 * @default "default"
		 */
		size?: NumberSpinnerSize;
		/**
		 * Orientation of the spinner buttons
		 * @default "vertical"
		 */
		orientation?: NumberSpinnerOrientation;
		/**
		 * Minimum value
		 */
		min?: number;
		/**
		 * Maximum value
		 */
		max?: number;
		/**
		 * Step increment/decrement value
		 * @default 1
		 */
		step?: number;
		/**
		 * Number of decimal places to allow
		 */
		precision?: number;
		/**
		 * Whether the input is disabled
		 */
		disabled?: boolean;
		/**
		 * Whether the input is required
		 */
		required?: boolean;
		/**
		 * Error state - when true, applies error styling via aria-invalid
		 */
		error?: boolean;
		/**
		 * Loading state - when true, shows a spinner and disables the input
		 */
		loading?: boolean;
		/**
		 * Callback function called when error state changes
		 */
		onError?: (error: boolean) => void;
		/**
		 * Callback when value changes
		 */
		onValueChange?: (value: number | null) => void;
		/**
		 * Additional CSS classes for the root container
		 */
		class?: string;
		/**
		 * Additional CSS classes for the input element
		 */
		inputClass?: string;
		/**
		 * Placeholder text
		 */
		placeholder?: string;
		/**
		 * Ref to the input element
		 */
		ref?: HTMLInputElement | null;
	}

	let {
		value = $bindable(null),
		variant = "default",
		size = "default",
		orientation = "vertical",
		min,
		max,
		step = 1,
		precision,
		disabled = false,
		required = false,
		error = false,
		loading = false,
		onError,
		onValueChange,
		class: className,
		inputClass,
		placeholder,
		ref = $bindable(null),
		...restProps
	}: NumberSpinnerProps = $props();

	const styles = $derived(numberSpinnerVariants({ variant, size, orientation }));

	// Track error state and notify parent
	$effect(() => {
		if (onError) {
			onError(error);
		}
	});

	// Notify parent of value changes
	$effect(() => {
		if (onValueChange && value !== undefined) {
			onValueChange(value);
		}
	});

	function increment() {
		if (disabled || loading) return;

		let newValue = (value ?? 0) + step;

		if (max !== undefined && newValue > max) {
			newValue = max;
		}

		if (precision !== undefined) {
			newValue = Number.parseFloat(newValue.toFixed(precision));
		}

		value = newValue;
	}

	function decrement() {
		if (disabled || loading) return;

		let newValue = (value ?? 0) - step;

		if (min !== undefined && newValue < min) {
			newValue = min;
		}

		if (precision !== undefined) {
			newValue = Number.parseFloat(newValue.toFixed(precision));
		}

		value = newValue;
	}

	function handleInput(event: Event) {
		const target = event.target as HTMLInputElement;
		const inputValue = target.value;

		if (inputValue === "" || inputValue === "-") {
			value = null;
			return;
		}

		let numValue = Number.parseFloat(inputValue);

		if (Number.isNaN(numValue)) {
			return;
		}

		if (min !== undefined && numValue < min) {
			numValue = min;
		}

		if (max !== undefined && numValue > max) {
			numValue = max;
		}

		if (precision !== undefined) {
			numValue = Number.parseFloat(numValue.toFixed(precision));
		}

		value = numValue;
	}

	function handleKeyDown(event: KeyboardEvent) {
		if (disabled || loading) return;

		if (event.key === "ArrowUp") {
			event.preventDefault();
			increment();
		} else if (event.key === "ArrowDown") {
			event.preventDefault();
			decrement();
		}
	}

	const canIncrement = $derived(!disabled && !loading && (max === undefined || (value ?? 0) < max));
	const canDecrement = $derived(!disabled && !loading && (min === undefined || (value ?? 0) > min));
</script>

<div class={cn(styles.root(), className)} data-orientation={orientation}>
	{#if orientation === "horizontal"}
		<button
			type="button"
			class={cn(styles.buttonHorizontal())}
			onclick={decrement}
			disabled={!canDecrement}
			tabindex="-1"
			aria-label="Decrease value"
		>
			{#if loading}
				<Spinner />
			{:else}
				<Minus class={styles.button()} />
			{/if}
		</button>
	{/if}

	<input
		bind:this={ref}
		type="number"
		class={cn(styles.input(), inputClass)}
		bind:value
		oninput={handleInput}
		onkeydown={handleKeyDown}
		{min}
		{max}
		{step}
		disabled={disabled || loading}
		{required}
		{placeholder}
		aria-invalid={error}
		{...restProps}
	/>

	{#if orientation === "vertical"}
		<div class={styles.buttonGroup()}>
			<button
				type="button"
				class={cn(styles.button())}
				onclick={increment}
				disabled={!canIncrement}
				tabindex="-1"
				aria-label="Increase value"
			>
				{#if loading}
					<Spinner class="size-3" />
				{:else}
					<ChevronUp class="size-full" />
				{/if}
			</button>
			<button
				type="button"
				class={cn(styles.button())}
				onclick={decrement}
				disabled={!canDecrement}
				tabindex="-1"
				aria-label="Decrease value"
			>
				{#if loading}
					<Spinner class="size-3" />
				{:else}
					<ChevronDown class="size-full" />
				{/if}
			</button>
		</div>
	{:else}
		<button
			type="button"
			class={cn(styles.buttonHorizontal())}
			onclick={increment}
			disabled={!canIncrement}
			tabindex="-1"
			aria-label="Increase value"
		>
			{#if loading}
				<Spinner />
			{:else}
				<Plus class={styles.button()} />
			{/if}
		</button>
	{/if}
</div>
